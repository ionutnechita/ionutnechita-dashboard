<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

import { useUser, useOrganization } from '@clerk/vue'
import { computed, ref, inject, onMounted, watch } from 'vue'
import { useBrowserInfo } from '~/composables/useBrowserInfo'
import { OrganizationSwitcher } from '@clerk/vue'
import { useAuth } from '@clerk/vue'
import { SignOutButton } from '@clerk/vue'
import { useRouter } from 'vue-router'
import AppSidebar from '@/components/AppSidebar.vue'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Loader2 } from 'lucide-vue-next'

// Define types
type AppSidebarInstance = {
  updateOrgName: (name: string) => void
}

type ToggleThemeFn = () => void

// State for sidebar collapse
const sidebarCollapsed = ref<boolean>(false)

// Create a properly typed ref for the AppSidebar component
const sidebarRef = ref<AppSidebarInstance | null>(null)

// Get router
const router = useRouter()

// Authentication state
const isLoading = ref<boolean>(true)
const isAuthenticated = ref<boolean>(false)
const authCheckComplete = ref<boolean>(false)

// Get theme settings
const isDark = inject<Ref<boolean>>('isDarkMode', ref(false))
const toggleTheme = inject<ToggleThemeFn>('toggleDarkMode', () => { })

// Get user data
const { user, isLoaded, isSignedIn } = useUser()
const { name, version, platform } = useBrowserInfo()
const { organization } = useOrganization()

// Load sidebar state from localStorage and initialize
onMounted(() => {
  if (process.client) {
    // Load sidebar collapsed state
    try {
      const savedState = localStorage.getItem('sidebar:collapsed')
      if (savedState !== null) {
        sidebarCollapsed.value = savedState === 'true'
      }
    } catch (error) {
      console.error('Failed to load sidebar state:', error)
    }

    // Check authentication
    checkAuthentication()
  }
})

// Update sidebar organization name using the ref
const updateSidebarOrgName = (): void => {
  if (sidebarRef.value && isLoaded.value && organization.value) {
    const orgName = organization.value.name

    // Call the updateOrgName method on the AppSidebar component
    if (sidebarRef.value.updateOrgName) {
      sidebarRef.value.updateOrgName(orgName)
    }
  }
}

// Watch for organization changes
watch(organization, () => {
  updateSidebarOrgName()
}, { immediate: true })

// Also watch for isLoaded changes
watch(isLoaded, () => {
  updateSidebarOrgName()
}, { immediate: true })

// Set timeouts to ensure organization updates
setTimeout(updateSidebarOrgName, 3000)

// Authentication check function
const checkAuthentication = async (): Promise<void> => {
  try {
    // First, check if Clerk is loaded
    if (!isLoaded.value) {
      // Wait for a short time to see if Clerk loads
      const startTime = Date.now()
      const timeout = 3000 // 3 seconds timeout

      while (!isLoaded.value && (Date.now() - startTime < timeout)) {
        // Short polling wait
        await new Promise(resolve => setTimeout(resolve, 100))
      }
    }

    // Check if we have a session token in localStorage (fallback)
    const hasLocalSession = process.client && (
      localStorage.getItem('clerk-session-token') ||
      localStorage.getItem('__clerk_client_jwt')
    )

    // Set authentication state
    isAuthenticated.value = isSignedIn.value || !!hasLocalSession

    // If authenticated, update loading state
    if (isAuthenticated.value) {
      setTimeout(() => {
        isLoading.value = false
      }, 200)
    } else {
      // If not authenticated, we don't need to redirect here
      // The auth middleware should handle this already
      isLoading.value = false
    }
  } catch (error) {
    console.error('Auth check error:', error)
    isAuthenticated.value = false
    isLoading.value = false
  } finally {
    authCheckComplete.value = true
  }
}

// Watch for changes in Clerk's auth state
watch([isLoaded, isSignedIn], ([newIsLoaded, newIsSignedIn]) => {
  if (newIsLoaded) {
    // Update authentication state
    isAuthenticated.value = !!newIsSignedIn

    // Update loading state
    if (isAuthenticated.value) {
      isLoading.value = false
    }
  }
})

watch(
  isAuthenticated,
  (newValue) => {
    if (newValue === false && authCheckComplete.value) {
      router.push('/login')
    }
  },
  { immediate: true }
)

// Get first name and last name directly from Clerk user object
const firstName = computed<string | null>(() => {
  if (!user.value) return null

  // Try different sources for firstName in order of preference
  if (typeof user.value.firstName === 'string') return user.value.firstName
  if (typeof user.value.publicMetadata?.firstName === 'string') return user.value.publicMetadata.firstName
  if (typeof user.value.publicMetadata?.first_name === 'string') return user.value.publicMetadata.first_name

  return null
})

