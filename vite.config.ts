import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
	},
	build: {
		rollupOptions: {
			output: {
				/*
					Every importer of motion is behind a lazy() boundary, but they share it,
					so rollup hoists it into the common ancestor: the entry chunk. Nothing on
					first paint animates, so pin it to its own chunk and let the lazy routes
					pull it when they are actually opened.
				*/
				manualChunks(id) {
					if (/node_modules[\\/](motion|motion-dom|motion-utils|framer-motion)[\\/]/.test(id)) {
						return 'motion';
					}
				},
			},
		},
	},
});
