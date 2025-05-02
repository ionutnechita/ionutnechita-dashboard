<script setup lang="ts">
import { ref, computed, watch, shallowRef, markRaw, onMounted } from 'vue'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '~/components/ui/avatar'
import { RouterLink } from 'vue-router'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '~/components/ui/sidebar'
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
  Loader2,
} from 'lucide-vue-next'
import { useUser } from '@clerk/vue'
import { SignOutButton } from '@clerk/vue'

// ===== PERFORMANCE OPTIMIZATIONS =====

// Load cached user data from localStorage immediately
let cachedUserData = {
  userName: '',
  userEmail: '',
  userAvatar: '',
  userInitials: ''
};

// Initialize with localStorage data if available (synchronously)
if (typeof window !== 'undefined') {
  try {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      cachedUserData = {
        userName: parsedData.userName || '',
        userEmail: parsedData.userEmail || '',
        userAvatar: parsedData.userAvatar || '',
        userInitials: parsedData.userInitials || ''
      };
    }
  } catch (e) {
    // Silent fail - we'll use default empty values
  }
}

// Create reactive state
const userState = shallowRef({
  ...cachedUserData,
  isLoading: !cachedUserData.userName // Only show loading if we don't have cached data
});

// Import Clerk's user hook
const { user } = useUser();
const { isMobile } = useSidebar();

// Debounce function for localStorage writes
const debounce = (fn, wait) => {
  let timeout = null;
  return (...args) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  };
};

// Debounced localStorage save function
const saveUserData = debounce((data) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('userData', JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save user data:', error);
  }
}, 300);

// Watch for Clerk user data and update our state
watch(() => user.value, (newUser) => {
  if (!newUser) return;
  
  // Extract user data from Clerk
  const userName = newUser.username ||
    newUser.publicMetadata?.username ||
    newUser.publicMetadata?.firstName ||
    newUser.publicMetadata?.name ||
    newUser.id ||
    'Unknown';
    
  const userEmail = newUser.emailAddresses?.find(e => e.verification?.status === 'verified')?.emailAddress ||
    newUser.emailAddresses?.[0]?.emailAddress ||
    'Not available';
    
  const userAvatar = newUser.imageUrl || '';
  
  // Calculate initials
  let userInitials = 'NA';
  if (userName && typeof userName === 'string' && userName !== 'Unknown' && userName !== 'Not available') {
    const parts = userName.split(' ');
    if (parts.length >= 2) {
      userInitials = (parts[0][0] + parts[1][0]).toUpperCase();
    } else {
      userInitials = userName.substring(0, 2).toUpperCase();
    }
  }
  
  // Create new user data object
  const newUserData = {
    userName,
    userEmail,
    userAvatar,
    userInitials
  };
  
  // If we didn't have data before, add a small delay to show loading
  if (userState.value.isLoading) {
    setTimeout(() => {
      userState.value = {
        ...newUserData,
        isLoading: false
      };
      
      // Save to localStorage for next time
      saveUserData(newUserData);
    }, 300); // Small delay to ensure loader is visible
  } else {
    // Otherwise update immediately
    userState.value = {
      ...newUserData,
      isLoading: false
    };
    
    // Save to localStorage for next time
    saveUserData(newUserData);
  }
}, { immediate: true });
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
            <!-- Show user data when available -->
            <template v-if="!userState.isLoading">
              <Avatar class="h-8 w-8 rounded-lg">
                <AvatarImage :src="userState.userAvatar" :alt="userState.userName" />
                <AvatarFallback class="rounded-lg">
                  {{ userState.userInitials }}
                </AvatarFallback>
              </Avatar>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-medium">{{ userState.userName }}</span>
                <span class="truncate text-xs">{{ userState.userEmail }}</span>
              </div>
              <ChevronsUpDown class="ml-auto size-4" />
            </template>
            
            <!-- Clean loading state with only the pill indicator visible -->
            <template v-else>
              <!-- Empty space in place of avatar to maintain layout -->
              <div class="h-8 w-8 opacity-0">
                <!-- Nothing visible here -->
              </div>
              
              <!-- Empty space for content area with just the loading indicator -->
              <div class="flex-1 flex items-center justify-start">
                <div class="flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs">
                  <Loader2 class="h-3 w-3 animate-spin" />
                  <span class="truncate">Loading user...</span>
                </div>
              </div>
              
              <!-- Empty space where the chevron would be -->
              <div class="ml-auto size-4 opacity-0"></div>
            </template>
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          :side="isMobile ? 'bottom' : 'right'" align="end" :side-offset="4">
          <DropdownMenuLabel class="p-0 font-normal">
            <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <!-- Clean loading state in the dropdown -->
              <template v-if="userState.isLoading">
                <div class="flex items-center justify-center w-full py-2">
                  <div class="flex items-center justify-center gap-2 px-4 py-1 rounded-full bg-primary/10 text-primary text-xs">
                    <Loader2 class="h-3.5 w-3.5 animate-spin" />
                    <span class="truncate">Loading user data...</span>
                  </div>
                </div>
              </template>
              
              <!-- Show user data in dropdown when available -->
              <template v-else>
                <Avatar class="h-8 w-8 rounded-lg">
                  <AvatarImage :src="userState.userAvatar" :alt="userState.userName" />
                  <AvatarFallback class="rounded-lg">
                    {{ userState.userInitials }}
                  </AvatarFallback>
                </Avatar>
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-semibold">{{ userState.userName }}</span>
                  <span class="truncate text-xs">{{ userState.userEmail }}</span>
                </div>
              </template>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Sparkles />
              Upgrade to Pro
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <RouterLink to="/account">
                <div class="flex items-center gap-2">
                  <BadgeCheck />
                  Account
                </div>
              </RouterLink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard />
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell />
              Notifications
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutButton>
              <template #default>
                <div class="flex items-center gap-2">
                  <LogOut />
                  Log out
                </div>
              </template>
            </SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
