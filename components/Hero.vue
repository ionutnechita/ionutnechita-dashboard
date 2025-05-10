<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

// Efect de typing îmbunătățit cu animație pentru "BINE AI VENIT"
const titleRef = ref(null);
const welcomeTitleRef = ref(null);
const heroRef = ref(null);

// Efect de typing pentru numele "IONUT NECHITA"
const typeWriter = () => {
  if (!titleRef.value) return;

  const title = titleRef.value;
  const text = "IONUT NECHITA";
  const typingSpeed = 100;

  title.textContent = "";
  let charIndex = 0;

  // Funcție pentru animarea textului
  const type = () => {
    if (charIndex < text.length) {
      title.textContent += text.charAt(charIndex);
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      // Adăugăm un cursor blinking după ce s-a terminat textul
      title.classList.add("cursor-after");

      // Adăugăm o clasă de strălucire după finalizare
      setTimeout(() => {
        title.classList.add("glow-effect");
      }, 500);
    }
  };

  // Start typing
  type();
};

// Paralax effect pentru elementele decorative
let requestId = null;
const parallaxElements = ref([]);

const updateParallax = () => {
  if (!heroRef.value || !parallaxElements.value.length) return;

  const handleParallax = () => {
    // Actualizează poziția elementelor în funcție de scroll
    requestId = requestAnimationFrame(handleParallax);
  };

  handleParallax();
};

// Lifecycle hooks
onMounted(() => {
  // Pornește efectul de typing pentru nume direct
  typeWriter();

  // Inițializează elementele pentru efect de parallax
  parallaxElements.value = document.querySelectorAll(".parallax-element");
  updateParallax();

  // Adaugă animații progresive la scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  // Observă elementele care trebuie animate
  document.querySelectorAll(".fade-in").forEach((element) => {
    observer.observe(element);
  });
});

onBeforeUnmount(() => {
  // Curățare pentru a evita memory leaks
  if (requestId) {
    cancelAnimationFrame(requestId);
  }
});
</script>

