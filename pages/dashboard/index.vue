<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

import { ref, onMounted, watch, reactive } from 'vue'
import AppSidebar from '~/components/AppSidebar.vue'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb'
import { Separator } from '~/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '~/components/ui/sidebar'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { useOrganization } from '@clerk/vue'
import { Loader2 } from 'lucide-vue-next'

// Import our custom chart component
import DashboardChart from '~/components/DashboardChart.vue'

// Define interface for the AppSidebar instance
interface AppSidebarInstance {
  updateOrgName?: (name: string) => void;
  [key: string]: any;
}

// State for sidebar collapse
const sidebarCollapsed = ref(false)

// Create a properly typed ref for the AppSidebar component
const sidebarRef = ref<AppSidebarInstance | null>(null)

// Initialize Clerk organization state
const { organization, isLoaded } = useOrganization()

// State for active tab
const activeTab = ref('overview')

// State for loading state
const isLoading = ref(true)

// Analytics cards data
const analyticsCards = reactive([
  {
    title: 'Total Revenue',
    value: '$298,500',
    change: '+12.5%',
    isPositive: true,
    description: 'Annual revenue performance'
  },
  {
    title: 'Active Users',
    value: '1,450',
    change: '+18.2%',
    isPositive: true,
    description: 'Growth from previous year'
  },
  {
    title: 'Completion Rate',
    value: '63%',
    change: '+5.8%',
    isPositive: true,
    description: 'Project completion rate'
  },
  {
    title: 'Avg Response Time',
    value: '1.8h',
    change: '-0.3h',
    isPositive: true,
    description: 'Support response time'
  },
])

// Update sidebar organization name using the ref
const updateSidebarOrgName = () => {
  if (sidebarRef.value && isLoaded.value && organization.value) {
    const orgName = organization.value.name

    // Call the updateOrgName method on the AppSidebar component
    if (sidebarRef.value.updateOrgName) {
      sidebarRef.value.updateOrgName(orgName)
    }
  }
}

// Load sidebar state from localStorage and setup watchers
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

    // Simulate data loading with a timeout
    setTimeout(() => {
      isLoading.value = false
    }, 200)
  }

  // Set timeout to ensure organization updates
  setTimeout(updateSidebarOrgName, 3000)
})

// Watch for organization changes
watch(organization, () => {
  updateSidebarOrgName()
}, { immediate: true })

