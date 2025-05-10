<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

// Define project interface
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
  featured: boolean;
}

// Sample projects data - to be replaced with actual data
const projects: Project[] = [
  {
    id: 1,
    title: "Enterprise Resource Platform",
    description:
      "Platformă completă de gestionare a resurselor pentru companii mijlocii, cu module pentru HR, financiar, proiecte și inventar. Construită cu Vue, Node.js și MongoDB, implementând o arhitectură de microservicii.",
    image: "/images/projects/erp-system.jpg",
    tags: ["Vue", "Node.js", "MongoDB", "Docker", "Microservices"],
    link: "https://erp-project.example.com",
    github: "https://github.com/ionutnechita/erp-system",
    featured: true,
  },
  {
    id: 2,
    title: "Analytics Dashboard",
    description:
      "Dashboard interactiv pentru vizualizarea și analiza datelor în timp real. Utilizează D3.js pentru grafice complexe și Vue pentru UI. Include funcționalități de export date și rapoarte personalizabile.",
    image: "/images/projects/analytics-dashboard.jpg",
    tags: ["Vue", "TypeScript", "D3.js", "Socket.io", "Vuex"],
    link: "https://analytics-dashboard.example.com",
    github: "https://github.com/ionutnechita/analytics-dashboard",
    featured: true,
  },
  {
    id: 3,
    title: "E-commerce Platform",
    description:
      "Platformă de e-commerce full-stack cu funcționalități de gestionare a produselor, coș de cumpărături, procesare plăți și administrare comenzi. Construită cu Nuxt.js, Stripe și MongoDB.",
    image: "/images/projects/ecommerce-platform.jpg",
    tags: ["Nuxt.js", "MongoDB", "Stripe", "Tailwind CSS", "Authentication"],
    github: "https://github.com/ionutnechita/ecommerce-platform",
    featured: true,
  },
  {
    id: 4,
    title: "CRM System",
    description:
      "Sistem de management al relațiilor cu clienții cu funcționalități de urmărire a contactelor, gestiune oportunități, integrare email și raportare avansată.",
    image: "/images/projects/crm-system.jpg",
    tags: ["Vue", "Express", "PostgreSQL", "Redis", "OAuth"],
    link: "https://crm-system.example.com",
    featured: false,
  },
  {
    id: 5,
    title: "Mobile Fitness App",
    description:
      "Aplicație mobilă pentru fitness cu tracking activități, planuri de antrenament personalizate și integrare cu dispozitive wearable.",
    image: "/images/projects/fitness-app.jpg",
    tags: ["Vue Native", "Firebase", "Vuex", "Health API", "Capacitor"],
    github: "https://github.com/ionutnechita/fitness-app",
    featured: false,
  },
  {
    id: 6,
    title: "Task Management Tool",
    description:
      "Aplicație de management al sarcinilor cu interfață drag-and-drop, colaborare în timp real și notificări.",
    image: "/images/projects/task-management.jpg",
    tags: ["Vue.js", "Node.js", "MongoDB", "Socket.io", "JWT"],
    link: "https://task-tool.example.com",
    github: "https://github.com/ionutnechita/task-management",
    featured: false,
  },
];

const filter = ref<"all" | "featured">("all");
const titleRef = ref(null);
const sectionRef = ref(null);
const projectRefs = ref([]);

const filteredProjects = computed(() =>
  filter.value === "all"
    ? projects
    : projects.filter((project) => project.featured)
);

// Function to get project initials
const getProjectInitials = (title: string) => {
  return title
    .split(" ")
    .map((word) => word[0])
    .join("");
};

// Function to get random pastel color for project cards
const getRandomColor = (index: number) => {
  const colors = [
    "rgba(249, 115, 22, 0.2)", // Orange
    "rgba(79, 70, 229, 0.2)", // Indigo
    "rgba(16, 185, 129, 0.2)", // Emerald
    "rgba(236, 72, 153, 0.2)", // Pink
    "rgba(59, 130, 246, 0.2)", // Blue
    "rgba(245, 158, 11, 0.2)", // Amber
  ];
  return colors[index % colors.length];
};

