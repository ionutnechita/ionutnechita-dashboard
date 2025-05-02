<script setup lang="ts">
import { ref, onMounted, watch, shallowRef, markRaw, nextTick } from 'vue'

// Import components
import NavMain from '~/components/NavMain.vue'
import NavUser from '~/components/NavUser.vue'
import TeamSwitcher from '~/components/TeamSwitcher.vue'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '~/components/ui/sidebar'

// Import icons using markRaw to avoid unnecessary reactivity
import {
  BookOpen,
  Bot,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Loader2, // Import the Loader2 icon for the spinner
} from 'lucide-vue-next'

// Define props and emits
const props = defineProps({
  collapsible: {
    type: String as () => 'icon' | 'offcanvas' | 'none',
    default: 'icon'
  },
  isCollapsed: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:isCollapsed'])

// Define types
interface NavItem {
  title: string
  url: string
  icon?: any
  isActive?: boolean
  items?: { title: string, url: string }[]
}

// === INITIALIZATION PHASE - SYNCHRONOUS, BEFORE COMPONENT CREATION ===

// Initialize with no default org name
let initialOrgName = '';
let initialSidebarState = props.isCollapsed;

if (typeof window !== 'undefined') {
  try {
    // Load both values in one batch to minimize performance impact
    initialOrgName = localStorage.getItem('orgName') || '';
    const savedState = localStorage.getItem('sidebar:collapsed');
    if (savedState !== null) {
      initialSidebarState = savedState === 'true';
    }
  } catch (e) {
    // Silent fail and keep defaults
  }
}

// Initialize reactive variables with the values loaded above
const sidebarCollapsed = ref(initialSidebarState);
const orgName = ref(initialOrgName);

// Track organization loading state
const isOrgLoading = ref(!initialOrgName);

// Use shallowRef for complex objects and only create team data if we have an org name
const teamData = shallowRef(
  initialOrgName ? [{
    name: initialOrgName,
    logo: markRaw(GalleryVerticalEnd),
    plan: 'Enterprise'
  }] : []
);

// Debounce function to limit localStorage write operations
const debounce = (fn: Function, wait: number) => {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: any[]) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  };
};

// Debounced localStorage functions
const saveToLocalStorage = debounce((key: string, value: string) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(`Failed to save ${key}:`, error);
  }
}, 300);

// Use shallowRef for navItems to avoid deep reactivity overhead
const navItems = shallowRef<NavItem[]>([
  {
    title: 'Playground',
    url: '#',
    icon: markRaw(SquareTerminal),
    items: [
      { title: 'History', url: '#' },
      { title: 'Starred', url: '#' },
      { title: 'Settings', url: '#' },
    ],
  },
  {
    title: 'Models',
    url: '#',
    icon: markRaw(Bot),
    items: [
      { title: 'Genesis', url: '#' },
      { title: 'Explorer', url: '#' },
      { title: 'Quantum', url: '#' },
    ],
  },
  {
    title: 'Documentation',
    url: '#',
    icon: markRaw(BookOpen),
    items: [
      { title: 'Introduction', url: '#' },
      { title: 'Get Started', url: '#' },
      { title: 'Tutorials', url: '#' },
      { title: 'Changelog', url: '#' },
    ],
  },
  {
    title: 'Settings',
    url: '#',
    icon: markRaw(Settings2),
    items: [
      { title: 'General', url: '#' },
      { title: 'Team', url: '#' },
      { title: 'Billing', url: '#' },
      { title: 'Limits', url: '#' },
    ],
  },
]);

// Sync with parent immediately if our initial collapsed state differs from props
if (initialSidebarState !== props.isCollapsed) {
  nextTick(() => {
    emit('update:isCollapsed', initialSidebarState);
  });
}

// Define a timeout for loading state
let loadingTimeout: NodeJS.Timeout | null = null;

// Methods
const updateCollapseState = (value: boolean) => {
  if (sidebarCollapsed.value === value) return;
  
  sidebarCollapsed.value = value;
  saveToLocalStorage('sidebar:collapsed', value.toString());
  emit('update:isCollapsed', value);
};

// Public method for updating org name from Clerk
const updateOrgName = (name: string) => {
  if (!name || name === orgName.value) return;
  
  // If we don't have an org name yet, add a small delay to show loading spinner
  if (!orgName.value && isOrgLoading.value) {
    // Clear any existing timeout
    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
    }
    
    // Set a short timeout (300ms) to ensure spinner is visible briefly
    loadingTimeout = setTimeout(() => {
      // Update the organization name
      orgName.value = name;
      
      // Update team data in a single operation
      teamData.value = [{
        name,
        logo: markRaw(GalleryVerticalEnd),
        plan: 'Enterprise'
      }];
      
      // Save to localStorage for faster loading next time
      saveToLocalStorage('orgName', name);
      
      // Turn off loading state
      isOrgLoading.value = false;
    }, 300);
  } else {
    // If we already have a value, update immediately
    orgName.value = name;
    
    // Update team data in a single operation
    teamData.value = [{
      name,
      logo: markRaw(GalleryVerticalEnd),
      plan: 'Enterprise'
    }];
    
    // Save to localStorage for faster loading next time
    saveToLocalStorage('orgName', name);
    
    // Turn off loading state
    isOrgLoading.value = false;
  }
};

// Cleanup timers when component is unmounted
onMounted(() => {
  return () => {
    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
    }
  };
});

// Watch for prop changes
watch(() => props.isCollapsed, (newValue) => {
  if (sidebarCollapsed.value !== newValue) {
    sidebarCollapsed.value = newValue;
    saveToLocalStorage('sidebar:collapsed', newValue.toString());
  }
}, { immediate: false });

// Expose public methods
defineExpose({
  updateOrgName
});
</script>

<template>
  <div class="app-sidebar-wrapper">
    <Sidebar :collapsible="collapsible" :is-collapsed="sidebarCollapsed" @update:isCollapsed="updateCollapseState">
      <SidebarHeader>
        <!-- Create a header bar with space for content -->
        <div class="w-full relative pb-6">
          <!-- Show organization TeamSwitcher when data is available -->
          <template v-if="orgName && teamData.length > 0 && !isOrgLoading">
            <TeamSwitcher :teams="teamData" />
          </template>
          
          <!-- Empty space when no data and not loading -->
          <template v-else-if="!isOrgLoading">
            <div class="h-14"></div>
          </template>
          
          <!-- Empty space when loading (to keep consistent height) -->
          <template v-else>
            <div class="h-14"></div>
          </template>
          
          <!-- Loading spinner with message positioned at the bottom with more space -->
          <div v-if="isOrgLoading" class="absolute bottom-0 left-0 w-full flex flex-col items-center justify-center pb-3">
            <div class="flex items-center justify-center gap-2 px-4 py-1 rounded-full bg-primary/10 text-primary text-xs">
              <Loader2 class="h-3.5 w-3.5 animate-spin" />
              <span>Loading organization...</span>
            </div>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <NavMain :items="navItems" />
      </SidebarContent>
      
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      
      <SidebarRail />
    </Sidebar>
  </div>
</template>