const lastName = computed<string | null>(() => {
  if (!user.value) return null

  // Try different sources for lastName in order of preference
  if (typeof user.value.lastName === 'string') return user.value.lastName
  if (typeof user.value.publicMetadata?.lastName === 'string') return user.value.publicMetadata.lastName
  if (typeof user.value.publicMetadata?.last_name === 'string') return user.value.publicMetadata.last_name

  return null
})

// Computed property for user's full name
const userFullName = computed<string>(() => {
  const first = firstName.value
  const last = lastName.value

  if (first && last) return `${first} ${last}`
  if (first) return first
  if (last) return last

  // Fallback to other identifiers - check types explicitly
  if (typeof user.value?.username === 'string') return user.value.username
  if (typeof user.value?.publicMetadata?.username === 'string') return user.value.publicMetadata.username
  if (typeof user.value?.publicMetadata?.name === 'string') return user.value.publicMetadata.name
  if (typeof user.value?.id === 'string') return user.value.id

  return 'Unknown'
})

// Computed property for user email
const userEmail = computed<string>(() => {
  if (!user.value) return 'Not available'

  // Check each potential source of email in order of preference
  // and ensure we're dealing with string values

  // Try to find the primary email first
  if (user.value.emailAddresses && user.value.emailAddresses.length > 0) {
    // Check for a primary email
    const primaryEmail = user.value.emailAddresses.find(email =>
      email.emailAddress === user.value.primaryEmailAddressId
    )

    if (primaryEmail?.emailAddress) {
      return primaryEmail.emailAddress
    }

    // Check for a verified email
    const verifiedEmail = user.value.emailAddresses.find(email =>
      email.verification?.status === 'verified'
    )

    if (verifiedEmail?.emailAddress) {
      return verifiedEmail.emailAddress
    }

    // Fall back to the first email address if available
    if (typeof user.value.emailAddresses[0]?.emailAddress === 'string') {
      return user.value.emailAddresses[0].emailAddress
    }
  }

  // Last resort - direct email property if it exists
  if (typeof user.value.emailAddresses === 'string') {
    return user.value.emailAddresses
  }

  return 'Not available'
})

// Helper methods
function getInitials(name: string | undefined): string {
  if (!name || typeof name !== 'string') return '?'
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
}

function truncateId(id: string | undefined): string {
  if (!id) return 'N/A'
  return id.substring(0, 8) + '...' + id.substring(id.length - 4)
}

const { orgRole } = useAuth()

