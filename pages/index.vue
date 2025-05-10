<script setup lang="ts">
import Hero from "~/components/Hero.vue";
import About from "~/components/About.vue";
import Experience from "~/components/Experience.vue";
import Skills from "~/components/Skills.vue";
import Projects from "~/components/Projects.vue";
import Contact from "~/components/Contact.vue";
</script>

<template>
  <div class="landing-page bg-space text-white">
    <!-- Hero Section -->
    <Hero />

    <!-- About Section -->
    <About />

    <!-- Experience Section -->
    <Experience />

    <!-- Skills Section -->
    <Skills />

    <!-- Projects Section -->
    <Projects />

    <!-- Contact Section -->
    <Contact />
  </div>
</template>

<style scoped>
.bg-space {
  background-color: #0f172a;
  background-image: radial-gradient(
    circle at 50% 0%,
    rgba(255, 93, 1, 0.15) 0%,
    rgba(21, 28, 43, 0.15) 50%
  );
}
</style>
