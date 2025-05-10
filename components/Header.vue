<script setup lang="ts">
import {
  inject,
  ref,
  onMounted,
  onBeforeUnmount,
  computed,
  shallowRef,
  markRaw,
} from "vue";
import { useRouter, useRoute } from "vue-router";
import Logo from "./Logo.vue";

// Try importing Clerk components, but don't fail if they don't exist
let SignedIn, useClerk, useAuth, isSignedIn;

try {
  const clerk = await import("@clerk/vue");
  SignedIn = markRaw(clerk.SignedIn);
  useClerk = clerk.useClerk;
  useAuth = clerk.useAuth;
  const auth = useAuth();
  isSignedIn = auth.isSignedIn || ref(false);
} catch (e) {
  // Clerk is not installed, use placeholder components
  SignedIn = null;
  useClerk = () => ({});
  useAuth = () => ({ isSignedIn: ref(false) });
  isSignedIn = ref(false);
}

// Define types for injected values
type ToggleDarkModeFn = () => void;

// Get theme context from ThemeProvider or use local implementation
const isDark = inject<boolean | { value: boolean }>("isDarkMode", ref(false));
const toggleDarkMode = inject<ToggleDarkModeFn>("toggleDarkMode", () => {
  if (typeof isDark === "object" && "value" in isDark) {
    isDark.value = !isDark.value;
    if (isDark.value) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }
});

// Router for navigation
const router = useRouter();
const route = useRoute();
const isHomePage = computed(() => route.path === "/");

// Get Clerk instance for signOut functionality if available
const clerk = useClerk();

// Navigation handlers - optimized with single functions
const navigateTo = (path) => {
  router.push(path);
  isMobileMenuOpen.value = false;
};

