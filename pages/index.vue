<!-- pages/index.vue -->
<template>
  <div class="hello-world-container">
    <!-- Main content of the Hello World page -->
    <div class="hello-content">
      <h1 :class="['title', { 'title-dark': isDark }]">Welcome!</h1>

      <!-- Countdown to June 1st -->
      <div class="countdown-container">
        <div class="countdown-content">
          <h2 class="countdown-title">Until June 1st:</h2>
          <div class="countdown-grid">
            <div class="countdown-item">
              <span class="countdown-number">{{ days }}</span>
              <span class="countdown-label">Days</span>
            </div>
            <div class="countdown-item">
              <span class="countdown-number">{{ hours }}</span>
              <span class="countdown-label">Hours</span>
            </div>
            <div class="countdown-item">
              <span class="countdown-number">{{ minutes }}</span>
              <span class="countdown-label">Minutes</span>
            </div>
            <div class="countdown-item">
              <span class="countdown-number">{{ seconds }}</span>
              <span class="countdown-label">Seconds</span>
            </div>
          </div>
        </div>
      </div>
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

// Countdown target date (June 1st)
const targetDate = new Date('2025-06-01T00:00:00+03:00')

// State for countdown
const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

// Function to update countdown
const updateCountdown = () => {
  const now = new Date()
  const diff = targetDate - now

  if (diff <= 0) {
    days.value = 0
    hours.value = 0
    minutes.value = 0
    seconds.value = 0
    return
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24))
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const s = Math.floor((diff % (1000 * 60)) / 1000)

  days.value = d
  hours.value = h
  minutes.value = m
  seconds.value = s
}

// Update countdown immediately
updateCountdown()

// Update countdown every second
setInterval(updateCountdown, 1000)

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
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

/* Container for central content */
.hello-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  padding: 0 1rem;
  gap: 4rem;
}

/* Title styles */
.title {
  font-size: 4rem;
  font-weight: 900;
  text-align: center;
  margin-bottom: 2rem;
  transition: color 0.3s ease;
  color: hsl(var(--foreground));
}

.title-dark {
  color: hsl(var(--primary-dark));
  text-shadow: 0 0 10px hsla(var(--primary-dark), 0.5);
}

/* Countdown container */
.countdown-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
}

/* Countdown content */
.countdown-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

/* Countdown title */
.countdown-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: hsl(var(--foreground));
  text-align: center;
  margin-bottom: 2rem;
}

/* Countdown grid */
.countdown-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  width: 100%;
  max-width: 1000px;
}

/* Countdown item */
.countdown-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  border-radius: 1.25rem;
  background: linear-gradient(135deg,
      hsla(var(--primary), 0.1) 0%,
      hsla(var(--primary), 0.05) 50%,
      hsla(var(--primary), 0.1) 100%);
  border: 4px solid hsl(var(--primary));
  box-shadow:
    0 12px 32px rgba(0, 0, 0, 0.15),
    0 0 0 4px hsla(var(--primary), 0.2),
    inset 0 0 20px hsla(var(--primary), 0.1);
  transition: all 0.3s ease;
  min-width: 200px;
  min-height: 200px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
}

/* Countdown number */
.countdown-number {
  font-size: 6rem;
  font-weight: 900;
  color: hsl(var(--foreground));
  line-height: 1;
  margin: 0;
  position: relative;
  padding: 1rem;
  background: linear-gradient(135deg,
      hsla(var(--primary), 0.05) 0%,
      hsla(var(--primary), 0.02) 50%,
      hsla(var(--primary), 0.05) 100%);
  border: 4px solid hsl(var(--primary));
  border-radius: 0.75rem;
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.1),
    inset 0 2px 4px hsla(var(--primary), 0.1);
  transition: all 0.3s ease;
}

/* Digital display borders for numbers */
.countdown-number::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(to right,
      hsla(var(--primary), 0.3) 0%,
      hsla(var(--primary), 0.1) 50%,
      hsla(var(--primary), 0.3) 100%);
  z-index: 1;
}

.countdown-number::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(to right,
      hsla(var(--primary), 0.3) 0%,
      hsla(var(--primary), 0.1) 50%,
      hsla(var(--primary), 0.3) 100%);
  z-index: 1;
}

/* Dark theme overrides for numbers */
[data-theme="dark"] {
  .countdown-number {
    background: linear-gradient(135deg,
        hsla(var(--primary-dark), 0.05) 0%,
        hsla(var(--primary-dark), 0.02) 50%,
        hsla(var(--primary-dark), 0.05) 100%);
    border: 4px solid hsl(var(--primary-dark));
    box-shadow:
      0 4px 12px rgba(0, 0, 0, 0.2),
      inset 0 2px 4px hsla(var(--primary-dark), 0.1);
  }

  .countdown-number::before,
  .countdown-number::after {
    background: linear-gradient(to right,
        hsla(var(--primary-dark), 0.3) 0%,
        hsla(var(--primary-dark), 0.1) 50%,
        hsla(var(--primary-dark), 0.3) 100%);
  }
}

/* Countdown label */
.countdown-label {
  font-size: 2rem;
  color: hsl(var(--muted-foreground));
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 700;
  margin: 0;
}

/* Digital display effects */
.countdown-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(to right,
      hsla(var(--primary), 0.3) 0%,
      hsla(var(--primary), 0.1) 50%,
      hsla(var(--primary), 0.3) 100%);
  z-index: 1;
}

.countdown-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(to right,
      hsla(var(--primary), 0.3) 0%,
      hsla(var(--primary), 0.1) 50%,
      hsla(var(--primary), 0.3) 100%);
  z-index: 1;
}

/* Hover effects */
.countdown-item:hover {
  transform: translateY(-6px);
  box-shadow:
    0 16px 40px rgba(0, 0, 0, 0.2),
    0 0 0 6px hsla(var(--primary), 0.3),
    inset 0 0 30px hsla(var(--primary), 0.2);
}

/* Dark theme overrides */
[data-theme="dark"] {
  .countdown-item {
    background: linear-gradient(135deg,
        hsla(var(--primary-dark), 0.1) 0%,
        hsla(var(--primary-dark), 0.05) 50%,
        hsla(var(--primary-dark), 0.1) 100%);
    border: 4px solid hsl(var(--primary-dark));
    box-shadow:
      0 12px 32px rgba(0, 0, 0, 0.25),
      0 0 0 4px hsla(var(--primary-dark), 0.2),
      inset 0 0 20px hsla(var(--primary-dark), 0.1);
  }

  .countdown-number {
    color: hsl(var(--foreground-dark));
  }

  .countdown-label {
    color: hsl(var(--muted-foreground-dark));
  }

  .countdown-item:hover {
    box-shadow:
      0 16px 40px rgba(255, 255, 255, 0.1),
      0 0 0 6px hsla(var(--primary-dark), 0.25),
      inset 0 0 30px hsla(var(--primary-dark), 0.15);
  }

  .countdown-item::after {
    border-color: hsl(var(--primary-dark));
    box-shadow:
      0 0 10px hsla(var(--primary-dark), 0.3),
      0 2px 4px rgba(255, 255, 255, 0.1);
  }

  .countdown-item::before {
    border-color: hsla(var(--primary-dark), 0.5);
  }

  .countdown-item::after {
    border-color: hsla(var(--primary-dark), 0.3);
  }
}

.countdown-number {
  font-size: 6rem;
  font-weight: 900;
  color: hsl(var(--primary));
  line-height: 1;
  margin: 0;
}

.countdown-label {
  font-size: 2rem;
  color: hsl(var(--muted-foreground));
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 700;
  margin: 0;
}

.loading-spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
