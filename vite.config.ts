import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import {defineConfig, type ViteDevServer} from 'vite';
import path from 'path';
import {startWebsocketServer} from "./src/server/websocket";


const webSocketServer = {
	name: "websocket",
	configureServer(server: ViteDevServer) {
	  startWebsocketServer(server.httpServer)
	},
  };

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), webSocketServer],
	server : {
		allowedHosts : ["planszowa.oracle.aquabx.ovh"]
	}
});