<template>
  <section
    ref="heroRef"
    class="relative min-h-screen flex items-start pt-32 md:pt-24 overflow-hidden bg-slate-950 dark:bg-slate-950 text-slate-200 dark:text-slate-200"
  >
    <!-- Background elements for depth -->
    <div class="absolute inset-0 z-0">
      <div
        class="absolute top-1/4 right-1/5 w-32 h-32 rounded-full blur-3xl parallax-element opacity-50"
        style="background-color: rgba(249, 115, 22, 0.05)"
      ></div>
      <div
        class="absolute bottom-1/3 left-1/5 w-48 h-48 rounded-full blur-3xl parallax-element opacity-50"
        style="background-color: rgba(99, 102, 241, 0.05)"
      ></div>
      <div
        class="absolute top-2/3 right-1/4 w-24 h-24 rounded-full blur-2xl parallax-element opacity-50"
        style="background-color: rgba(8, 145, 178, 0.05)"
      ></div>
    </div>

    <div class="container mx-auto px-6 z-10 relative mt-8 md:mt-12">
      <div
        class="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-start lg:items-center"
      >
        <!-- Text content, left side -->
        <div class="text-content fade-in pt-6 md:pt-0">
          <h1
            class="mb-3 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
          >
            <span class="block mb-0 title-gradient-primary">BINE AI VENIT</span>
            <span class="block mt-1 title-gradient" ref="titleRef"></span>
          </h1>

          <div
            class="mt-6 text-lg md:text-xl text-slate-300 dark:text-slate-300 max-w-xl leading-relaxed"
          >
            <p>
              Descoperă cum poți aduce la viață proiecte digitale complexe
              alături de mine, într-o experiență tehnică ce va transforma
              viziunea ta în realitate în lumea software-ului modern.
            </p>
          </div>

          <div class="mt-8 flex flex-wrap gap-4">
            <a href="#contact" class="btn-primary"> Discută cu mine </a>
            <a href="#projects" class="btn-secondary"> Vezi portofoliul </a>
          </div>

          <div class="mt-10">
            <div class="flex items-center space-x-6">
              <a
                href="https://github.com/ionutnechita"
                target="_blank"
                rel="noopener noreferrer"
                class="text-slate-400 hover:text-slate-50 dark:text-slate-400 dark:hover:text-white transition-colors hover:-translate-y-1 duration-300"
                aria-label="GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/ionut-nechita-12b77b76"
                target="_blank"
                rel="noopener noreferrer"
                class="text-slate-400 hover:text-[#0077b5] dark:text-slate-400 dark:hover:text-[#0077b5] transition-colors hover:-translate-y-1 duration-300"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                  />
                </svg>
              </a>
              <a
                href="https://twitter.com/sander440"
                target="_blank"
                rel="noopener noreferrer"
                class="text-slate-400 hover:text-[#1da1f2] dark:text-slate-400 dark:hover:text-[#1da1f2] transition-colors hover:-translate-y-1 duration-300"
                aria-label="Twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Hero illustration, right side -->
        <div
          class="hidden lg:flex justify-center items-center relative fade-in"
        >
          <div class="relative max-w-sm mx-auto animate-float-slow">
            <!-- Main illustration circle - centrată mai bine -->
            <div
              class="aspect-square rounded-full bg-slate-900/40 backdrop-blur-lg border border-slate-700/50 flex items-center justify-center overflow-hidden shadow-2xl relative z-20"
            >
              <!-- Inner content -->
              <div
                class="relative w-4/5 h-4/5 flex items-center justify-center"
              >
                <div
                  class="absolute inset-0 opacity-60"
                  style="
                    background: radial-gradient(
                      circle,
                      rgba(249, 115, 22, 0.2) 0%,
                      transparent 70%
                    );
                  "
                ></div>

                <!-- Main icon or avatar - Centered better -->
                <div
                  class="relative z-10 transform hover:scale-105 transition-transform duration-500 flex justify-center items-center w-full h-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3/5 w-3/5 mx-auto"
                    style="color: #f97316"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Decorative elements - ajustate pentru centrare -->
            <div
              class="absolute -top-6 -right-6 w-16 h-16 rounded-full blur-md animate-pulse z-10"
              style="background: linear-gradient(90deg, #f97316, #fb923c)"
            ></div>
            <div
              class="absolute -bottom-8 left-1/2 -translate-x-1/2 w-24 h-6 bg-orange-500/30 blur-xl rounded-full animate-pulse-slow z-10"
            ></div>

            <!-- Orbital circles - ajustate pentru centrare -->
            <div
              class="absolute inset-0 w-full h-full rounded-full border border-[#f97316]/20 animate-rotate-slow z-0"
            ></div>
            <div
              class="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)] rounded-full border border-slate-500/10 animate-rotate z-0"
            ></div>
            <div
              class="absolute -inset-8 w-[calc(100%+4rem)] h-[calc(100%+4rem)] rounded-full border border-slate-500/5 animate-rotate-reverse z-0"
            ></div>

            <!-- Floating particles - dispersate în jurul centrului -->
            <div
              class="absolute top-1/4 -left-10 w-6 h-6 rounded-full blur-sm animate-float-particles z-10"
              style="background-color: rgba(56, 189, 248, 0.3)"
            ></div>
            <div
              class="absolute bottom-1/4 -right-4 w-4 h-4 rounded-full blur-sm animate-float-particles-reverse z-10"
              style="background-color: rgba(168, 85, 247, 0.4)"
            ></div>
            <div
              class="absolute top-3/4 left-1/4 w-3 h-3 rounded-full blur-sm animate-pulse z-10"
              style="background-color: rgba(249, 115, 22, 0.6)"
            ></div>
          </div>

          <!-- Background decorative elements - adjustate pentru centrare -->
          <div
            class="absolute top-0 right-0 w-40 h-40 rounded-full border border-[#f97316]/10 animate-rotate opacity-40 parallax-element"
          ></div>
          <div
            class="absolute bottom-0 left-0 w-64 h-64 rounded-full border border-indigo-500/10 animate-rotate-reverse opacity-30 parallax-element"
          ></div>
          <div
            class="absolute top-1/2 right-1/4 w-8 h-8 rounded-full opacity-20 blur-xl animate-pulse-slow parallax-element"
            style="
              background: linear-gradient(
                135deg,
                rgba(249, 115, 22, 0.5),
                rgba(168, 85, 247, 0.5)
              );
            "
          ></div>

          <!-- Spotlights pentru efect cosmic -->
          <div
            class="absolute -top-20 left-1/3 w-80 h-80 rounded-full blur-3xl opacity-10 z-0"
            style="
              background: radial-gradient(
                circle,
                rgba(249, 115, 22, 0.6) 0%,
                transparent 70%
              );
            "
          ></div>
          <div
            class="absolute -bottom-20 right-1/3 w-80 h-80 rounded-full blur-3xl opacity-10 z-0"
            style="
              background: radial-gradient(
                circle,
                rgba(56, 189, 248, 0.6) 0%,
                transparent 70%
              );
            "
          ></div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator with improved animation -->
    <div
      class="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity"
    >
      <span
        class="text-slate-400 dark:text-slate-400 text-sm mb-2 tracking-wider"
        >Scroll pentru mai mult</span
      >
      <div
        class="w-6 h-10 border-2 border-slate-600 dark:border-slate-600 hover:border-[#f97316] dark:hover:border-[#f97316] rounded-full flex justify-center transition-colors"
      >
        <div
          class="w-1.5 h-3 rounded-full mt-2 animate-scroll-dot"
          style="background-color: #f97316"
        ></div>
      </div>
    </div>
  </section>
