<script setup lang="ts">
import { ref, onMounted } from "vue";

const formData = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const formStatus = ref({
  submitted: false,
  success: false,
  message: "",
});

const isSubmitting = ref(false);
const titleRef = ref(null);
const sectionRef = ref(null);
const formRef = ref(null);
const infoRef = ref(null);

// Handle form submission with enhanced feedback
const handleSubmit = async () => {
  // Validate form
  if (
    !formData.value.name ||
    !formData.value.email ||
    !formData.value.message
  ) {
    formStatus.value = {
      submitted: true,
      success: false,
      message: "Te rog completează toate câmpurile obligatorii.",
    };

    // Auto hide error message after 3 seconds
    setTimeout(() => {
      formStatus.value.submitted = false;
    }, 3000);

    return;
  }

  // Set submitting state to show loading
  isSubmitting.value = true;

  try {
    // In a real implementation, you would send the form data to a server
    // Here we'll simulate a successful submission with a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Show success message
    formStatus.value = {
      submitted: true,
      success: true,
      message:
        "Mesajul tău a fost trimis cu succes. Te voi contacta în curând!",
    };

    // Reset form after successful submission
    formData.value = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };

    // Reset status after 5 seconds
    setTimeout(() => {
      formStatus.value = {
        submitted: false,
        success: false,
        message: "",
      };
    }, 5000);
  } catch (error) {
    // Handle error case
    formStatus.value = {
      submitted: true,
      success: false,
      message:
        "A apărut o eroare la trimiterea mesajului. Te rog încearcă din nou.",
    };
  } finally {
    // Reset submitting state
    isSubmitting.value = false;
  }
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
});
</script>

<template>
  <section
    id="contact"
    ref="sectionRef"
    class="py-20 md:py-28 relative overflow-hidden bg-slate-950 dark:bg-slate-950 text-slate-200 dark:text-slate-200"
  >
    <!-- Background decorative elements -->
    <div class="absolute inset-0 z-0">
      <div
        class="absolute top-1/4 right-10 w-72 h-72 rounded-full opacity-15 blur-3xl"
        style="
          background: radial-gradient(
            circle,
            rgba(249, 115, 22, 0.2) 0%,
            transparent 70%
          );
        "
      ></div>
      <div
        class="absolute bottom-1/4 left-10 w-96 h-96 rounded-full opacity-10 blur-3xl"
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
          <span class="title-gradient">Contact</span>
        </h2>
        <p class="text-slate-400 dark:text-slate-400 max-w-2xl mx-auto">
          Ai un proiect interesant sau o oportunitate de colaborare? Hai să
          discutăm despre cum putem lucra împreună pentru a transforma ideile în
          realitate.
        </p>
        <div
          class="w-20 h-1 mx-auto mt-6"
          style="background-color: #f97316"
        ></div>
      </div>

      <div
        class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 max-w-6xl mx-auto"
      >
        <!-- Contact Information -->
        <div
          ref="infoRef"
          class="contact-info-card animate-on-scroll opacity-0 -translate-x-8 transition-all duration-700 delay-200"
        >
          <h3
            class="text-2xl font-bold mb-8 text-slate-50 dark:text-slate-50 relative inline-block after-line"
          >
            Informații de contact
          </h3>

          <div class="space-y-8">
            <!-- Email -->
            <div class="flex items-start contact-info-item">
              <div class="info-icon-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style="color: #f97316"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h4
                  class="text-slate-300 dark:text-slate-300 font-semibold mb-1"
                >
                  Email
                </h4>
                <a href="mailto:contact@example.com" class="info-link">
                  contact@example.com
                </a>
              </div>
            </div>

            <!-- Phone -->
            <div class="flex items-start contact-info-item">
              <div class="info-icon-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style="color: #f97316"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <h4
                  class="text-slate-300 dark:text-slate-300 font-semibold mb-1"
                >
                  Telefon
                </h4>
                <a href="tel:+40721578108" class="info-link">
                  +40 721 578 108
                </a>
              </div>
            </div>

            <!-- Location -->
            <div class="flex items-start contact-info-item">
              <div class="info-icon-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style="color: #f97316"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h4
                  class="text-slate-300 dark:text-slate-300 font-semibold mb-1"
                >
                  Locație
                </h4>
                <p class="text-slate-400 dark:text-slate-400">
                  Galati, România
                </p>
              </div>
            </div>
          </div>

          <!-- Social media links -->
          <div class="mt-12">
            <h4 class="text-slate-300 dark:text-slate-300 font-semibold mb-5">
              Urmărește-mă
            </h4>
            <div class="flex space-x-5">
              <a
                href="https://github.com/ionutnechita"
                target="_blank"
                rel="noopener noreferrer"
                class="social-link github-link"
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
                <span class="link-tooltip">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/ionut-nechita-12b77b76"
                target="_blank"
                rel="noopener noreferrer"
                class="social-link linkedin-link"
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
                <span class="link-tooltip">LinkedIn</span>
              </a>
              <a
                href="https://twitter.com/sander440"
                target="_blank"
                rel="noopener noreferrer"
                class="social-link twitter-link"
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
                <span class="link-tooltip">Twitter</span>
              </a>
            </div>
          </div>

          <!-- Decoration dots -->
          <div
            class="absolute -top-2 -right-2 w-4 h-4 rounded-full"
            style="background-color: rgba(249, 115, 22, 0.4)"
          ></div>
          <div
            class="absolute -bottom-2 -left-2 w-4 h-4 rounded-full"
            style="background-color: rgba(99, 102, 241, 0.4)"
          ></div>
        </div>

        <!-- Contact Form -->
        <div
          ref="formRef"
          class="contact-form-card animate-on-scroll opacity-0 translate-x-8 transition-all duration-700 delay-300"
        >
          <h3
            class="text-2xl font-bold mb-8 text-slate-50 dark:text-slate-50 relative inline-block after-line"
          >
            Trimite un mesaj
          </h3>

          <form @submit.prevent="handleSubmit" class="space-y-5">
            <div class="form-group">
              <label for="name" class="form-label">Nume</label>
              <input
                type="text"
                id="name"
                v-model="formData.name"
                required
                class="form-input"
                placeholder="Numele tău"
              />
            </div>

            <div class="form-group">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                id="email"
                v-model="formData.email"
                required
                class="form-input"
                placeholder="Adresa ta de email"
              />
            </div>

            <div class="form-group">
              <label for="subject" class="form-label">Subiect</label>
              <input
                type="text"
                id="subject"
                v-model="formData.subject"
                class="form-input"
                placeholder="Subiectul mesajului"
              />
            </div>

            <div class="form-group">
              <label for="message" class="form-label">Mesaj</label>
              <textarea
                id="message"
                v-model="formData.message"
                required
                rows="5"
                class="form-input resize-none"
                placeholder="Detaliile mesajului tău"
              ></textarea>
            </div>

            <button
              type="submit"
              class="submit-button"
              :disabled="isSubmitting"
            >
              <span
                v-if="isSubmitting"
                class="flex items-center justify-center"
              >
                <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Se trimite...
              </span>
              <span v-else>Trimite mesajul</span>
            </button>

            <!-- Form status message -->
            <div
              v-if="formStatus.submitted"
              class="form-message"
              :class="formStatus.success ? 'success-message' : 'error-message'"
            >
              <svg
                v-if="formStatus.success"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
              {{ formStatus.message }}
            </div>
          </form>
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

