// middleware/auth.js
import { useUser } from '@clerk/vue'
import { navigateTo } from '#app'

export default defineNuxtRouteMiddleware((to) => {
  // Get the user from Clerk
  const { user } = useUser()
  
  if (!user.value && to.path !== '/login' && to.path !== '/sign-up') {
    return navigateTo('/login')
  }

  if (user.value && (to.path === '/login' || to.path === '/sign-up')) {
    return navigateTo('/dashboard')
  }
  
  if (user.value && (to.path === '/account' || to.path.startsWith('/dashboard'))) {
    return
  }
  
  if (user.value) {
    return navigateTo('/dashboard')
  }
})
