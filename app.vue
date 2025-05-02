<!-- app.vue -->
<template>
  <ThemeProvider>
    <div class="min-h-screen bg-background text-foreground transition-colors duration-300">
      <NuxtPage />
    </div>
  </ThemeProvider>
</template>

<script setup>
// Import the ThemeProvider component that manages the application theme
import ThemeProvider from '~/components/ThemeProvider.vue'
</script>
