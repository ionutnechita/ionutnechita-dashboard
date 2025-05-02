import { useAuth } from '@clerk/vue'
import { navigateTo } from '#app'

export default defineNuxtRouteMiddleware(async (to) => {
  if (process.server) {
    return
  }

  const { isLoaded, isSignedIn } = useAuth()

  const publicRoutes = ['/login', '/sign-up']
  const isPublicRoute = publicRoutes.includes(to.path)

  if (!isLoaded.value) {
    const startTime = Date.now()
    const timeout = 3000

    while (!isLoaded.value && (Date.now() - startTime < timeout)) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    if (!isLoaded.value) {
      try {
        const token = localStorage.getItem('clerk-session-token') ||
          localStorage.getItem('__clerk_client_jwt')

        if (token && !isPublicRoute) {
          return
        } else if (!token && !isPublicRoute) {
          localStorage.setItem('authRedirect', to.fullPath)
          return navigateTo('/login')
        } else if (token && isPublicRoute) {
          return navigateTo('/dashboard')
        }
      } catch (error) {
        console.error('Error checking localStorage:', error)
        if (!isPublicRoute) {
          localStorage.setItem('authRedirect', to.fullPath)
          return navigateTo('/login')
        }
      }
    }
  }

  if (!isSignedIn.value && !isPublicRoute) {
    localStorage.setItem('authRedirect', to.fullPath)

    return navigateTo('/login')
  }

  if (isSignedIn.value && isPublicRoute) {
    return navigateTo('/dashboard')
  }

  return
})
