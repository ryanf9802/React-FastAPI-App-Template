import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(__dirname, ".."), "");
  const apiUrl = `http://${env.HOST_IP}:${env.API_HOST_PORT}`;

  return {
    envDir: path.resolve(__dirname, ".."),

    define: {
      "import.meta.env.VITE_API_URL": JSON.stringify(apiUrl),
    },

    server: {
      port: Number(env.UI_HOST_PORT) || 9500,
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
