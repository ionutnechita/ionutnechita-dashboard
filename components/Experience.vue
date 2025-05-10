<script setup lang="ts">
import { ref, onMounted } from "vue";

// Define experience data structure
interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
}

// Sample experience data
const experienceData: ExperienceItem[] = [
  {
    id: 1,
    role: "Lead Software Engineer",
    company: "TechCorp International",
    period: "2020 - Prezent",
    description: [
      "Conducerea unei echipe de 8 dezvoltatori în proiectarea și implementarea unei platforme SaaS pentru managementul proceselor de business.",
      "Dezvoltarea unei arhitecturi microservices bazată pe Node.js și TypeScript, cu o reducere de 40% a timpului de development pentru noi funcționalități.",
      "Implementarea unei strategii de CI/CD folosind GitHub Actions și AWS, rezultând în deployment-uri de 3 ori mai rapide și o reducere cu 60% a erorilor în producție.",
    ],
    technologies: [
      "TypeScript",
      "Node.js",
      "Vue",
      "AWS",
      "MongoDB",
      "Docker",
      "Kubernetes",
    ],
  },
  {
    id: 2,
    role: "Senior Frontend Developer",
    company: "Digital Solutions SRL",
    period: "2017 - 2020",
    description: [
      "Dezvoltarea unei aplicații web bazate pe Vue pentru vizualizarea și analiza datelor în timp real, utilizată de peste 5000 de utilizatori zilnic.",
      "Implementarea unei biblioteci de componente reutilizabile care a redus timpul de dezvoltare a noilor funcționalități cu 35%.",
      "Optimizarea performanței frontend, rezultând într-o îmbunătățire cu 60% a timpului de încărcare și cu 40% a scorului Lighthouse.",
    ],
    technologies: [
      "JavaScript",
      "Vue",
      "Vuex",
      "Sass",
      "Jest",
      "Webpack",
      "GraphQL",
    ],
  },
  {
    id: 3,
    role: "Full Stack Developer",
    company: "InnoTech Systems",
    period: "2015 - 2017",
    description: [
      "Dezvoltarea și mentenanța aplicațiilor web folosind MEVN stack (MongoDB, Express, Vue, Node.js).",
      "Implementarea de API-uri RESTful pentru integrarea cu sisteme terțe și servicii de plată.",
      "Colaborarea cu echipa de design pentru implementarea de interfețe responsive și accesibile.",
    ],
    technologies: [
      "JavaScript",
      "Vue",
      "Node.js",
      "Express",
      "MongoDB",
      "REST API",
      "HTML/CSS",
    ],
  },
  {
    id: 4,
    role: "Junior Software Developer",
    company: "TechStart Agency",
    period: "2013 - 2015",
    description: [
      "Dezvoltarea de componente frontend pentru site-uri web și aplicații utilizând HTML, CSS și JavaScript.",
      "Integrarea cu CMS-uri și platforme de e-commerce.",
      "Colaborarea cu designeri și alți dezvoltatori în cadrul unei echipe agile.",
    ],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "jQuery",
      "PHP",
      "WordPress",
      "Bootstrap",
    ],
  },
];

const activeTab = ref(experienceData[0].id);
const sectionRef = ref(null);
const titleRef = ref(null);
const contentRef = ref(null);

// Funcție pentru animarea trecerii între tab-uri
const changeTab = (tabId: number) => {
  // Adaugă o clasă pentru fade-out
  if (contentRef.value) {
    contentRef.value.classList.add("content-fade-out");

    // După o scurtă pauză, schimbă tab-ul activ și adaugă fade-in
    setTimeout(() => {
      activeTab.value = tabId;

      // Setează un timeout pentru a adăuga clasa de fade-in după schimbarea conținutului
      setTimeout(() => {
        if (contentRef.value) {
          contentRef.value.classList.remove("content-fade-out");
          contentRef.value.classList.add("content-fade-in");

          // Resetează clasa după animație
          setTimeout(() => {
            if (contentRef.value) {
              contentRef.value.classList.remove("content-fade-in");
            }
          }, 500);
        }
      }, 50);
    }, 200);
  } else {
    // Fallback dacă referința nu este disponibilă
    activeTab.value = tabId;
  }
};

// Funcție pentru animarea inițială a elementelor
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

  // Animăm titlul special
  if (titleRef.value) {
    setTimeout(() => {
      titleRef.value.classList.add("animate-title");
    }, 300);
  }
});
</script>

