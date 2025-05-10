<script setup lang="ts">
import { onMounted, ref } from "vue";

// Obține anul curent pentru copyright
const currentYear = new Date().getFullYear();
const footerRef = ref(null);

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
});

// Function to smooth scroll to sections
const scrollToSection = (sectionId: string) => {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<template>
  <footer
    ref="footerRef"
    class="relative py-12 md:py-14 overflow-hidden bg-slate-950 dark:bg-slate-950 text-slate-200 dark:text-slate-200"
  >
    <!-- Decorative elements -->
    <div class="absolute inset-0 z-0 overflow-hidden">
      <div
        class="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-5 blur-3xl"
        style="
          background: radial-gradient(
            circle,
            rgba(249, 115, 22, 0.4) 0%,
            transparent 70%
          );
        "
      ></div>
      <div
        class="absolute bottom-0 right-1/4 w-64 h-64 rounded-full opacity-5 blur-3xl"
        style="
          background: radial-gradient(
            circle,
            rgba(99, 102, 241, 0.3) 0%,
            transparent 70%
          );
        "
      ></div>

      <!-- Subtle footer divider -->
      <div
        class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/20 to-transparent"
      ></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
        <!-- Brand/Info Column -->
        <div
          class="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700"
        >
          <h3
            class="text-xl font-bold mb-5 inline-block relative footer-heading"
          >
            <span class="title-gradient">Ionut Nechita</span>
          </h3>
          <p class="text-slate-400 dark:text-slate-400 mb-6">
            Dezvoltator software cu peste 10 ani de experiență, specializat în
            tehnologii web moderne și arhitecturi scalabile.
          </p>
          <div class="flex space-x-5 mt-6">
            <a
              href="https://github.com/ionutnechita"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link"
              aria-label="GitHub"
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
            </a>
            <a
              href="https://linkedin.com/in/ionut-nechita-12b77b76"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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
              class="social-link"
              aria-label="Twitter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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

        <!-- Quick Links Column -->
        <div
          class="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-100"
        >
          <h3
            class="text-xl font-bold text-slate-50 dark:text-slate-50 mb-5 inline-block relative footer-heading"
          >
            Navigare rapidă
          </h3>
          <ul class="nav-links space-y-3">
            <li
              v-for="(item, index) in [
                'about',
                'experience',
                'skills',
                'projects',
                'contact',
              ]"
              :key="index"
            >
              <a
                :href="`#${item}`"
                @click.prevent="scrollToSection(item)"
                class="nav-link"
              >
                <span class="nav-dot"></span>
                <span class="capitalize">{{
                  item === "about"
                    ? "Despre"
                    : item === "experience"
                    ? "Experiență"
                    : item === "skills"
                    ? "Competențe"
                    : item === "projects"
                    ? "Proiecte"
                    : "Contact"
                }}</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact Column -->
        <div
          class="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-200"
        >
          <h3
            class="text-xl font-bold text-slate-50 dark:text-slate-50 mb-5 inline-block relative footer-heading"
          >
            Contact
          </h3>
          <ul class="space-y-4">
            <li class="contact-item">
              <div class="contact-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  style="color: #f97316"
                >
                  <path
                    d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                  />
                  <path
                    d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                  />
                </svg>
              </div>
              <a href="mailto:ionut_n2001@yahoo.com" class="contact-text">
                ionut_n2001@yahoo.com
              </a>
            </li>
            <li class="contact-item">
              <div class="contact-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  style="color: #f97316"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <span class="contact-text">+40 721 578 108</span>
            </li>
            <li class="contact-item">
              <div class="contact-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  style="color: #f97316"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <span class="contact-text">Galati, România</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Copyright -->
      <div
        class="relative mt-14 pt-8 animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-300"
      >
        <!-- Border gradient -->
        <div
          class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/30 to-transparent"
        ></div>

        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-slate-500 dark:text-slate-500 text-sm">
            © {{ currentYear }} Ionut Nechita. Toate drepturile rezervate.
          </p>
          <div class="mt-4 md:mt-0 flex flex-wrap gap-y-2 justify-center">
            <a
              href="#"
              class="text-sm text-slate-500 dark:text-slate-500 hover:text-orange-500 dark:hover:text-orange-500 transition-colors mr-6"
            >
              Politica de confidențialitate
            </a>
            <a
              href="#"
              class="text-sm text-slate-500 dark:text-slate-500 hover:text-orange-500 dark:hover:text-orange-500 transition-colors"
            >
              Termeni și condiții
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Title gradient */
.title-gradient {
  background: linear-gradient(90deg, #f97316, #fb923c, #fdba74);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
}

/* Footer heading style */
.footer-heading::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, #f97316, transparent);
  transition: width 0.3s ease;
}

.footer-heading:hover::after {
  width: 100%;
}

/* Social link styles */
.social-link {
  color: #94a3b8;
  transition: all 0.3s ease;
  display: inline-flex;
  padding: 8px;
  border-radius: 8px;
  background-color: rgba(15, 23, 42, 0.4);
}

.social-link:hover {
  color: #f97316;
  transform: translateY(-4px);
  background-color: rgba(15, 23, 42, 0.6);
}

/* Navigation links */
.nav-links {
  display: flex;
  flex-direction: column;
}

.nav-link {
  display: flex;
  align-items: center;
  color: #94a3b8;
  transition: all 0.3s ease;
  padding: 4px 0;
  position: relative;
}

.nav-link:hover {
  color: #f97316;
  transform: translateX(8px);
}

.nav-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: rgba(249, 115, 22, 0.3);
  margin-right: 12px;
  transition: all 0.3s ease;
}

.nav-link:hover .nav-dot {
  background-color: #f97316;
  transform: scale(1.5);
}

/* Contact items */
.contact-item {
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.contact-item:hover {
  transform: translateX(5px);
}

.contact-icon {
  margin-right: 12px;
  transition: all 0.3s ease;
}

.contact-item:hover .contact-icon {
  transform: scale(1.2);
}

.contact-text {
  color: #94a3b8;
  transition: color 0.3s ease;
}

.contact-text:hover {
  color: #f97316;
}

/* Animation classes */
.animate-in {
  opacity: 1 !important;
  transform: translate(0, 0) !important;
}

/* Media queries */
@media (max-width: 768px) {
  .footer-heading::after {
    width: 30px;
  }
}
</style>
