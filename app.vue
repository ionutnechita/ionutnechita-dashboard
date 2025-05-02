<script setup lang="ts">
// Import the ThemeProvider component that manages the application theme
import ThemeProvider from '~/components/ThemeProvider.vue'
</script>

<template>
  <ThemeProvider>
    <div class="min-h-screen bg-background text-foreground transition-colors duration-300">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </ThemeProvider>
</template>
