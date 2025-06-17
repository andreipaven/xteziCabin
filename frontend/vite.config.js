import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { host: "0.0.0.0", port: 4000 },
  build: {
    chunkSizeWarningLimit: 1000, // reduce la 1MB ca să vezi ce pachete sunt mari
  },
});
