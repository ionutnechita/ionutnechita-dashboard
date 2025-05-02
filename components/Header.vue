<!-- components/Header.vue -->
<template>
    <header :class="['header-container', { 'scrolled': isScrolled }]">
        <div class="header-content">
            <!-- Logo/Brand -->
            <div class="brand">
                <NuxtLink to="/" class="brand-link">
                    <Logo />
                </NuxtLink>
            </div>

            <!-- Spacer -->
            <div class="flex-grow"></div>

            <!-- Navigation buttons -->
            <div class="nav-buttons">
                <!-- Theme toggle button -->
                <button @click="toggleDarkMode" class="theme-toggle-btn" aria-label="Toggle theme">
                    <!-- Icon for dark mode (visible in light mode) -->
                    <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" class="icon">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>

                    <!-- Icon for light mode (visible in dark mode) -->
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" class="icon">
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

                <!-- My Account button with user icon -->
                <button @click="handleMyAccount" class="account-button">
                    <!-- User icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="icon">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span class="ml-2"></span>
                </button>
            </div>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    </header>
</template>

<script setup>
import { inject, ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { SignedIn, UserButton, SignInButton, SignedOut } from '@clerk/vue'
import Logo from './Logo.vue'

// Get theme context from ThemeProvider
const isDark = inject('isDarkMode', false)
const toggleDarkMode = inject('toggleDarkMode', () => { })

// Router for navigation
const router = useRouter()

// My Account handler
const handleMyAccount = () => {
    // Navigate to account page
    router.push('/account')
}

// Scroll effect
const scrollY = ref(0)
const isScrolled = ref(false)

const handleScroll = () => {
    scrollY.value = window.scrollY
    isScrolled.value = scrollY.value > 50
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.header-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: hsla(var(--background), 0.05);
    backdrop-filter: blur(10px);
    color: hsl(var(--foreground));
    border-bottom: 1px solid hsla(var(--border), 0.1);
    z-index: 50;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
}

.header-container.scrolled {
    background: hsla(var(--background), 0.1);
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid hsla(var(--border), 0.2);
}

/* Dark theme adjustments */
@media (prefers-color-scheme: dark) {
    .header-container {
        background: rgba(0, 0, 0, 0.05);
        backdrop-filter: blur(15px);
        -webkit-backdrop-filter: blur(15px);
        color: hsl(var(--foreground));
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .header-container.scrolled {
        background: rgba(0, 0, 0, 0.1);
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .theme-toggle-btn {
        background: rgba(0, 0, 0, 0.8);
    }
    
    .theme-toggle-btn:hover {
        background: rgba(0, 0, 0, 0.95);
    }
    
    .account-button {
        background: rgba(0, 0, 0, 0.1);
    }
    
    .account-button:hover {
        background: rgba(0, 0, 0, 0.2);
    }
}

/* Light theme adjustments */
@media (prefers-color-scheme: light) {
    .header-container {
        background: hsla(var(--background), 0.05);
        color: hsl(var(--foreground));
    }
    
    .header-container.scrolled {
        background: hsla(var(--background), 0.1);
    }
    
    .theme-toggle-btn {
        background: hsla(var(--background), 0.8);
    }
    
    .theme-toggle-btn:hover {
        background: hsla(var(--background), 0.95);
    }
    
    .account-button {
        background: hsla(var(--secondary), 0.1);
    }
    
    .account-button:hover {
        background: hsla(var(--secondary), 0.2);
    }
}

.header-content {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.brand {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.brand-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--header-text);
    text-decoration: none;
    font-weight: 600;
    font-size: 1.1rem;
}

.nav-buttons {
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

.theme-toggle-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    background: hsla(var(--background), 0.8);
    cursor: pointer;
    transition: all 0.2s ease;
    padding: 0.5rem;
}

.theme-toggle-btn:hover {
    background: hsla(var(--background), 0.95);
    transform: scale(1.05);
}

.account-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: hsla(var(--secondary), 0.1);
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
    color: hsl(var(--foreground));
}

.account-button:hover {
    background: hsla(var(--secondary), 0.2);
    transform: translateY(-1px);
}

.icon {
    width: 20px;
    height: 20px;
    stroke-width: 1.5;
    stroke: currentColor;
}

.header-content {
    display: flex;
    align-items: center;
    max-width: 1200px;
    height: 100%;
    margin: 0 auto;
    padding: 0 1.5rem;
}

.brand {
    display: flex;
    align-items: center;
}

.brand-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: hsl(var(--foreground));
    transition: color 0.3s ease;
}

.brand-text {
    font-size: 1.25rem;
    font-weight: 700;
    background: linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent)));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.flex-grow {
    flex-grow: 1;
}

.nav-buttons {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

/* Theme toggle button */
.theme-toggle-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 0.375rem;
    background-color: hsl(var(--secondary));
    color: hsl(var(--secondary-foreground));
    transition: all 0.2s ease;
    border: none;
    cursor: pointer;
}

.theme-toggle-btn:hover {
    background-color: hsl(var(--muted));
}

.theme-toggle-btn:focus-visible {
    outline: 2px solid hsl(var(--ring));
    outline-offset: 2px;
}

/* Account button */
.account-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 2.25rem;
    padding: 0 1rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    background-color: hsl(var(--secondary));
    color: hsl(var(--secondary-foreground));
    transition: all 0.2s ease;
    border: none;
    cursor: pointer;
}

.account-button:hover {
    background-color: hsl(var(--muted));
}

.account-button:focus-visible {
    outline: 2px solid hsl(var(--ring));
    outline-offset: 2px;
}

.ml-2 {
    margin-left: 0.5rem;
}

.icon {
    flex-shrink: 0;
}

/* Responsive adjustments */
@media (max-width: 640px) {
    .account-button {
        padding: 0 0.75rem;
    }

    .brand-text {
        font-size: 1.125rem;
    }

    .account-button span {
        display: none;
        /* Hide text on small screens, show only icon */
    }

    .account-button {
        width: 2.25rem;
        padding: 0;
        justify-content: center;
    }

    .ml-2 {
        margin-left: 0;
    }
}
</style>
