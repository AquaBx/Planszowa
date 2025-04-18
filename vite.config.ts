import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import {defineConfig} from 'vite';
import {webSocketServer} from "./src/server/websocket";

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), webSocketServer],
	server : {
		allowedHosts : ["planszowa.oracle.aquabx.ovh"]
	}
});
