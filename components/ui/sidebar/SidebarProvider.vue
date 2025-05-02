<script setup lang="ts">
import { cn } from '@/lib/utils'
import { useEventListener, useMediaQuery, useVModel } from '@vueuse/core'
import { TooltipProvider } from 'reka-ui'
import { computed, type HTMLAttributes, type Ref, ref, onMounted } from 'vue'
import { provideSidebarContext, SIDEBAR_COOKIE_MAX_AGE, SIDEBAR_COOKIE_NAME, SIDEBAR_KEYBOARD_SHORTCUT, SIDEBAR_WIDTH, SIDEBAR_WIDTH_ICON } from './utils'

const props = withDefaults(defineProps<{
  defaultOpen?: boolean
  open?: boolean
  class?: HTMLAttributes['class']
}>(), {
  defaultOpen: true,
  open: undefined,
})

const emits = defineEmits<{
  'update:open': [open: boolean]
}>()

const isMobile = useMediaQuery('(max-width: 768px)')
const openMobile = ref(false)

// Set up v-model with initial value from persistent storage
const open = useVModel(props, 'open', emits, {
  defaultValue: props.defaultOpen ?? false,
  passive: (props.open === undefined) as false,
}) as Ref<boolean>

// Check localStorage on mount for saved state
onMounted(() => {
  if (typeof window !== 'undefined') {
    try {
      // First check localStorage
      const localStorageState = localStorage.getItem('sidebar:state')
      if (localStorageState !== null) {
        // Apply saved state
        open.value = localStorageState === 'expanded'

        // Also update cookie for consistency
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${open.value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
      }
      // If no localStorage value, try to read from cookie as fallback
      else {
        const cookieValue = document.cookie
          .split('; ')
          .find(row => row.startsWith(SIDEBAR_COOKIE_NAME))
          ?.split('=')[1]

        if (cookieValue !== undefined) {
          open.value = cookieValue === 'true'

          // Save to localStorage for future use
          localStorage.setItem('sidebar:state', open.value ? 'expanded' : 'collapsed')
        }
      }
    } catch (error) {
      console.error('Failed to load sidebar state:', error)
    }
  }
})

function setOpen(value: boolean) {
  open.value = value // emits('update:open', value)

  // Save to both cookie and localStorage
  if (typeof window !== 'undefined') {
    try {
      // Set cookie as before
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${open.value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`

      // Also save to localStorage for better persistence
      localStorage.setItem('sidebar:state', open.value ? 'expanded' : 'collapsed')
    } catch (error) {
      console.error('Failed to save sidebar state:', error)
    }
  }
}

function setOpenMobile(value: boolean) {
  openMobile.value = value
}

// Helper to toggle the sidebar.
function toggleSidebar() {
  return isMobile.value ? setOpenMobile(!openMobile.value) : setOpen(!open.value)
}

useEventListener('keydown', (event: KeyboardEvent) => {
  if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
    event.preventDefault()
    toggleSidebar()
  }
})

// We add a state so that we can do data-state="expanded" or "collapsed".
// This makes it easier to style the sidebar with Tailwind classes.
const state = computed(() => open.value ? 'expanded' : 'collapsed')

provideSidebarContext({
  state,
  open,
  setOpen,
  isMobile,
  openMobile,
  setOpenMobile,
  toggleSidebar,
})
</script>

<template>
  <TooltipProvider :delay-duration="0">
    <div data-slot="sidebar-wrapper" :style="{
      '--sidebar-width': SIDEBAR_WIDTH,
      '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
    }" :class="cn('group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full', props.class)"
      v-bind="$attrs">
      <slot />
    </div>
  </TooltipProvider>
</template>
