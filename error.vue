<!-- error.vue - Place this in your root directory alongside app.vue -->
<template>
    <div class="error-container" :class="{ 'dark-mode': isDark }">
        <!-- Theme toggle button in the top-right corner -->
        <div class="absolute top-4 right-4">
            <button @click="handleThemeToggle" class="theme-toggle-btn" aria-label="Toggle theme">
                <!-- Icon for dark mode (visible in light mode) -->
                <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="icon">
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

        <div class="error-content">
            <div class="error-status">
                <h1 class="error-code">{{ error?.statusCode || '404' }}</h1>
                <div class="error-divider"></div>
                <h2 class="error-message">{{ error?.statusMessage || 'Page not found' }}</h2>
            </div>

            <p class="error-description">
                {{ getErrorDescription() }}
            </p>

            <div class="error-actions">
                <button @click="handleError" :class="[
                    'error-button',
                    { 'error-button-dark': isDark }
                ]">
                    Back to Home
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { clearError } from '#app'

// Props from Nuxt error handling system
const props = defineProps({
    error: Object
})

// Set up local state for theme management
// Error pages can sometimes lose access to the injected state
const isDark = ref(false)

// Function to handle theme toggle
const handleThemeToggle = () => {
    isDark.value = !isDark.value
    applyTheme()
}

// Apply theme to document and save to localStorage
const applyTheme = () => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        if (isDark.value) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }

        // Save theme preference
        localStorage.setItem('darkMode', isDark.value ? 'dark' : 'light')
    }
}

// Initialize theme on mount
onMounted(() => {
    if (typeof window !== 'undefined') {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('darkMode')
        isDark.value = savedTheme === 'dark'

        // Apply theme immediately
        applyTheme()
    }
})

// Function to return appropriate error description based on status code
const getErrorDescription = () => {
    if (!props.error) return 'The page you are looking for might have been removed or is temporarily unavailable.'

    const statusCode = props.error.statusCode || 404

    switch (statusCode) {
        case 404:
            return 'The page you are looking for might have been removed or is temporarily unavailable.'
        case 500:
            return 'The server encountered an internal error and was unable to complete your request.'
        case 403:
            return 'You do not have permission to access this resource.'
        default:
            return 'An error occurred while processing your request. Please try again later.'
    }
}

// Function to clear error and redirect to home page
const handleError = () => {
    clearError({ redirect: '/' })
}
</script>

<style scoped>
.error-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 2rem;
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
    transition: background-color 0.3s ease, color 0.3s ease;
}

.error-content {
    max-width: 600px;
    text-align: center;
    animation: fadeIn 0.5s ease-in-out;
}

/* Theme toggle button styles */
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

.error-status {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
}

.error-code {
    font-size: 6rem;
    font-weight: 700;
    color: hsl(var(--primary));
    margin: 0;
    line-height: 1;
    text-shadow: 0 0 10px hsla(var(--primary), 0.3);
}

.error-divider {
    height: 60px;
    width: 2px;
    background-color: hsl(var(--border));
    margin: 0 1.5rem;
}

.error-message {
    font-size: 1.75rem;
    font-weight: 500;
    color: hsl(var(--foreground));
    margin: 0;
}

.error-description {
    font-size: 1.125rem;
    color: hsl(var(--muted-foreground));
    margin-bottom: 2.5rem;
    line-height: 1.6;
}

.error-actions {
    display: flex;
    justify-content: center;
}

/* Button with black background in light theme */
.error-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    border-radius: 0.375rem;
    font-size: 1rem;
    font-weight: 500;
    height: 2.75rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    background-color: #000000;
    /* Black for light theme */
    color: #ffffff;
    /* White text for contrast */
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Button with white background in dark theme */
.error-button-dark {
    background-color: #ffffff;
    /* White for dark theme */
    color: #000000;
    /* Black text for contrast */
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
}

.error-button:hover {
    background-color: #333333;
    /* Dark gray for hover in light theme */
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.error-button-dark:hover {
    background-color: #f0f0f0;
    /* Light gray for hover in dark theme */
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.6);
}

/* Animation for error page */
@keyframes fadeIn {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsive adjustments */
@media (max-width: 640px) {
    .error-status {
        flex-direction: column;
        gap: 1rem;
    }

    .error-divider {
        height: 2px;
        width: 80px;
        margin: 0.5rem 0;
    }

    .error-code {
        font-size: 5rem;
    }

    .error-message {
        font-size: 1.5rem;
    }
}
</style>