// Function to animate cards when filter changes
const changeFilter = (newFilter: "all" | "featured") => {
  // Apply animation class to all cards first
  projectRefs.value.forEach((el: any) => {
    if (el) el.classList.add("card-exit");
  });

  // After animation, change the filter
  setTimeout(() => {
    filter.value = newFilter;

    // Wait for next tick to animate cards back in
    setTimeout(() => {
      projectRefs.value.forEach((el: any) => {
        if (el) {
          el.classList.remove("card-exit");
          el.classList.add("card-enter");

          // Remove the animation class after it completes
          setTimeout(() => {
            if (el) el.classList.remove("card-enter");
          }, 500);
        }
      });
    }, 50);
  }, 300);
};

// Animation on scroll
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

  // Animation for title
  if (titleRef.value) {
    setTimeout(() => {
      titleRef.value.classList.add("animate-title");
    }, 300);
  }

  // Initialize project refs array
  projectRefs.value = document.querySelectorAll(".project-card");
});
</script>

<template>
  <section
    id="projects"
    ref="sectionRef"
    class="py-20 md:py-28 relative overflow-hidden bg-slate-950 dark:bg-slate-950 text-slate-200 dark:text-slate-200"
  >
    <!-- Background decorative elements -->
    <div class="absolute inset-0 z-0">
      <div
        class="absolute top-20 left-1/4 w-96 h-96 rounded-full opacity-15 blur-3xl"
        style="
          background: radial-gradient(
            circle,
            rgba(249, 115, 22, 0.2) 0%,
            transparent 70%
          );
        "
      ></div>
      <div
        class="absolute bottom-20 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl"
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
          <span class="title-gradient">Proiecte</span>
        </h2>
        <p class="text-slate-400 dark:text-slate-400 max-w-2xl mx-auto">
          Am lucrat la o varietate de proiecte, de la aplicații web și mobile
          până la platforme enterprise și sisteme complexe. Iată câteva dintre
          cele mai relevante.
        </p>
        <div
          class="w-20 h-1 mx-auto mt-6"
          style="background-color: #f97316"
        ></div>
      </div>

      <!-- Filter tabs -->
      <div
        class="flex justify-center mb-12 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700"
        style="transition-delay: 200ms"
      >
        <div class="inline-flex rounded-lg p-1 filter-tabs">
          <button
            @click="changeFilter('all')"
            :class="[
              'px-4 py-2 rounded-md transition-all duration-300',
              filter === 'all' ? 'filter-active' : 'filter-inactive',
            ]"
          >
            Toate proiectele
          </button>
          <button
            @click="changeFilter('featured')"
            :class="[
              'px-4 py-2 rounded-md transition-all duration-300',
              filter === 'featured' ? 'filter-active' : 'filter-inactive',
            ]"
          >
            Proiecte principale
          </button>
        </div>
      </div>

      <!-- Projects grid -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        <div
          v-for="(project, index) in filteredProjects"
          :key="project.id"
          class="project-card animate-on-scroll"
          :style="{
            'transition-delay': `${300 + (index % 3) * 100}ms`,
            opacity: 0,
            transform: `translateY(${20 + (index % 3) * 10}px)`,
          }"
          ref="projectRefs"
        >
          <!-- Project Image (stylized placeholder) -->
          <div class="project-image">
            <div
              class="absolute inset-0 flex items-center justify-center overflow-hidden"
            >
              <!-- Decorative shapes -->
              <div
                class="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-40"
                :style="{ background: getRandomColor(index) }"
              ></div>
              <div
                class="absolute -bottom-4 -left-4 w-20 h-20 rounded-full opacity-30"
                :style="{ background: getRandomColor(index + 2) }"
              ></div>

              <!-- Project initials -->
              <div class="relative z-10 project-initials">
                {{ getProjectInitials(project.title) }}
              </div>
            </div>
          </div>

          <!-- Project Content -->
          <div class="p-6">
            <h3
              class="text-xl font-bold text-slate-50 dark:text-slate-50 mb-3 project-title"
            >
              {{ project.title }}
            </h3>
            <p
              class="text-slate-400 dark:text-slate-400 text-sm mb-5 line-clamp-3"
            >
              {{ project.description }}
            </p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-6">
              <span
                v-for="(tag, tagIndex) in project.tags"
                :key="tagIndex"
                class="project-tag"
                :style="{ 'animation-delay': `${600 + tagIndex * 70}ms` }"
              >
                {{ tag }}
              </span>
            </div>

            <!-- Links -->
            <div class="flex gap-4 project-links">
              <a
                v-if="project.github"
                :href="project.github"
                target="_blank"
                rel="noopener noreferrer"
                class="project-link github-link"
                aria-label="GitHub Repository"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
                <span class="link-tooltip">GitHub</span>
              </a>

              <a
                v-if="project.link"
                :href="project.link"
                target="_blank"
                rel="noopener noreferrer"
                class="project-link website-link"
                aria-label="Live Demo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"
                  />
                </svg>
                <span class="link-tooltip">Demo Live</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- GitHub CTA -->
      <div
        class="mt-20 text-center animate-on-scroll opacity-0 translate-y-8 transition-all duration-700"
        style="transition-delay: 600ms"
      >
        <p class="text-slate-400 dark:text-slate-400 mb-5">
          Vizitează profilul meu de GitHub pentru mai multe proiecte și
          contribuții
        </p>
        <a
          href="https://github.com/ionutnechita"
          target="_blank"
          rel="noopener noreferrer"
          class="github-cta"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
            />
          </svg>
          GitHub
        </a>
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

