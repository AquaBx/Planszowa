import type { ViteDevServer } from "vite";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import { Room } from "./Room";
import { Client } from "./Client";

let rooms: { [id: string]: Room } = {};
let roomOfClient: { [id: string]: string } = {};

export const webSocketServer = {
  name: "websocket",
  configureServer(server: ViteDevServer) {
    if (!server.httpServer) return;

    const io = new Server(server.httpServer);

    io.on("connection", (socket) => {
      socket.emit("eventFromServer", "✅ Connected");
      roomOfClient[socket.id] = socket.id;

      socket.conn.on("close", (reason) => {
        let socketId = socket.id;
        let roomId = roomOfClient[socketId];
        let room = rooms[roomId];

		if (room === undefined) { return }

        room.quitRoom(socketId);
        if (room.isEmpty()) {
          delete rooms[roomId];
        }
        delete roomOfClient[socketId];
      });

      socket.on("event", (msg) => {
        let roomId = roomOfClient[socket.id];
        rooms[roomId].processEvent(msg);
      });

      socket.on("createRoom", (msg) => {
        let roomId = uuidv4();
        rooms[roomId] = new Room(socket.id);
        socket.emit("roomCreated", roomId);
      });

      socket.on("joinRoom", (msg) => {
        let msgJson = JSON.parse(msg);
        let roomId = msgJson.roomId;
        let socketId = socket.id;

        let client = new Client(msgJson.name, socket);
        roomOfClient[socketId] = roomId;
        rooms[roomId].joinRoom(socketId, client);
      });
    });
  },
};
