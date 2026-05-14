import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Дозволяє підключатися ззовні контейнера
    port: 5173, // Порт, який ми прописали в docker-compose
    watch: {
      usePolling: true, // Потрібно для Windows, щоб зміни в коді одразу з'являлися на сайті
    },
  },
});
