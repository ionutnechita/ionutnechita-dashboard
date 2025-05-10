<script setup lang="ts">
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
const route = useRoute();
const isFooterVisible = computed(
  () => !["/dashboard", "/account", "/login", "/sign-up"].includes(route.path)
);
</script>

<style scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding-top: 64px; /* Same as header height */
}
</style>

<template>
  <div class="layout-container">
    <Header />
    <main class="main-content">
      <slot />
    </main>
    <Footer v-if="isFooterVisible" />
  </div>
</template>
