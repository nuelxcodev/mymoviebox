import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';

// Load the .env file from the root directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env, // Pass environment variables to the app
  },
  server: {
    host: '0.0.0.0', // Make it listen on all IP addresses
    port: process.env.PORT || 5173, // Use Render's assigned PORT or fallback to 5173
  },
});