<script setup lang="ts">
import { SignIn } from '@clerk/vue'
import { ref, onMounted, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@clerk/vue'

const isMounted = ref(false)
const showSpinner = ref(true)  // For the initial spinner when loading the form
const showAuthTransition = ref(false)  // For the transition overlay
const router = useRouter()
const { isSignedIn, isLoaded } = useAuth()

// Function to handle redirection after authentication
const handleRedirect = () => {
  // Activate the transition overlay
  showAuthTransition.value = true

  // Redirect to dashboard after a short delay
  setTimeout(() => {
    router.push('/dashboard')
  }, 100)
}

// Watch for changes in authentication state
watch(isSignedIn, (newValue) => {
  if (newValue === true) {
    handleRedirect()
  }
}, { immediate: true })

onMounted(async () => {
  await nextTick()

  // Check if user is already authenticated
  if (isLoaded.value && isSignedIn.value) {
    handleRedirect()
    return
  }

  isMounted.value = true

  // Add a MutationObserver to detect when the form appears
  if (process.client) {
    const observer = new MutationObserver(() => {
      // Check if the Clerk element exists
      if (document.querySelector('.cl-card')) {
        // Hide the initial spinner when the form is present
        showSpinner.value = false
        // Stop observing
        observer.disconnect()

        // Add a new observer to detect authentication events
        // and activate the transition spinner faster
        const authObserver = new MutationObserver((mutations) => {
          // If the form disappears after authentication
          if (!document.querySelector('.cl-card')) {
            showAuthTransition.value = true
            authObserver.disconnect()
          }
        })

        authObserver.observe(document.body, {
          childList: true,
          subtree: true
        })
      }
    })

    // Observe DOM changes for the Clerk form
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    // Safety timeout to hide the spinner after a while
    setTimeout(() => {
      showSpinner.value = false
    }, 3000)
  }

  // Configure redirection for sign-up links
  setTimeout(() => {
    if (!process.client) return

    const links = document.querySelectorAll('a')
    links.forEach(link => {
      const text = link.textContent?.trim().toLowerCase() || ''
      if (text.includes('sign up') || text.includes('create account')) {
        link.addEventListener('click', (e) => {
          e.preventDefault()
          window.location.href = '/sign-up'
        })
      }
    })
  }, 1000)
})
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: hsl(var(--background));
}
.login-card {
  width: 100%;
  max-width: 400px;
  background-color: hsl(var(--card));
  border-radius: 0.5rem;
  border: 1px solid hsl(var(--border));
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  position: relative; /* For absolute positioning of the spinner */
}
.login-header {
  padding: 2rem 2rem 1rem;
  text-align: center;
}
.login-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: hsl(var(--foreground));
  margin-bottom: 0.5rem;
}
.login-subtitle {
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;
}

/* Styles for spinner */
.spinner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid hsl(var(--primary, #3498db));
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  margin-top: 16px;
  font-size: 14px;
  color: hsl(var(--foreground, #333));
}

/* Styles for redirect overlay */
.redirect-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: hsl(var(--background, #ffffff));
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.redirect-text {
  font-size: 1.25rem;
  font-weight: 500;
  color: hsl(var(--foreground, #333));
}

@media (max-width: 640px) {
  .login-container {
    padding: 1rem;
  }
  .login-card {
    border-radius: 0.25rem;
  }
  .login-header {
    padding: 1.5rem 1.5rem 1rem;
  }
}
</style>

<template>
  <div v-if="!showAuthTransition" class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1 class="login-title">Sign In</h1>
        <p class="login-subtitle">Welcome back! Please sign in to your account.</p>
      </div>

      <!-- Spinner overlay that displays over all content during loading -->
      <div v-if="showSpinner" class="spinner-overlay">
        <div class="spinner"></div>
        <p class="loading-text">Loading sign-in form...</p>
      </div>

      <!-- Login form (will be visually hidden by spinner until loaded) -->
      <client-only>
        <SignIn
          v-if="isMounted"
          :sign-up-url="'/sign-up'"
          :fallback-redirect-url="'/dashboard'"
        />
        <template #placeholder>
          <!-- Empty placeholder because the spinner is already displayed via overlay -->
        </template>
      </client-only>
    </div>
  </div>

  <!-- Redirect overlay (simple, full-page) -->
  <div v-if="showAuthTransition" class="redirect-overlay">
    <p class="redirect-text">Redirecting to dashboard...</p>
  </div>
</template>
