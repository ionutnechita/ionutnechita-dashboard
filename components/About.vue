<script setup lang="ts">
import { ref, onMounted } from "vue";

// Referințe pentru elemente animate
const aboutRef = ref(null);
const profileImageRef = ref(null);
const titleRef = ref(null);

// Efecte de animație la intrarea în viewport
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    },
    { threshold: 0.1 }
  );

  // Observă elementele care trebuie animate
  document.querySelectorAll(".animate-on-scroll").forEach((element) => {
    observer.observe(element);
  });

  // Animație pentru profilul foto
  if (profileImageRef.value) {
    setTimeout(() => {
      profileImageRef.value.classList.add("animate-profile");
    }, 300);
  }

  // Animație pentru titlu
  if (titleRef.value) {
    setTimeout(() => {
      titleRef.value.classList.add("animate-title");
    }, 200);
  }
});
</script>

<template>
  <section
    id="about"
    ref="aboutRef"
    class="py-20 md:py-28 relative overflow-hidden bg-slate-950 dark:bg-slate-950"
  >
    <!-- Background elements -->
    <div class="absolute inset-0 z-0">
      <div
        class="absolute top-1/3 right-10 w-64 h-64 rounded-full opacity-20 blur-3xl"
        style="
          background: radial-gradient(
            circle,
            rgba(249, 115, 22, 0.3) 0%,
            transparent 70%
          );
        "
      ></div>
      <div
        class="absolute bottom-1/4 left-10 w-72 h-72 rounded-full opacity-20 blur-3xl"
        style="
          background: radial-gradient(
            circle,
            rgba(99, 102, 241, 0.2) 0%,
            transparent 70%
          );
        "
      ></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <!-- Section title -->
      <div
        class="text-center mb-16 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700"
      >
        <h2 class="text-3xl md:text-4xl font-bold mb-4" ref="titleRef">
          <span class="title-gradient">Despre mine</span>
        </h2>
        <div class="w-20 h-1 mx-auto" style="background-color: #f97316"></div>
      </div>

      <!-- Two column layout -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
        <!-- Image column -->
        <div
          class="flex justify-center lg:justify-end animate-on-scroll opacity-0 -translate-x-8 transition-all duration-700 delay-300"
        >
          <div class="relative">
            <div class="profile-image-container" ref="profileImageRef">
              <div class="w-full h-full overflow-hidden rounded-full">
                <!-- Profile image or initials -->
                <div
                  class="w-full h-full flex items-center justify-center text-5xl font-bold"
                  style="background-color: #1e293b"
                >
                  <span style="color: #f97316">IN</span>
                </div>
              </div>
            </div>

            <!-- Decorative elements -->
            <div
              class="absolute -top-4 -right-4 w-20 h-20 rounded-full blur-md animate-pulse-slow"
              style="background-color: rgba(249, 115, 22, 0.2)"
            ></div>
            <div
              class="absolute -bottom-4 -left-4 w-16 h-16 rounded-full blur-md animate-pulse"
              style="background-color: rgba(99, 102, 241, 0.2)"
            ></div>

            <!-- Orbital lines -->
            <div
              class="absolute -inset-6 w-[calc(100%+3rem)] h-[calc(100%+3rem)] rounded-full border animate-rotate-slow opacity-30"
              style="border-color: rgba(249, 115, 22, 0.1)"
            ></div>
            <div
              class="absolute -inset-12 w-[calc(100%+6rem)] h-[calc(100%+6rem)] rounded-full border animate-rotate-reverse opacity-20"
              style="border-color: rgba(99, 102, 241, 0.1)"
            ></div>
          </div>
        </div>

        <!-- Text column -->
        <div
          class="animate-on-scroll opacity-0 translate-x-8 transition-all duration-700 delay-300"
        >
          <h3 class="text-2xl font-bold mb-6 text-slate-50 dark:text-slate-50">
            Salut! Sunt <span style="color: #f97316">Ionut Nechita</span>
          </h3>

          <div class="space-y-4 text-slate-300 dark:text-slate-300">
            <p
              class="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-400"
            >
              Cu peste 10 ani de experiență în domeniul IT&C, m-am specializat
              în dezvoltarea de soluții software complexe și arhitecturi
              scalabile.
            </p>

            <p
              class="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-500"
            >
              Am avut privilegiul să lucrez la proiecte diverse, de la aplicații
              web și mobile, până la sisteme enterprise și arhitecturi cloud,
              colaborând cu echipe internaționale și contribuind la succesul
              unor companii de top din industrie.
            </p>

            <p
              class="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-600"
            >
              Pasiunea mea este să transform idei ambițioase în soluții tehnice
              elegante și eficiente. Îmi place să rezolv probleme complexe și să
              ajut afacerile să-și atingă obiectivele prin tehnologie inovativă.
            </p>
          </div>

          <!-- Skills grid -->
          <div
            class="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-700"
          >
            <template
              v-for="(skill, index) in [
                'TypeScript & JavaScript',
                'Vue & Nuxt.js',
                'Node.js & Express',
                'Arhitectură Cloud',
                'DevOps & CI/CD',
                'Design Patterns',
              ]"
              :key="index"
            >
              <div class="flex items-center skill-item">
                <div
                  class="w-2 h-2 rounded-full mr-2 skill-dot"
                  style="background-color: #f97316"
                ></div>
                <span class="text-slate-300 dark:text-slate-300">{{
                  skill
                }}</span>
              </div>
            </template>
          </div>

          <!-- Contact button -->
          <div
            class="mt-10 animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-800"
          >
            <a href="#contact" class="contact-button">
              Contactează-mă
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 ml-2 contact-arrow"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Title gradient */
.title-gradient {
  background: linear-gradient(90deg, #f97316, #fb923c, #fdba74);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
  position: relative;
}

/* Profile image */
.profile-image-container {
  width: 18rem;
  height: 18rem;
  border-radius: 50%;
  padding: 4px;
  background: linear-gradient(135deg, #f97316, #fdba74);
  opacity: 0;
  transform: scale(0.9);
  transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}

@media (max-width: 640px) {
  .profile-image-container {
    width: 14rem;
    height: 14rem;
  }
}

.animate-profile {
  opacity: 1;
  transform: scale(1);
}

/* Contact button */
.contact-button {
  display: inline-flex;
  align-items: center;
  background-color: #f97316;
  color: white;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  transition: all 0.3s ease;
  box-shadow: 0 10px 15px -3px rgba(249, 115, 22, 0.2);
  position: relative;
  overflow: hidden;
}

.contact-button:hover {
  background-color: #ea580c;
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(249, 115, 22, 0.2);
}

.contact-button:active {
  transform: translateY(0);
}

.contact-arrow {
  transition: transform 0.3s ease;
}

.contact-button:hover .contact-arrow {
  transform: translateX(4px);
}

/* Dark mode styles */
.dark .contact-button {
  background-color: #f97316;
}

.dark .contact-button:hover {
  background-color: #ea580c;
}

/* Skill items */
.skill-item {
  transition: transform 0.3s ease;
}

.skill-item:hover {
  transform: translateX(4px);
}

.skill-item:hover .skill-dot {
  transform: scale(1.5);
}

.skill-dot {
  transition: transform 0.3s ease;
}

/* Animation classes */
.animate-in {
  opacity: 1 !important;
  transform: translate(0, 0) !important;
}

.animate-title {
  position: relative;
}

.animate-title::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 30%;
  right: 30%;
  height: 3px;
  background: linear-gradient(90deg, transparent, #f97316, transparent);
  transform: scaleX(0);
  transition: transform 0.8s ease;
}

.animate-title.animate-in::after {
  transform: scaleX(1);
}

/* Animations */
@keyframes pulse {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(0.95);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

@keyframes pulseSlow {
  0%,
  100% {
    opacity: 0.2;
    transform: scale(0.9);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes rotateReverse {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}

.animate-pulse {
  animation: pulse 4s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulseSlow 6s ease-in-out infinite;
}

.animate-rotate-slow {
  animation: rotate 35s linear infinite;
}

.animate-rotate-reverse {
  animation: rotateReverse 30s linear infinite;
}
</style>