// Also watch for isLoaded changes
watch(isLoaded, () => {
  updateSidebarOrgName()
}, { immediate: true })
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
                  <BreadcrumbLink href="#">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator class="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Analytics</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <!-- Dashboard Content -->
        <div class="flex flex-col gap-6 p-6">
          <!-- Page Title -->
          <div class="flex flex-col gap-2">
            <h1 class="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
            <p class="text-muted-foreground">
              Track and analyze your organization's performance metrics.
            </p>
          </div>

          <!-- Loading State -->
          <div v-if="isLoading" class="flex h-[50vh] w-full items-center justify-center">
            <Loader2 class="h-8 w-8 animate-spin text-primary" />
          </div>

          <!-- Dashboard Content (when loaded) -->
          <template v-else>
            <!-- Analytics Tabs -->
            <Tabs v-model:value="activeTab" class="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
              </TabsList>

              <!-- Analytics Cards Summary -->
              <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card v-for="(card, index) in analyticsCards" :key="index">
                  <CardHeader class="space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium">
                      {{ card.title }}
                    </CardTitle>
                    <CardDescription>{{ card.description }}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div class="text-2xl font-bold">{{ card.value }}</div>
                    <p class="text-xs mt-1" :class="card.isPositive ? 'text-green-500' : 'text-red-500'">
                      {{ card.change }} from previous period
                    </p>
                  </CardContent>
                </Card>
              </div>

              <!-- Main Interactive Chart Component - Full Width -->
              <div class="grid grid-cols-1">
                <Card class="w-full">
                  <CardHeader>
                    <CardTitle>Performance Analytics</CardTitle>
                    <CardDescription>Interactive visualization of key metrics</CardDescription>
                  </CardHeader>
                  <CardContent class="p-0">
                    <!-- Eliminăm padding-ul implicit al CardContent -->
                    <DashboardChart />
                  </CardContent>
                </Card>
              </div>

              <!-- Tab-specific Content -->

              <!-- Overview Tab Content -->
              <TabsContent value="overview" class="space-y-4">
                <div class="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>Latest system events</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div class="space-y-4">
                        <div class="flex items-start gap-4">
                          <div class="rounded-full bg-primary/10 p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                              stroke-linejoin="round" class="h-4 w-4 text-primary">
                              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                              <polyline points="14 2 14 8 20 8"></polyline>
                            </svg>
                          </div>
                          <div class="space-y-1">
                            <p class="text-sm font-medium">Sales report updated</p>
                            <p class="text-sm text-muted-foreground">Revenue increased by 12% in Q2</p>
                            <p class="text-xs text-muted-foreground">2 hours ago</p>
                          </div>
                        </div>
                        <div class="flex items-start gap-4">
                          <div class="rounded-full bg-primary/10 p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                              stroke-linejoin="round" class="h-4 w-4 text-primary">
                              <circle cx="12" cy="12" r="10"></circle>
                              <path d="M12 8v4l3 3"></path>
                            </svg>
                          </div>
                          <div class="space-y-1">
                            <p class="text-sm font-medium">System maintenance scheduled</p>
                            <p class="text-sm text-muted-foreground">Scheduled for May 10, 2025 at 2:00 AM</p>
                            <p class="text-xs text-muted-foreground">Yesterday</p>
                          </div>
                        </div>
                        <div class="flex items-start gap-4">
                          <div class="rounded-full bg-primary/10 p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                              stroke-linejoin="round" class="h-4 w-4 text-primary">
                              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                              <circle cx="9" cy="7" r="4"></circle>
                              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                          </div>
                          <div class="space-y-1">
                            <p class="text-sm font-medium">New team member added</p>
                            <p class="text-sm text-muted-foreground">Alex Johnson joined the Design team</p>
                            <p class="text-xs text-muted-foreground">3 days ago</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Stats</CardTitle>
                      <CardDescription>Key metrics overview</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div class="space-y-4">
                        <div class="flex items-center justify-between">
                          <div class="space-y-1">
                            <p class="text-sm font-medium">Server Uptime</p>
                            <p class="text-sm text-muted-foreground">Last 30 days</p>
                          </div>
                          <div class="text-right">
                            <p class="text-sm font-medium">99.98%</p>
                            <p class="text-xs text-green-500">+0.1%</p>
                          </div>
                        </div>
                        <div class="flex items-center justify-between">
                          <div class="space-y-1">
                            <p class="text-sm font-medium">API Response Time</p>
                            <p class="text-sm text-muted-foreground">Average</p>
                          </div>
                          <div class="text-right">
                            <p class="text-sm font-medium">87ms</p>
                            <p class="text-xs text-green-500">-12ms</p>
                          </div>
                        </div>
                        <div class="flex items-center justify-between">
                          <div class="space-y-1">
                            <p class="text-sm font-medium">Error Rate</p>
                            <p class="text-sm text-muted-foreground">Last 7 days</p>
                          </div>
                          <div class="text-right">
                            <p class="text-sm font-medium">0.03%</p>
                            <p class="text-xs text-green-500">-0.01%</p>
                          </div>
                        </div>
                        <div class="flex items-center justify-between">
                          <div class="space-y-1">
                            <p class="text-sm font-medium">Active Projects</p>
                            <p class="text-sm text-muted-foreground">Currently running</p>
                          </div>
                          <div class="text-right">
                            <p class="text-sm font-medium">24</p>
                            <p class="text-xs text-green-500">+3</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <!-- Revenue Tab Content -->
              <TabsContent value="revenue">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Breakdown</CardTitle>
                    <CardDescription>Detailed revenue analysis by channel</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div class="space-y-6">
                      <div class="space-y-2">
                        <div class="flex items-center justify-between">
                          <div class="space-y-1">
                            <p class="text-sm font-medium">Direct Sales</p>
                          </div>
                          <div class="font-medium">$156,230</div>
                        </div>
                        <div class="h-2 w-full rounded-full bg-secondary">
                          <div class="h-2 rounded-full bg-primary" style="width: 52%;"></div>
                        </div>
                        <div class="flex justify-between text-xs text-muted-foreground">
                          <div>52%</div>
                          <div>+12% from last year</div>
                        </div>
                      </div>

                      <div class="space-y-2">
                        <div class="flex items-center justify-between">
                          <div class="space-y-1">
                            <p class="text-sm font-medium">Partner Network</p>
                          </div>
                          <div class="font-medium">$89,640</div>
                        </div>
                        <div class="h-2 w-full rounded-full bg-secondary">
                          <div class="h-2 rounded-full bg-blue-500" style="width: 30%;"></div>
                        </div>
                        <div class="flex justify-between text-xs text-muted-foreground">
                          <div>30%</div>
                          <div>+8% from last year</div>
                        </div>
                      </div>

                      <div class="space-y-2">
                        <div class="flex items-center justify-between">
                          <div class="space-y-1">
                            <p class="text-sm font-medium">Online Store</p>
                          </div>
                          <div class="font-medium">$53,960</div>
                        </div>
                        <div class="h-2 w-full rounded-full bg-secondary">
                          <div class="h-2 rounded-full bg-green-500" style="width: 18%;"></div>
                        </div>
                        <div class="flex justify-between text-xs text-muted-foreground">
                          <div>18%</div>
                          <div>+25% from last year</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <!-- Users Tab Content -->
              <TabsContent value="users">
                <div class="grid gap-4 md:grid-cols-7">
                  <Card class="md:col-span-4">
                    <CardHeader>
                      <CardTitle>User Demographics</CardTitle>
                      <CardDescription>User distribution by region</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div class="h-[300px]">
                        <!-- Placeholder for user demographics chart -->
                        <div class="h-full w-full flex items-center justify-center text-muted-foreground">
                          <p>User demographic visualization goes here</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card class="md:col-span-3">
                    <CardHeader>
                      <CardTitle>Top User Segments</CardTitle>
                      <CardDescription>Most active user groups</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div class="space-y-4">
                        <div class="flex items-center justify-between">
                          <div class="flex items-center gap-2">
                            <div class="h-2 w-2 rounded-full bg-primary"></div>
                            <p class="text-sm font-medium">Enterprise</p>
                          </div>
                          <p class="text-sm">42%</p>
                        </div>

                        <div class="flex items-center justify-between">
                          <div class="flex items-center gap-2">
                            <div class="h-2 w-2 rounded-full bg-blue-500"></div>
                            <p class="text-sm font-medium">SMB</p>
                          </div>
                          <p class="text-sm">28%</p>
                        </div>

                        <div class="flex items-center justify-between">
                          <div class="flex items-center gap-2">
                            <div class="h-2 w-2 rounded-full bg-green-500"></div>
                            <p class="text-sm font-medium">Startups</p>
                          </div>
                          <p class="text-sm">18%</p>
                        </div>

                        <div class="flex items-center justify-between">
                          <div class="flex items-center gap-2">
                            <div class="h-2 w-2 rounded-full bg-yellow-500"></div>
                            <p class="text-sm font-medium">Individual</p>
                          </div>
                          <p class="text-sm">12%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <!-- Projects Tab Content -->
              <TabsContent value="projects">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Status</CardTitle>
                    <CardDescription>Overview of current projects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div class="relative w-full overflow-auto">
                      <table class="w-full caption-bottom text-sm">
                        <thead>
                          <tr class="border-b">
                            <th class="h-12 px-4 text-left font-medium">Project</th>
                            <th class="h-12 px-4 text-left font-medium">Status</th>
                            <th class="h-12 px-4 text-left font-medium">Progress</th>
                            <th class="h-12 px-4 text-left font-medium">Deadline</th>
                            <th class="h-12 px-4 text-left font-medium">Team</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="border-b">
                            <td class="p-4 align-middle font-medium">Mobile App Redesign</td>
                            <td class="p-4 align-middle">
                              <div
                                class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-yellow-100 text-yellow-800">
                                In Progress</div>
                            </td>
                            <td class="p-4 align-middle">
                              <div class="w-full h-2 bg-secondary rounded-full overflow-hidden">
                                <div class="bg-primary h-2 rounded-full" style="width: 65%"></div>
                              </div>
                              <div class="text-xs text-muted-foreground mt-1">65%</div>
                            </td>
                            <td class="p-4 align-middle">June 12, 2025</td>
                            <td class="p-4 align-middle">Design</td>
                          </tr>
                          <tr class="border-b">
                            <td class="p-4 align-middle font-medium">API Gateway Implementation</td>
                            <td class="p-4 align-middle">
                              <div
                                class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                                Completed</div>
                            </td>
                            <td class="p-4 align-middle">
                              <div class="w-full h-2 bg-secondary rounded-full overflow-hidden">
                                <div class="bg-green-500 h-2 rounded-full" style="width: 100%"></div>
                              </div>
                              <div class="text-xs text-muted-foreground mt-1">100%</div>
                            </td>
                            <td class="p-4 align-middle">April 30, 2025</td>
                            <td class="p-4 align-middle">Engineering</td>
                          </tr>
                          <tr class="border-b">
                            <td class="p-4 align-middle font-medium">Marketing Campaign</td>
                            <td class="p-4 align-middle">
                              <div
                                class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-blue-100 text-blue-800">
                                Planning</div>
                            </td>
                            <td class="p-4 align-middle">
                              <div class="w-full h-2 bg-secondary rounded-full overflow-hidden">
                                <div class="bg-blue-500 h-2 rounded-full" style="width: 20%"></div>
                              </div>
                              <div class="text-xs text-muted-foreground mt-1">20%</div>
                            </td>
                            <td class="p-4 align-middle">July 15, 2025</td>
                            <td class="p-4 align-middle">Marketing</td>
                          </tr>
                          <tr>
                            <td class="p-4 align-middle font-medium">Database Migration</td>
                            <td class="p-4 align-middle">
                              <div
                                class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-red-100 text-red-800">
                                Delayed</div>
                            </td>
                            <td class="p-4 align-middle">
                              <div class="w-full h-2 bg-secondary rounded-full overflow-hidden">
                                <div class="bg-red-500 h-2 rounded-full" style="width: 45%"></div>
                              </div>
                              <div class="text-xs text-muted-foreground mt-1">45%</div>
                            </td>
                            <td class="p-4 align-middle">May 8, 2025</td>
                            <td class="p-4 align-middle">Infrastructure</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </template>
        </div>
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>