</template>

<style>
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes floatSlow {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(2deg);
  }
}

@keyframes floatParticles {
  0%,
  100% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(10px, -10px);
  }
  50% {
    transform: translate(0, -20px);
  }
  75% {
    transform: translate(-10px, -10px);
  }
}

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

@keyframes rotateSlow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

@keyframes scrollDot {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.8;
  }
  50% {
    transform: translateY(6px);
    opacity: 0.4;
  }
}
</style>

<style scoped>
section {
  background-color: rgb(12, 12, 29);
}

.dark section {
  background-color: rgb(2, 6, 23);
}

@media (prefers-color-scheme: dark) {
  section:not(.light) {
    background-color: rgb(2, 6, 23);
  }
}

.title-gradient-primary {
  background: linear-gradient(90deg, #f97316, #fb923c, #fdba74);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
  position: relative;
  font-size: inherit;
  font-weight: bold;
}

.title-gradient {
  background: linear-gradient(90deg, #f97316, #fb923c, #fdba74);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
  position: relative;
  width: 100%;
  min-height: 1.2em;
}

/* Ensure text displays on its own line */
.title-gradient.block {
  display: block;
}

/* Cursor effect */
.cursor-after::after {
  content: "|";
  margin-left: 0.1em;
  animation: blink 1s step-end infinite;
  color: #f97316;
}

/* Efect de strălucire pentru titlu */
.glow-effect {
  text-shadow: 0 0 10px rgba(249, 115, 22, 0.5),
    0 0 20px rgba(249, 115, 22, 0.3), 0 0 30px rgba(249, 115, 22, 0.1);
  transition: text-shadow 0.5s ease;
}

/* Button styles - adaptive for dark/light themes */
.btn-primary {
  background-color: #f97316;
  color: white;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  box-shadow: 0 10px 15px -3px rgba(249, 115, 22, 0.2);
  transform: translateY(0);
}

.btn-primary:hover {
  background-color: #ea580c;
  transform: translateY(-0.25rem);
  box-shadow: 0 20px 25px -5px rgba(249, 115, 22, 0.2);
}

.btn-primary:active {
  transform: translateY(0);
}

.dark .btn-primary {
  background-color: #f97316;
}

.dark .btn-primary:hover {
  background-color: #ea580c;
}

.btn-secondary {
  background-color: transparent;
  color: #cbd5e1;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  border: 1px solid #475569;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  backdrop-filter: blur(4px);
  transform: translateY(0);
}

.btn-secondary:hover {
  border-color: #f97316;
  color: #f97316;
  transform: translateY(-0.25rem);
}

.btn-secondary:active {
  transform: translateY(0);
}

.dark .btn-secondary {
  border-color: #475569;
  color: #cbd5e1;
}

.dark .btn-secondary:hover {
  border-color: #f97316;
  color: #f97316;
}

/* Animations */
.animate-float {
  animation: float 8s ease-in-out infinite;
}

.animate-float-slow {
  animation: floatSlow 12s ease-in-out infinite;
}

.animate-pulse {
  animation: pulse 4s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulseSlow 6s ease-in-out infinite;
}

.animate-rotate {
  animation: rotate 25s linear infinite;
}

.animate-rotate-slow {
  animation: rotateSlow 35s linear infinite;
}

.animate-rotate-reverse {
  animation: rotateReverse 30s linear infinite;
}

.animate-float-particles {
  animation: floatParticles 10s ease-in-out infinite;
}

.animate-float-particles-reverse {
  animation: floatParticles 12s ease-in-out infinite reverse;
}

.animate-scroll-dot {
  animation: scrollDot 1.5s ease-in-out infinite;
}

/* Fade-in animation */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.fade-in-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Background glass effect */
.backdrop-blur-lg {
  backdrop-filter: blur(12px);
}
</style>
