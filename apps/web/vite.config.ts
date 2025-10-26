import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import path from "node:path";

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      generatedRouteTree: "./src/routeTree.gen.ts",
      routesDirectory: "./src/pages",
      routeToken: "layout",
    }),
    react(),
    tailwindcss(),
  ],
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    hmr: {
      host: "localhost", // para que HMR funcione no host
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Ignora avisos sobre PURE comments
        if (warning.message.includes("PURE__*/")) return;
        warn(warning);
      },
    },
  },
});
