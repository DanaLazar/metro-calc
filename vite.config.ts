/// <reference types="vitest" />

import { defineConfig } from "vitest/config";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    // Needed because `@danalazar/metro-ui` injects built CSS assets
    // (e.g. `dist/assets/spinner.css`) which Vitest otherwise tries to load as ESM.
    css: true,
    pool: "vmThreads",
    server: {
      deps: {
        inline: ["@danalazar/metro-ui"],
      },
    },
  },
});
