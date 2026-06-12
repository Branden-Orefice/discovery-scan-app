import { defineConfig } from "vitest/config";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import visualizer from "rollup-plugin-visualizer";
import path from "path";

const config = defineConfig({
  resolve: { 
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "#": path.resolve(__dirname, "./src"),
    },
    tsconfigPaths: true 
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    viteReact({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
    visualizer({open: true, gzipSize: true}),
  ],
  server: {
    proxy: {
      '/api': {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  }
});

export default config;
