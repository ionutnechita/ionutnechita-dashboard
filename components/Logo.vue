<script setup lang="ts">
// You can add any TypeScript logic here if needed in the future
// For example, you could add props to customize the logo
// const props = defineProps<{
//   showAppName?: boolean;
//   appName?: string;
// }>();
</script>

<style scoped>
.logo-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.logo-container:hover {
  transform: translateY(-2px);
}

.logo-shape {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: hsla(var(--secondary), 0.1);
  overflow: hidden;
}

.circle {
  position: absolute;
  width: 20px;
  height: 20px;
  background: hsl(var(--primary));
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.triangle {
  position: absolute;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 17px solid hsl(var(--primary));
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.square {
  position: absolute;
  width: 15px;
  height: 15px;
  background: hsl(var(--primary));
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.app-name {
  font-weight: 600;
  font-size: 1.1rem;
  color: hsl(var(--foreground));
  letter-spacing: -0.5px;
}

/* Dark theme adjustments */
@media (prefers-color-scheme: dark) {
  .logo-shape {
    background: rgba(0, 0, 0, 0.1);
  }

  .circle,
  .triangle,
  .square {
    background: rgba(255, 255, 255, 0.8);
  }
}
</style>

<template>
  <div class="logo-container">
    <!-- Simple geometric logo -->
    <div class="logo-shape">
      <!-- Circle -->
      <div class="circle"></div>
      <!-- Triangle -->
      <div class="triangle"></div>
      <!-- Square -->
      <div class="square"></div>
    </div>
    <!-- App name -->
    <span class="app-name">MyApp</span>
  </div>
</template>
