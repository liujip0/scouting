import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  root: "./src",
  publicDir: "../public",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    copyPublicDir: true,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      manifest: false,
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
