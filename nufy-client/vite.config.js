import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env, 
  },
  server: {
    host: '0.0.0.0', 
    port: 5000,      
    strictPort: true, 
  },
  preview: {
    host: '0.0.0.0', 
    port: 5000,      
  },
  build: {
    outDir: 'dist',  
    assetsDir: 'assets', 
  },
});