<template>
  <section
    id="experience"
    ref="sectionRef"
    class="py-20 md:py-28 relative overflow-hidden bg-slate-950 dark:bg-slate-950 text-slate-200 dark:text-slate-200"
  >
    <!-- Background decorative elements -->
    <div class="absolute inset-0 z-0">
      <div
        class="absolute top-20 right-10 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style="
          background: radial-gradient(
            circle,
            rgba(249, 115, 22, 0.15) 0%,
            transparent 70%
          );
        "
      ></div>
      <div
        class="absolute bottom-40 left-10 w-64 h-64 rounded-full opacity-10 blur-3xl"
        style="
          background: radial-gradient(
            circle,
            rgba(79, 70, 229, 0.2) 0%,
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
          <span class="title-gradient">Experiență profesională</span>
        </h2>
        <div class="w-20 h-1 mx-auto" style="background-color: #f97316"></div>
      </div>

      <div
        class="max-w-5xl mx-auto animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-300"
      >
        <div class="flex flex-col md:flex-row gap-6 md:gap-8">
          <!-- Tabs -->
          <div class="md:w-1/4">
            <div
              class="flex flex-row md:flex-col overflow-x-auto md:overflow-visible tabs-container"
            >
              <button
                v-for="item in experienceData"
                :key="item.id"
                @click="changeTab(item.id)"
                :class="[
                  'py-3 px-4 text-left transition-all whitespace-nowrap md:whitespace-normal experience-tab',
                  activeTab === item.id ? 'active-tab' : 'inactive-tab',
                ]"
              >
                {{ item.company }}
              </button>
            </div>
          </div>

          <!-- Content -->
          <div
            ref="contentRef"
            class="md:w-3/4 rounded-lg p-6 md:p-8 content-panel relative overflow-hidden"
          >
            <div
              v-for="item in experienceData"
              :key="item.id"
              :class="{
                block: activeTab === item.id,
                hidden: activeTab !== item.id,
              }"
              class="experience-content"
            >
              <div class="mb-6">
                <h3
                  class="text-xl md:text-2xl font-bold text-slate-50 dark:text-slate-50"
                >
                  {{ item.role }}
                </h3>
                <p style="color: #f97316">{{ item.company }}</p>
                <p class="text-slate-400 dark:text-slate-400 text-sm mt-1">
                  {{ item.period }}
                </p>
              </div>

              <ul class="space-y-4 mb-6">
                <li
                  v-for="(desc, index) in item.description"
                  :key="index"
                  class="flex items-start experience-list-item animate-on-scroll opacity-0 translate-x-4 transition-all"
                  :style="{ 'transition-delay': `${300 + index * 100}ms` }"
                >
                  <span class="bullet-icon flex-shrink-0 mr-3 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      style="color: #f97316"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                  <span class="text-slate-300 dark:text-slate-300">{{
                    desc
                  }}</span>
                </li>
              </ul>

              <div
                class="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700"
                style="transition-delay: 600ms"
              >
                <h4
                  class="text-sm uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-3"
                >
                  Tehnologii
                </h4>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="(tech, index) in item.technologies"
                    :key="index"
                    class="technology-tag"
                    :style="{ 'transition-delay': `${700 + index * 50}ms` }"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>

              <!-- Timeline indicator -->
              <div class="timeline-indicator"></div>
            </div>
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

/* Content panel styling */
.content-panel {
  background-color: rgba(15, 23, 42, 0.3);
  border: 1px solid rgba(71, 85, 105, 0.3);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Timeline indicator */
.timeline-indicator {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 2px;
  background: linear-gradient(
    to bottom,
    transparent,
    #f97316 20%,
    #f97316 80%,
    transparent
  );
  opacity: 0.5;
}

/* Tab styling */
.experience-tab {
  position: relative;
  border-left: 2px solid transparent;
  transform: translateX(0);
  transition: all 0.3s ease;
}

.tabs-container {
  border-left: 2px solid rgba(71, 85, 105, 0.3);
}

@media (max-width: 768px) {
  .tabs-container {
    border-left: none;
    border-bottom: 2px solid rgba(71, 85, 105, 0.3);
  }

  .experience-tab {
    border-left: none;
    border-bottom: 2px solid transparent;
  }
}

.active-tab {
  color: #f97316;
  border-left-color: #f97316;
  background-color: rgba(249, 115, 22, 0.05);
  transform: translateX(2px);
  font-weight: 500;
}

.inactive-tab {
  color: #94a3b8;
  border-left-color: transparent;
}

.inactive-tab:hover {
  color: #cbd5e1;
  border-left-color: #64748b;
  transform: translateX(1px);
}

@media (max-width: 768px) {
  .active-tab {
    border-left-color: transparent;
    border-bottom-color: #f97316;
    transform: translateY(-2px);
  }

  .inactive-tab:hover {
    border-left-color: transparent;
    border-bottom-color: #64748b;
    transform: translateY(-1px);
  }
}

/* Technology tags */
.technology-tag {
  background-color: rgba(15, 23, 42, 0.8);
  color: #cbd5e1;
  font-size: 0.875rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  border: 1px solid rgba(71, 85, 105, 0.3);
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(10px);
  animation: tagAppear 0.5s forwards;
  animation-delay: var(--delay, 0ms);
}

.technology-tag:hover {
  background-color: rgba(15, 23, 42, 0.95);
  border-color: #f97316;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* List item styling */
.experience-list-item {
  position: relative;
}

.bullet-icon {
  transform: scale(0);
  animation: scaleIn 0.5s forwards;
  animation-delay: var(--delay, 0ms);
}

.experience-list-item:hover .bullet-icon {
  transform: scale(1.2);
}

/* Animation for content transition */
.content-fade-out {
  opacity: 0;
  transform: translateX(20px);
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.content-fade-in {
  opacity: 1;
  transform: translateX(0);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

/* Experience content animations */
.experience-content {
  opacity: 0;
  animation: fadeIn 0.6s forwards;
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

/* Animation classes */
.animate-in {
  opacity: 1 !important;
  transform: translate(0, 0) !important;
}

/* Keyframe animations */
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes scaleIn {
  0% {
    transform: scale(0);
  }
  70% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes tagAppear {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
