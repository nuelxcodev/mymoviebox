import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env, // Access process.env variables in your code
    'VITE_API_URL': JSON.stringify(process.env.VITE_API_URL), // Use the server API URL
    'VITE_API_PIC_URL': JSON.stringify(process.env.VITE_API_PIC_URL), // If needed for images
    'CLIENT_URL': JSON.stringify(process.env.CLIENT_URL), // Client URL
  },
  server: {
    host: process.env.CLIENT_HOST || '0.0.0.0', // Use the client host from .env or default to '0.0.0.0'
    port: parseInt(process.env.CLIENT_PORT) || 8081, // Use the client port from .env or default to 8081
    strictPort: true,
  },
  preview: {
    host: '0.0.0.0',
    port: parseInt(process.env.CLIENT_PORT) || 8081,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
