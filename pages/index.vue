<!-- pages/index.vue -->
<template>
  <div class="hello-world-container">
    <!-- Theme toggle button in the top-right corner -->
    <div class="absolute top-4 right-4">
      <button @click="toggleTheme" class="theme-toggle-btn" aria-label="Toggle theme">
        <!-- Icon for dark mode (visible in light mode) -->
        <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>

        <!-- Icon for light mode (visible in dark mode) -->
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
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
      </button>
    </div>

    <!-- Main content of the Hello World page -->
    <div class="hello-content">
      <h1 :class="['title', { 'title-dark': isDark }]">Hello World!</h1>
      <p class="subtitle">Welcome to your first Nuxt.js application.</p>

      <!-- Label component inspired by shadcn/ui -->
      <div class="label-wrapper">
        <label for="counter-button" class="label" :class="{ 'label-dark': isDark }">
          Counter value:
        </label>
        <span class="counter-value" :class="{ 'counter-value-dark': isDark }">
          {{ counter }}
        </span>
      </div>

      <!-- Button component inspired by shadcn/ui -->
      <button id="counter-button" @click="incrementCounter" :class="[
        'shadcn-button',
        { 'shadcn-button-dark': isDark, 'loading': isLoading }
      ]">
        <span v-if="isLoading" class="loading-spinner"></span>
        <span>Press me!</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, computed, watch } from 'vue'

// Sync with global theme using inject
const isDark = inject('isDarkMode')
const toggleTheme = inject('toggleDarkMode')

// Computed property to display current theme (for debugging)
const currentTheme = computed(() => isDark.value ? 'dark' : 'light')

// Local state for counter and loading
const counter = ref(0)
const isLoading = ref(false)

// Function to increment the counter
const incrementCounter = () => {
  isLoading.value = true

  // Simulate loading time
  setTimeout(() => {
    counter.value++
    isLoading.value = false
  }, 300)
}

// Optional: monitor theme changes for debugging
watch(isDark, (newValue) => {
  console.log(`Theme changed to: ${newValue ? 'dark' : 'light'}`)
})
</script>

<style scoped>
/* Main container for page */
.hello-world-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
}

/* Container for central content */
.hello-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Theme toggle button */
.theme-toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  background-color: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.theme-toggle-btn:hover {
  background-color: hsl(var(--muted));
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.theme-toggle-btn:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}

/* Title - style for light mode */
.title {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 1.5rem;
  color: hsl(var(--primary));
  text-align: center;
  transition: all 0.3s ease;
}

/* Title - specific styles for dark mode */
.title-dark {
  color: hsl(var(--primary));
  text-shadow: 0 0 10px hsla(var(--primary), 0.5);
}

/* Subtitle */
.subtitle {
  font-size: 1.25rem;
  color: hsl(var(--muted-foreground));
  margin-bottom: 2.5rem;
  text-align: center;
  transition: color 0.3s ease;
}

/* Label container */
.label-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 0.5rem;
}

/* Counter label */
.label {
  font-size: 0.875rem;
  font-weight: 500;
  color: hsl(var(--foreground));
  transition: all 0.3s ease;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
}

.label-dark {
  background-color: hsla(var(--primary), 0.1);
}

/* Counter value */
.counter-value {
  font-size: 2rem;
  font-weight: 700;
  color: hsl(var(--foreground));
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: hsla(var(--muted), 0.5);
}

.counter-value-dark {
  background-color: hsla(var(--muted), 0.8);
  box-shadow: 0 0 15px hsla(var(--primary), 0.3);
}

/* Button in light theme (black) */
.shadcn-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  height: 2.5rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  background-color: #000000;
  /* Black for light theme */
  color: #ffffff;
  /* White text for contrast */
  transition: all 0.3s ease;
  gap: 0.75rem;
  position: relative;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Button in dark theme (white) */
.shadcn-button-dark {
  background-color: #ffffff;
  /* White for dark theme */
  color: #000000;
  /* Black text for contrast */
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
}

/* Hover effects for button */
.shadcn-button:hover {
  background-color: #333333;
  /* Dark gray for hover in light theme */
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.shadcn-button-dark:hover {
  background-color: #f0f0f0;
  /* Light gray for hover in dark theme */
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.6);
}

/* Focus for button */
.shadcn-button:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}

/* Button states */
.shadcn-button:disabled,
.shadcn-button.loading {
  opacity: 0.7;
  cursor: default;
  transform: translateY(0);
  box-shadow: none;
}

/* Loading spinner */
.loading-spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
