<script setup lang="ts">
import { ref, onMounted } from "vue";

// Define skill category interface
interface SkillCategory {
  title: string;
  skills: {
    name: string;
    level: number; // 1-5 stars
    icon?: string;
  }[];
}

// Sample skills data
const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "Vue", level: 5 },
      { name: "TypeScript", level: 5 },
      { name: "JavaScript", level: 5 },
      { name: "Nuxt.js", level: 4 },
      { name: "HTML/CSS", level: 5 },
      { name: "Tailwind CSS", level: 4 },
      { name: "Vuex/Pinia", level: 4 },
      { name: "GraphQL (client)", level: 3 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 5 },
      { name: "Express", level: 5 },
      { name: "API Design", level: 4 },
      { name: "MongoDB", level: 4 },
      { name: "PostgreSQL", level: 3 },
      { name: "GraphQL (server)", level: 3 },
      { name: "REST API", level: 5 },
      { name: "Microservices", level: 4 },
    ],
  },
  {
    title: "DevOps & Tools",
    skills: [
      { name: "Git", level: 5 },
      { name: "Docker", level: 4 },
      { name: "CI/CD", level: 4 },
      { name: "AWS", level: 3 },
      { name: "Linux", level: 4 },
      { name: "Agile/Scrum", level: 5 },
      { name: "Jest", level: 4 },
      { name: "Webpack", level: 3 },
    ],
  },
  {
    title: "Soft Skills",
    skills: [
      { name: "Team Leadership", level: 4 },
      { name: "Comunicare", level: 5 },
      { name: "Problem Solving", level: 5 },
      { name: "Mentoring", level: 4 },
      { name: "Planificare", level: 4 },
      { name: "Adaptabilitate", level: 5 },
      { name: "Colaborare", level: 5 },
      { name: "Atenție la detalii", level: 4 },
    ],
  },
];

// Tech logos
const techLogos = [
  "Vue",
  "Nuxt.js",
  "TypeScript",
  "Node.js",
  "Express",
  "MongoDB",
  "AWS",
  "Docker",
  "Git",
  "Tailwind",
  "GraphQL",
  "Jest",
];

// References for animation
const sectionRef = ref(null);
const titleRef = ref(null);
const categoryRefs = ref([]);

// Render stars for skill level with animation
const renderStars = (level: number, skillIndex: number) => {
  return Array(5)
    .fill(null)
    .map((_, index) => {
      const isFilled = index < level;
      const delay = `${skillIndex * 50 + index * 100}ms`;
      return {
        filled: isFilled,
        delay: delay,
      };
    });
};

// Animation for skill bars with sequential delay
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

  // Observe elements with animate-on-scroll class
  document.querySelectorAll(".animate-on-scroll").forEach((element) => {
    observer.observe(element);
  });

  // Animate title
  if (titleRef.value) {
    setTimeout(() => {
      titleRef.value.classList.add("animate-title");
    }, 300);
  }
});
</script>

