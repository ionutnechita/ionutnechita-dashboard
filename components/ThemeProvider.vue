<!-- components/ThemeProvider.vue -->
<template>
    <slot></slot>
</template>

<script setup>
import { ref, provide, onMounted, watch } from 'vue'

// State for current theme (dark/light)
const isDarkMode = ref(false)

// Function to toggle between dark and light themes
const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    applyDarkMode()
}

// Apply the theme at the HTML document level
const applyDarkMode = () => {
    // Add or remove the 'dark' class on the html element
    if (isDarkMode.value) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }

    // Save user preference in localStorage
    localStorage.setItem('darkMode', isDarkMode.value ? 'dark' : 'light')
}

// Expose state and function to be used in child components
provide('isDarkMode', isDarkMode)
provide('toggleDarkMode', toggleDarkMode)

// Monitor state changes and apply the theme
watch(isDarkMode, () => {
    applyDarkMode()
})

// Initialize on component mount
onMounted(() => {
    if (typeof window !== 'undefined') {
        // Check only for explicitly saved user preference
        const savedTheme = localStorage.getItem('darkMode')

        // Set theme based ONLY on saved preference, ignoring system preferences
        // Default theme is 'light'
        isDarkMode.value = savedTheme === 'dark'

        // Ensure we have light theme if no preference is saved
        if (savedTheme === null) {
            isDarkMode.value = false
            localStorage.setItem('darkMode', 'light')
        }

        // Apply the theme immediately after setting it
        applyDarkMode()
    }
})
</script>