/* Filter tabs */
.filter-tabs {
  background-color: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(71, 85, 105, 0.3);
  backdrop-filter: blur(8px);
}

.filter-active {
  background-color: #f97316;
  color: white;
  box-shadow: 0 4px 6px -1px rgba(249, 115, 22, 0.2);
}

.filter-inactive {
  color: #94a3b8;
}

.filter-inactive:hover {
  color: #cbd5e1;
  background-color: rgba(249, 115, 22, 0.08);
}

/* Project cards */
.project-card {
  background-color: rgba(15, 23, 42, 0.3);
  border-radius: 0.5rem;
  overflow: hidden;
  border: 1px solid rgba(71, 85, 105, 0.3);
  backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  position: relative;
}

.project-card:hover {
  transform: translateY(-8px);
  border-color: rgba(249, 115, 22, 0.5);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

.project-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #f97316, transparent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
  z-index: 10;
}

.project-card:hover::before {
  transform: scaleX(1);
}

/* Project image */
.project-image {
  height: 12rem;
  background-color: rgba(15, 23, 42, 0.5);
  position: relative;
  overflow: hidden;
}

.project-initials {
  font-size: 3rem;
  font-weight: bold;
  color: rgba(249, 115, 22, 0.3);
  transition: all 0.3s ease;
}

.project-card:hover .project-initials {
  color: rgba(249, 115, 22, 0.5);
  transform: scale(1.1) rotate(5deg);
}

/* Project title */
.project-title {
  position: relative;
  display: inline-block;
  transition: color 0.3s ease;
}

.project-card:hover .project-title {
  color: #f97316;
}

/* Project tags */
.project-tag {
  background-color: rgba(15, 23, 42, 0.6);
  color: #cbd5e1;
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  border: 1px solid rgba(71, 85, 105, 0.3);
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(10px);
  animation: tagAppear 0.5s forwards;
}

.project-card:hover .project-tag {
  background-color: rgba(15, 23, 42, 0.8);
  border-color: rgba(249, 115, 22, 0.3);
}

/* Project links */
.project-link {
  color: #94a3b8;
  transition: all 0.3s ease;
  position: relative;
}

.project-link:hover {
  color: #f97316;
  transform: translateY(-2px);
}

.github-link:hover {
  color: #f5f5f5;
}

.website-link:hover {
  color: #f97316;
}

/* Link tooltips */
.link-tooltip {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(15, 23, 42, 0.9);
  color: #cbd5e1;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  pointer-events: none;
}

.project-link:hover .link-tooltip {
  opacity: 1;
  visibility: visible;
  bottom: -25px;
}

/* GitHub CTA button */
.github-cta {
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

.github-cta::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    130deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transform: translateX(-100%);
  transition: transform 0.5s ease;
}

.github-cta:hover {
  background-color: #ea580c;
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(249, 115, 22, 0.2);
}

.github-cta:hover::before {
  transform: translateX(100%);
}

.github-cta:active {
  transform: translateY(0);
}

/* Animation for card transitions */
.card-exit {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.3s ease;
}

.card-enter {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.3s ease;
}

/* Animation classes */
.animate-in {
  opacity: 1 !important;
  transform: translate(0, 0) !important;
}

/* Keyframe animations */
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

/* Media queries for responsive design */
@media (max-width: 768px) {
  .project-image {
    height: 10rem;
  }

  .project-tag {
    font-size: 0.7rem;
    padding: 0.2rem 0.6rem;
  }
}
</style>