<template>
  <section
    id="skills"
    ref="sectionRef"
    class="py-20 md:py-28 relative overflow-hidden bg-slate-950 dark:bg-slate-950 text-slate-200 dark:text-slate-200"
  >
    <!-- Background decorative elements -->
    <div class="absolute inset-0 z-0">
      <div
        class="absolute top-40 left-10 w-72 h-72 rounded-full opacity-20 blur-3xl"
        style="
          background: radial-gradient(
            circle,
            rgba(249, 115, 22, 0.15) 0%,
            transparent 70%
          );
        "
      ></div>
      <div
        class="absolute bottom-20 right-10 w-80 h-80 rounded-full opacity-10 blur-3xl"
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
          <span class="title-gradient">Competențe tehnice</span>
        </h2>
        <p class="text-slate-400 dark:text-slate-400 max-w-2xl mx-auto">
          Pe parcursul celor 10 ani de experiență, am dezvoltat un set divers de
          competențe tehnice care mă ajută să abordez provocări complexe și să
          livrez soluții de calitate.
        </p>
        <div
          class="w-20 h-1 mx-auto mt-6"
          style="background-color: #f97316"
        ></div>
      </div>

      <!-- Skills grid -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
      >
        <div
          v-for="(category, categoryIndex) in skillCategories"
          :key="categoryIndex"
          class="skill-card animate-on-scroll opacity-0 transition-all duration-700"
          :style="{
            'transition-delay': `${categoryIndex * 100}ms`,
            transform: `translateY(${20 + categoryIndex * 10}px)`,
          }"
          ref="categoryRefs"
        >
          <!-- Card header -->
          <h3
            class="text-xl font-bold text-slate-50 dark:text-slate-50 mb-5 pb-3 border-b border-slate-800 dark:border-slate-800 category-title"
          >
            {{ category.title }}
          </h3>

          <!-- Skills list -->
          <ul class="space-y-4">
            <li
              v-for="(skill, skillIndex) in category.skills"
              :key="skillIndex"
              class="flex items-center justify-between skill-item"
              :class="{ 'opacity-0': true }"
              :style="{ 'animation-delay': `${300 + skillIndex * 100}ms` }"
            >
              <span class="text-slate-300 dark:text-slate-300 skill-name">{{
                skill.name
              }}</span>
              <div class="flex">
                <span
                  v-for="(star, i) in renderStars(skill.level, skillIndex)"
                  :key="i"
                  class="star-icon"
                  :class="{
                    'filled-star': star.filled,
                    'empty-star': !star.filled,
                  }"
                  :style="{ 'animation-delay': star.delay }"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </li>
          </ul>

          <!-- Decorative elements -->
          <div
            class="absolute -top-2 -right-2 w-4 h-4 rounded-full card-dot"
          ></div>
          <div
            class="absolute -bottom-1 -left-1 w-2 h-2 rounded-full card-dot-small"
          ></div>
        </div>
      </div>

      <!-- Technologies section -->
      <div
        class="mt-20 text-center animate-on-scroll opacity-0 translate-y-8 transition-all duration-700"
        style="transition-delay: 600ms"
      >
        <h3 class="text-2xl font-bold mb-8 text-slate-50 dark:text-slate-50">
          Tehnologii și Unelte
        </h3>

        <div
          class="flex flex-wrap justify-center gap-4 md:gap-6 max-w-4xl mx-auto"
        >
          <div
            v-for="(tech, index) in techLogos"
            :key="index"
            class="tech-logo animate-on-scroll opacity-0 transition-all duration-500"
            :style="{
              'transition-delay': `${700 + index * 50}ms`,
              transform: 'scale(0.8)',
            }"
          >
            <span>{{ tech }}</span>
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

/* Skill cards */
.skill-card {
  background-color: rgba(15, 23, 42, 0.3);
  border-radius: 0.5rem;
  padding: 1.5rem;
  border: 1px solid rgba(71, 85, 105, 0.3);
  position: relative;
  backdrop-filter: blur(10px);
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.skill-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  border-color: rgba(249, 115, 22, 0.3);
}

.skill-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #f97316, transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.skill-card:hover::before {
  opacity: 1;
}

/* Category title animation */
.category-title {
  position: relative;
  display: inline-block;
}

.category-title::after {
  content: "";
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, #f97316, transparent);
  transform-origin: left;
  transform: scaleX(0);
  transition: transform 0.5s ease;
}

.skill-card:hover .category-title::after {
  transform: scaleX(1);
}

/* Skill items */
.skill-item {
  position: relative;
  opacity: 0;
  animation: fadeInUp 0.5s forwards;
}

.skill-name {
  transition: transform 0.3s ease, color 0.3s ease;
}

.skill-item:hover .skill-name {
  color: #f97316;
  transform: translateX(3px);
}

/* Star icons */
.star-icon {
  margin-left: 2px;
  opacity: 0;
  transform: scale(0);
  animation: popIn 0.4s forwards;
}

.filled-star {
  color: #f97316;
}

.empty-star {
  color: #334155;
}

/* Tech logos */
.tech-logo {
  width: 6rem;
  height: 6rem;
  background-color: rgba(15, 23, 42, 0.4);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(71, 85, 105, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.tech-logo span {
  color: #94a3b8;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

.tech-logo::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.tech-logo:hover {
  transform: translateY(-5px) scale(1.05);
  border-color: rgba(249, 115, 22, 0.5);
  box-shadow: 0 10px 15px -3px rgba(249, 115, 22, 0.1);
}

.tech-logo:hover::before {
  opacity: 1;
}

.tech-logo:hover span {
  color: #f97316;
}

/* Decorative dots */
.card-dot {
  background-color: rgba(249, 115, 22, 0.4);
  transition: all 0.3s ease;
}

.skill-card:hover .card-dot {
  transform: scale(1.5);
  background-color: rgba(249, 115, 22, 0.6);
}

.card-dot-small {
  background-color: rgba(99, 102, 241, 0.3);
  transition: all 0.3s ease;
}

.skill-card:hover .card-dot-small {
  transform: scale(1.5);
  background-color: rgba(99, 102, 241, 0.5);
}

/* Animation for title */
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
  transform: translate(0, 0) scale(1) !important;
}

/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes popIn {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  70% {
    opacity: 1;
    transform: scale(1.2);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Media queries for responsive design */
@media (max-width: 768px) {
  .tech-logo {
    width: 5rem;
    height: 5rem;
    font-size: 0.875rem;
  }
}
</style>
