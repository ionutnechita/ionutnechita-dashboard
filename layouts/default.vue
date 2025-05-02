<script setup lang="ts">
import Header from '~/components/Header.vue'
</script>

<style scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding-top: 64px;
  /* Same as header height */
}
</style>

<template>
  <div class="layout-container">
    <Header />
    <main class="main-content">
      <slot />
    </main>
  </div>
</template>
