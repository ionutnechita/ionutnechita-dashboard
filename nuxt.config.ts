// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    'shadcn-nuxt',
    '@clerk/nuxt',
  ],
  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: [
      tailwindcss(),
      {
        name: 'vite-plugin-ignore-tailwind-sourcemap-warnings',
        apply: 'build',
        configResolved(config) {
          const originalOnWarn = config.build.rollupOptions.onwarn;
          config.build.rollupOptions.onwarn = (warning, warn) => {
            if (
              warning.code === 'SOURCEMAP_BROKEN' &&
              warning.plugin === '@tailwindcss/vite:generate:build'
            ) {
              return;
            }
            if (originalOnWarn) {
              originalOnWarn(warning, warn);
            } else {
              warn(warning);
            }
          };
        }
      }
    ],
  },
  shadcn: {
    /**
     * Prefix for all the imported components
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  clerk: {
    // Optional appearance configuration
    appearance: {
      // You can customize Clerk's appearance here
      elements: {
        formButtonPrimary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        footerActionLink: 'text-primary hover:text-primary/90 font-semibold',
        card: 'bg-card shadow-md',
      }
    }
  },

  // Runtime config for environment variables
  runtimeConfig: {
    // Private keys that are exposed to the server
    clerkSecretKey: process.env.NUXT_CLERK_SECRET_KEY,

    // Public keys that are exposed to the client
    public: {
      clerkPublishableKey: process.env.NUXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    }
  },
  routeRules: {
    '/login': { ssr: false },
    '/sign-up': { ssr: false },
    '/account': { ssr: false },
    '/dashboard': { ssr: false },
  }
})
