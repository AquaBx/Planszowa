import { handler } from './build/handler.js';
import { createServer } from 'http';
import { startWebsocketServer } from './src/server/websocket.js';

const server = createServer(handler);

startWebsocketServer(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
	console.log(`✅ Server avec SvelteKit + Socket.IO sur http://localhost:${PORT}`);
});
