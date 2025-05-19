import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(() => {
  const apiUrl = `http://localhost:8000`;

  return {
    envDir: path.resolve(__dirname, ".."),

    define: {
      "import.meta.env.VITE_API_URL": JSON.stringify(apiUrl),
    },

    server: {
      allowedHosts: ["localhost"]
    },

    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@modules": path.resolve(__dirname, "src/modules"),
        "@util": path.resolve(__dirname, "src/util"),
      },
    },
  };
});