// ADĂUGAT: Funcție pentru a naviga la începutul paginii
const navigateToTop = () => {
  if (isHomePage.value) {
    // Dacă suntem deja pe pagina principală, doar facem scroll la început
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    // Dacă suntem pe o altă pagină, navigăm la pagina principală și apoi facem scroll la început
    router.push("/").then(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Închidem meniul mobil dacă este deschis
  isMobileMenuOpen.value = false;
};

// Keep original logout handling
const handleLogout = async () => {
  try {
    // Check if user is signed in before attempting to sign out
    if (isSignedIn && isSignedIn.value) {
      if (clerk && typeof clerk.signOut === "function") {
        await clerk.signOut();
      } else if (
        clerk &&
        clerk.value &&
        typeof clerk.value.signOut === "function"
      ) {
        await clerk.value.signOut();
      } else {
        console.error("Clerk signOut is not available!");
      }
      // Small delay before redirect to ensure clerk completes the signout
      setTimeout(() => {
        router.push("/");
      }, 100);
    } else {
      console.warn("Cannot log out - no active session");
    }
  } catch (error) {
    console.error("Logout error:", error);
  }
};

// Mobile menu state
const isMobileMenuOpen = ref(false);
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// Scroll effect with debounce
const isScrolled = ref(false);
let scrollTimeout = null;

const handleScroll = () => {
  if (scrollTimeout) return;

  scrollTimeout = setTimeout(() => {
    isScrolled.value = window.scrollY > 50;
    scrollTimeout = null;
  }, 10);
};

// Section navigation - optimized
const scrollToSection = (sectionId) => {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

const handleSectionLink = (sectionId) => {
  if (isHomePage.value) {
    scrollToSection(sectionId);
  } else {
    router.push("/").then(() => {
      // Scroll după ce pagina s-a încărcat
      setTimeout(() => scrollToSection(sectionId), 200);
    });
  }

  // Close mobile menu if open
  isMobileMenuOpen.value = false;
};

// Lifecycle hooks
onMounted(() => {
  window.addEventListener("scroll", handleScroll);

  // Initialize theme from localStorage or system preference
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (typeof isDark === "object" && "value" in isDark) {
      if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
        isDark.value = true;
        document.documentElement.classList.add("dark");
      } else {
        isDark.value = false;
        document.documentElement.classList.remove("dark");
      }
    }
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  if (scrollTimeout) clearTimeout(scrollTimeout);
});

// Computed for isDarkValue to simplify template conditions - optimized
const isDarkValue = computed(() => {
  return typeof isDark === "object" && "value" in isDark
    ? isDark.value
    : isDark;
});
</script>

<template>
  <header
    :class="[
      'header-container',
      { scrolled: isScrolled, 'light-theme': !isDarkValue },
    ]"
  >
    <div class="header-content">
      <!-- Logo/Brand - MODIFICAT: Adăugat click handler pentru navigare la începutul paginii -->
      <div class="brand">
        <a @click.prevent="navigateToTop" class="brand-link">
          <Logo />
        </a>
      </div>

      <!-- Desktop Navigation for Landing Page Links (hidden on mobile) -->
      <nav class="hidden md:flex items-center space-x-6 ml-auto mr-6">
        <!-- ADĂUGAT: Buton Home pentru a merge la începutul paginii -->
        <a @click.prevent="navigateToTop" class="nav-link">Acasă</a>

        <template
          v-for="(item, index) in [
            { id: 'about', label: 'Despre' },
            { id: 'experience', label: 'Experiență' },
            { id: 'skills', label: 'Competențe' },
            { id: 'projects', label: 'Proiecte' },
            { id: 'contact', label: 'Contact', isContact: true },
          ]"
          :key="index"
        >
          <a
            @click.prevent="handleSectionLink(item.id)"
            :class="['nav-link', { 'contact-button': item.isContact }]"
            :href="`#${item.id}`"
            >{{ item.label }}</a
          >
        </template>
        <div class="header-separator" aria-hidden="true"></div>
      </nav>

      <!-- Navigation buttons -->
      <div class="nav-buttons">
        <!-- Only show dashboard/logout buttons when signed in -->
        <component :is="SignedIn" v-if="SignedIn">
          <!-- Dashboard button with dashboard icon -->
          <button
            @click="navigateTo('/dashboard')"
            class="dashboard-button tooltip dashboard-tooltip"
            aria-label="Dashboard"
          >
            <!-- Dashboard icon (grid/layout icon) -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          </button>
        </component>

        <!-- Account button with user icon -->
        <button
          @click="navigateTo('/account')"
          class="account-button tooltip account-tooltip"
          aria-label="Account settings"
        >
          <!-- User icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </button>

        <component :is="SignedIn" v-if="SignedIn">
          <button
            @click="handleLogout"
            class="logout-button tooltip logout-tooltip"
            aria-label="Logout"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </component>

        <!-- Theme toggle button (always visible) -->
        <button
          @click="toggleDarkMode"
          class="theme-toggle-btn tooltip theme-tooltip"
          aria-label="Toggle theme"
        >
          <!-- Icon for dark mode (visible in light mode) -->
          <svg
            v-if="!isDarkValue"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>

          <!-- Icon for light mode (visible in dark mode) -->
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon"
          >
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

        <!-- Mobile menu button (visible only on mobile) -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden ml-2 mobile-menu-button"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              v-if="isMobileMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu with transition -->
    <Transition name="menu-fade">
      <div v-if="isMobileMenuOpen" class="mobile-menu">
        <div class="container mx-auto px-4 py-4">
          <nav class="flex flex-col space-y-4">
            <!-- ADĂUGAT: Link Acasă pentru mobil -->
            <a href="#" class="mobile-nav-link" @click.prevent="navigateToTop">
              Acasă
            </a>

            <!-- Landing page links using v-for -->
            <template
              v-for="(item, index) in [
                { id: 'about', label: 'Despre', class: 'mobile-nav-link' },
                {
                  id: 'experience',
                  label: 'Experiență',
                  class: 'mobile-nav-link',
                },
                { id: 'skills', label: 'Competențe', class: 'mobile-nav-link' },
                { id: 'projects', label: 'Proiecte', class: 'mobile-nav-link' },
                {
                  id: 'contact',
                  label: 'Contact',
                  class: 'mobile-contact-link',
                },
              ]"
              :key="index"
            >
              <a
                :href="`#${item.id}`"
                :class="item.class"
                @click.prevent="handleSectionLink(item.id)"
              >
                {{ item.label }}
              </a>
            </template>

            <!-- Dashboard link (when signed in) -->
            <template v-if="SignedIn && isSignedIn && isSignedIn.value">
              <a
                href="/dashboard"
                class="mobile-dashboard-link"
                @click.prevent="navigateTo('/dashboard')"
              >
                Dashboard
              </a>
              <a
                href="#"
                class="mobile-logout-link"
                @click.prevent="handleLogout"
              >
                Logout
              </a>
            </template>
          </nav>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.header-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  color: #ffffff;
  z-index: 50;
  transition: all 0.3s ease;

  /* Dark theme default */
  background-color: rgba(12, 12, 29, 0.05);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* Light theme styles */
.header-container.light-theme {
  background-color: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  color: #1a1a2e;
}

