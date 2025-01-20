// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import dotenv from 'dotenv';
// import path from 'path';

// // Load the .env file from the root directory
// dotenv.config({ path: path.resolve(__dirname, '../.env') });

// export default defineConfig({
//   plugins: [react()],
//   define: {
//     'process.env': process.env, // Pass environment variables to the app
//   },
//   build: {
//     outDir: 'dist', 
//   },
//   base: '/'
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';

// Load the .env file from the root directory
dotenv.config({ path: path.resolve(__dirname, "../.env") });


export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': { ...process.env }, // Pass environment variables explicitly
  },
  build: {
    outDir: 'dist', // Output directory for deployment
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'), // Ensure the correct entry file
    },
  },
  server: {
    port: 5173, // Local development port
    open: true, // Automatically open in browser
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:5000', // Backend API URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
  base: './', // Use relative paths to handle deployment correctly
});
