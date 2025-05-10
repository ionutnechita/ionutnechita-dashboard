<script setup lang="ts">
// You can add props to customize the logo and brand text
const props = defineProps({
  showBrandText: {
    type: Boolean,
    default: true,
  },
  brandText: {
    type: String,
    default: "Ionut Nechita",
  },
});
</script>

<style scoped>
.logo-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.logo-container:hover {
  transform: translateY(-2px);
}

.logo-shape {
  position: relative;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(255, 93, 1, 0.15);
  overflow: hidden;
  box-shadow: 0 0 10px rgba(255, 93, 1, 0.2);
}

.logo-content {
  position: relative;
  width: 100%;
  height: 100%;
}

/* Custom shapes with the accent color */
.circle {
  position: absolute;
  width: 18px;
  height: 18px;
  background: #ff5d01;
  border-radius: 50%;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.8;
}

.triangle {
  position: absolute;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 14px solid #ff7c33;
  top: 60%;
  left: 30%;
  transform: translate(-50%, -50%);
  opacity: 0.8;
}

.square {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #e04b00;
  top: 60%;
  left: 70%;
  transform: translate(-50%, -50%) rotate(45deg);
  opacity: 0.9;
}

.brand-text {
  font-size: 1.25rem;
  font-weight: 700;
  background: linear-gradient(to right, #ff7c33, #ff5d01, #e04b00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Dark theme adjustments */
:deep(.dark) .logo-shape {
  background: rgba(255, 93, 1, 0.1);
  box-shadow: 0 0 15px rgba(255, 93, 1, 0.15);
}

:deep(.dark) .circle {
  background: #ff7c33;
}

:deep(.dark) .triangle {
  border-bottom-color: #ff5d01;
}

:deep(.dark) .square {
  background: #ff5d01;
}
</style>

<template>
  <div class="logo-container">
    <!-- Logo with geometric shapes -->
    <div class="logo-shape">
      <div class="logo-content">
        <!-- Circle -->
        <div class="circle"></div>
        <!-- Triangle -->
        <div class="triangle"></div>
        <!-- Square -->
        <div class="square"></div>
      </div>
    </div>

    <!-- Brand text with gradient -->
    <span v-if="showBrandText" class="brand-text">{{ brandText }}</span>
  </div>
</template>