/* Card styling */
.contact-info-card,
.contact-form-card {
  background-color: rgba(15, 23, 42, 0.3);
  border-radius: 0.5rem;
  padding: 2rem;
  border: 1px solid rgba(71, 85, 105, 0.3);
  position: relative;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
}

.contact-info-card:hover,
.contact-form-card:hover {
  border-color: rgba(249, 115, 22, 0.3);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

/* After line effect for headings */
.after-line::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, #f97316, transparent);
  transition: width 0.3s ease;
}

.contact-info-card:hover .after-line::after,
.contact-form-card:hover .after-line::after {
  width: 100px;
}

/* Contact info items */
.contact-info-item {
  transition: transform 0.3s ease;
}

.contact-info-item:hover {
  transform: translateX(5px);
}

.info-icon-container {
  background-color: rgba(249, 115, 22, 0.1);
  padding: 0.75rem;
  border-radius: 0.5rem;
  margin-right: 1rem;
  transition: all 0.3s ease;
}

.contact-info-item:hover .info-icon-container {
  background-color: rgba(249, 115, 22, 0.2);
}

.info-link {
  color: #94a3b8;
  transition: all 0.3s ease;
}

.info-link:hover {
  color: #f97316;
}

/* Social links */
.social-link {
  background-color: rgba(15, 23, 42, 0.6);
  padding: 0.75rem;
  border-radius: 0.5rem;
  color: #94a3b8;
  transition: all 0.3s ease;
  position: relative;
}

.social-link:hover {
  transform: translateY(-5px);
  background-color: rgba(15, 23, 42, 0.8);
}

.github-link:hover {
  color: #f5f5f5;
  box-shadow: 0 5px 10px rgba(255, 255, 255, 0.1);
}

.linkedin-link:hover {
  color: #0077b5;
  box-shadow: 0 5px 10px rgba(0, 119, 181, 0.1);
}

.twitter-link:hover {
  color: #1da1f2;
  box-shadow: 0 5px 10px rgba(29, 161, 242, 0.1);
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

.social-link:hover .link-tooltip {
  opacity: 1;
  visibility: visible;
  bottom: -25px;
}

/* Form styling */
.form-group {
  position: relative;
}

.form-label {
  display: block;
  color: #cbd5e1;
  margin-bottom: 0.5rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

.form-group:focus-within .form-label {
  color: #f97316;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(71, 85, 105, 0.5);
  border-radius: 0.375rem;
  color: #cbd5e1;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #f97316;
  box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.2);
}

.form-input::placeholder {
  color: #64748b;
}

/* Submit button */
.submit-button {
  width: 100%;
  background-color: #f97316;
  color: white;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.submit-button::before {
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

.submit-button:not(:disabled):hover {
  background-color: #ea580c;
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(249, 115, 22, 0.2);
}

.submit-button:hover::before {
  transform: translateX(100%);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Form status messages */
.form-message {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  animation: slideIn 0.3s ease forwards;
}

.success-message {
  background-color: rgba(22, 163, 74, 0.2);
  color: #86efac;
  border: 1px solid rgba(22, 163, 74, 0.3);
}

.error-message {
  background-color: rgba(220, 38, 38, 0.2);
  color: #fca5a5;
  border: 1px solid rgba(220, 38, 38, 0.3);
}

/* Animation classes */
.animate-in {
  opacity: 1 !important;
  transform: translate(0, 0) !important;
}

/* Keyframe animations */
@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Media queries for responsive design */
@media (max-width: 768px) {
  .contact-info-card,
  .contact-form-card {
    padding: 1.5rem;
  }
}
</style>
