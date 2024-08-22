import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [react(),
  VitePWA({
    manifest: {
      display: "standalone",
      display_override: ['window-controls-overlay'],
      lang: "es-ES",
      name: "StudyMate",
      short_name: "StudyMate",
      description: "StudyMate es una aplicacion impulsada por IA, diseñada para ayudarte a prepararte para tus examenes y estudiar de manera comoda.",
      theme_color: "#1e40af",
      background_color: "#1e293b",
      icons: [
        {
          src: "logo64x64.png",
          sizes: "64x64",
          type: "image/png",
        },
        {
          src: "logo192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any"
        },
        {
          src: "logo512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable"
        }
      ]
    }
  })],
  workbox: {
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/api\.example\.com\/.*$/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'api-cache',
          networkTimeoutSeconds: 10,
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
});