.header-container.scrolled {
  background-color: rgba(12, 12, 29, 0.9);
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.header-container.light-theme.scrolled {
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: color 0.3s ease;
  cursor: pointer; /* ADĂUGAT: Cursor pointer pentru a indica că este clickabil */
}

/* Navigation links */
.nav-link {
  color: #e5e7eb;
  transition: color 0.3s ease;
  cursor: pointer; /* ADĂUGAT: Cursor pointer pentru a indica că este clickabil */
}

.nav-link:hover {
  color: #ff5d01;
}

.header-container.light-theme .nav-link {
  color: #4b5563;
}

.header-container.light-theme .nav-link:hover {
  color: #ff5d01;
}

.contact-button {
  background: none;
  color: #e5e7eb;
  border: none;
  padding: 0.5rem 0;
  border-radius: 0;
  transition: color 0.3s ease;
  font: inherit;
  cursor: pointer;
}

.header-container.light-theme .contact-button {
  color: #4b5563;
}

.header-container.light-theme .contact-button:hover {
  color: #ff5d01;
}

.contact-button:hover {
  background: none;
  color: #ff5d01;
}

.nav-buttons {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.header-separator {
  width: 1px;
  height: 1.8rem;
  background: #cbd5e1;
  margin: 0 1rem;
  opacity: 0.5;
  transition: background 0.3s, opacity 0.3s;
}
.header-container.light-theme .header-separator {
  background: #374151;
  opacity: 0.6;
}

/* Theme toggle button */
.theme-toggle-btn {
  background: none;
  color: #e5e7eb;
  border: none;
  padding: 0.5rem 0;
  border-radius: 0;
  font: inherit;
  cursor: pointer;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
}

.header-container.light-theme .theme-toggle-btn {
  color: #4b5563;
}

.header-container.light-theme .theme-toggle-btn:hover {
  color: #ff5d01;
}

.theme-toggle-btn:hover {
  background: none;
  color: #ff5d01;
}

.header-container.light-theme .theme-toggle-btn:hover {
  background: none;
  color: #ff5d01;
}

/* Account, Dashboard and Logout buttons */
.account-button,
.dashboard-button,
.logout-button {
  background: none;
  color: #e5e7eb;
  border: none;
  padding: 0.5rem 0;
  border-radius: 0;
  font: inherit;
  cursor: pointer;
  transition: color 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
}

.header-container.light-theme .account-button {
  color: #4b5563;
}

.account-button:hover {
  color: #ff5d01;
}

.dashboard-button {
  background: none;
  color: #e5e7eb;
  border: none;
}

.header-container.light-theme .dashboard-button {
  color: #4b5563;
}

.header-container.light-theme .dashboard-button:hover {
  color: #ff5d01;
}

.dashboard-button:hover {
  color: #ff5d01;
}

.logout-button {
  background: none;
  color: #e5e7eb;
  border: none;
}

.header-container.light-theme .logout-button {
  color: #4b5563;
}

.header-container.light-theme .logout-button:hover {
  color: #ff5d01;
}

.logout-button:hover {
  color: #ff5d01;
}

.icon {
  width: 20px;
  height: 20px;
  stroke-width: 1.5;
  stroke: currentColor;
}

/* Mobile menu button */
.mobile-menu-button {
  color: #e5e7eb;
  transition: color 0.3s ease;
}

.header-container.light-theme .mobile-menu-button {
  color: #4b5563;
}

.mobile-menu-button:hover {
  color: #ffffff;
}

.header-container.light-theme .mobile-menu-button:hover {
  color: #1e293b;
}

/* Mobile menu */
.mobile-menu {
  background-color: rgba(12, 12, 29, 0.95);
  backdrop-filter: blur(10px);
  display: none;
}

.header-container.light-theme + .mobile-menu {
  background-color: rgba(255, 255, 255, 0.95);
}

@media (max-width: 767px) {
  .mobile-menu {
    display: block;
  }
}

/* Mobile navigation links */
.mobile-nav-link {
  color: #e5e7eb;
  transition: color 0.3s ease;
  padding: 0.5rem 0;
}

.header-container.light-theme + .mobile-menu .mobile-nav-link {
  color: #4b5563;
}

.mobile-nav-link:hover {
  color: #ff5d01;
}

.mobile-contact-link {
  color: #ff5d01;
  transition: opacity 0.3s ease;
  padding: 0.5rem 0;
}

.mobile-contact-link:hover {
  opacity: 0.8;
}

.mobile-dashboard-link {
  color: #e5e7eb;
  transition: color 0.3s ease;
  padding: 0.5rem 0;
}

.header-container.light-theme + .mobile-menu .mobile-dashboard-link {
  color: #4b5563;
}

.mobile-dashboard-link:hover {
  color: #3b82f6;
}

.mobile-logout-link {
  color: #ef4444;
  transition: color 0.3s ease;
  padding: 0.5rem 0;
}

.mobile-logout-link:hover {
  color: #dc2626;
}

/* Tooltip styles */
.tooltip {
  position: relative;
}

.tooltip::after {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #1a1a2e;
  color: #ffffff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s, visibility 0.2s;
  pointer-events: none;
  white-space: nowrap;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.header-container.light-theme .tooltip::after {
  background-color: #ffffff;
  color: #1a1a2e;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Define tooltip content for each button */
.dashboard-tooltip::after {
  content: "Dashboard";
}

.account-tooltip::after {
  content: "Account settings";
}

.theme-tooltip::after {
  content: "Toggle theme";
}

.logout-tooltip::after {
  content: "Logout";
}

.tooltip:hover::after {
  opacity: 1;
  visibility: visible;
}

/* Menu transitions */
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 768px) {
  .nav-buttons {
    gap: 0.5rem;
  }

  .tooltip::after {
    display: none;
  }
}
</style>
