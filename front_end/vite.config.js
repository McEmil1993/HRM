import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(() => {
    return {
        plugins: [vue()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        define: {
            'process.env': {
                BACKEND_URL: "http://192.168.68.186:235"
            }
        },
        boot: [
            'globals',
        ],
    };
});