function getCurrentOrgRole(): string {
  // Check if we have an org role from auth context
  if (typeof orgRole?.value === 'string' && orgRole.value) {

    const role = orgRole.value.toLowerCase();

    if (role === 'org:admin' || role === 'admin') {
      return 'Admin';
    }

    if (role === 'org:member' || role === 'basic_member' || role === 'member') {
      return 'Member';
    }

    return orgRole.value;
  }

  return 'Member';
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <SidebarProvider>
      <!-- Sidebar Component -->
      <AppSidebar v-model:isCollapsed="sidebarCollapsed" ref="sidebarRef" />

      <!-- Main Content Area -->
      <SidebarInset>
        <!-- Header Bar -->
        <header
          class="sticky top-0 z-30 flex h-16 shrink-0 items-center border-b bg-background/95 backdrop-blur transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div class="flex items-center gap-2 px-4">
            <SidebarTrigger class="-ml-1" />
            <Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem class="hidden md:block">
                  <BreadcrumbLink href="/dashboard">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator class="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Account Settings</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <!-- Main content area -->
        <div class="flex flex-col gap-6 p-6">
          <!-- Page Title -->
          <div class="flex flex-col gap-2">
            <h1 class="text-3xl font-bold tracking-tight">Account Settings</h1>
            <p class="text-muted-foreground">
              Manage your account preferences and organization settings.
            </p>
          </div>

          <!-- Loading State -->
          <div v-if="isLoading" class="flex h-[50vh] w-full items-center justify-center">
            <Loader2 class="h-8 w-8 animate-spin text-primary" />
          </div>

          <!-- Main Account Content (when loaded and authenticated) -->
          <div v-else-if="isAuthenticated" class="grid gap-6">
            <!-- Profile Card -->
            <Card>
              <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>User Profile</CardTitle>
                  <CardDescription>Your personal information</CardDescription>
                </div>
                <SignOutButton>
                  <template #default>
                    <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="mr-2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                      Logout
                    </button>
                  </template>
                </SignOutButton>
              </CardHeader>
              <CardContent>
                <div class="flex items-center gap-6 sm:gap-8">
                  <div class="h-20 w-20 sm:h-24 sm:w-24 rounded-full overflow-hidden border-4 border-primary flex items-center justify-center bg-primary/10">
                    <img v-if="user?.imageUrl" :src="user.imageUrl" alt="Profile" class="h-full w-full object-cover" />
                    <span v-else class="text-xl sm:text-2xl font-bold text-primary">
                      {{ getInitials(userFullName) }}
                    </span>
                  </div>
                  <div class="space-y-1">
                    <h3 class="text-xl font-bold">{{ userFullName }}</h3>
                    <p class="text-muted-foreground">{{ userEmail }}</p>
                    <p class="text-xs text-muted-foreground font-mono">ID: {{ truncateId(user?.id) }}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <!-- Organization Card -->
            <Card>
              <CardHeader>
                <CardTitle>Organization</CardTitle>
                <CardDescription>Your current organization and role</CardDescription>
              </CardHeader>
              <CardContent>
                <div class="mb-6 p-4 rounded-lg border bg-card/50">
                  <div class="flex items-center gap-4">
                    <div class="h-12 w-12 rounded-md overflow-hidden border-2 border-primary/40 flex items-center justify-center bg-primary/10">
                      <img v-if="organization?.imageUrl" :src="organization.imageUrl" alt="Organization" class="h-full w-full object-cover" />
                      <span v-else class="text-md font-bold text-primary">
                        {{ getInitials(organization?.name || 'No Org') }}
                      </span>
                    </div>
                    <div class="space-y-1">
                      <h3 class="text-base font-semibold">{{ organization?.name || 'No organization selected' }}</h3>
                      <p class="text-sm text-muted-foreground">Role: {{ getCurrentOrgRole() }}</p>
                    </div>
                  </div>
                </div>

                <div class="bg-card/40 p-4 rounded-lg border">
                  <p class="text-sm mb-3">Switch between organizations:</p>
                  <OrganizationSwitcher />
                </div>
              </CardContent>
            </Card>

            <!-- Personal Information Card -->
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Your account details and email information</CardDescription>
              </CardHeader>
              <CardContent>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="p-4 rounded-lg border bg-card/40">
                    <p class="text-sm text-muted-foreground mb-1">Username</p>
                    <p class="font-medium">{{ user?.username || 'Not set' }}</p>
                  </div>
                  <div class="p-4 rounded-lg border bg-card/40">
                    <p class="text-sm text-muted-foreground mb-1">First Name</p>
                    <p class="font-medium">{{ firstName || 'Not set' }}</p>
                  </div>
                  <div class="p-4 rounded-lg border bg-card/40">
                    <p class="text-sm text-muted-foreground mb-1">Last Name</p>
                    <p class="font-medium">{{ lastName || 'Not set' }}</p>
                  </div>
                  <div class="p-4 rounded-lg border bg-card/40 md:col-span-2">
                    <p class="text-sm text-muted-foreground mb-2">Email Addresses</p>
                    <div class="space-y-2">
                      <div v-for="email in user?.emailAddresses" :key="email.id" 
                          class="flex justify-between items-center border-b border-border/40 pb-2 last:border-0 last:pb-0">
                        <span class="font-medium">{{ email.emailAddress }}</span>
                        <div class="flex gap-2">
                          <span v-if="email.id === user?.primaryEmailAddressId"
                            class="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">Primary</span>
                          <span v-if="email.verification?.status === 'verified'"
                            class="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-600 font-medium">Verified</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <!-- System Information Card -->
            <Card>
              <CardHeader>
                <CardTitle>System Information</CardTitle>
                <CardDescription>Browser, platform and theme preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div class="p-4 rounded-lg border bg-card/40">
                    <p class="text-sm text-muted-foreground mb-1">Browser</p>
                    <p class="font-medium">{{ name }} {{ version }}</p>
                  </div>
                  <div class="p-4 rounded-lg border bg-card/40">
                    <p class="text-sm text-muted-foreground mb-1">Platform</p>
                    <p class="font-medium">{{ platform }}</p>
                  </div>
                  <div class="p-4 rounded-lg border bg-card/40">
                    <p class="text-sm text-muted-foreground mb-1">Theme</p>
                    <button @click="toggleTheme" 
                      class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 mt-1">
                      <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" class="mr-2">
                        <circle cx="12" cy="12" r="5"></circle>
                        <line x1="12" y1="1" x2="12" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="23"></line>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                        <line x1="1" y1="12" x2="3" y2="12"></line>
                        <line x1="21" y1="12" x2="23" y2="12"></line>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" class="mr-2">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                      </svg>
                      <span>{{ isDark ? 'Light Mode' : 'Dark Mode' }}</span>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>
