import type { Client } from "./Client";

export class Room {
  clients: { [id: string]: Client } = {};

  constructor(private adminId: string) {}

  joinRoom(id: string, nClient: Client) {

    nClient.socket.emit("roomJoined", JSON.stringify({id:id}));

    for (let client of Object.values(this.clients)) {
      client.socket.emit("playerJoined", JSON.stringify({id:id, name:nClient.name}));
      nClient.socket.emit("playerJoined", JSON.stringify({id:client.socket.id, name:client.name}));
    }

    this.clients[id] = nClient;

  }

  quitRoom(id: string) {
    delete this.clients[id];
  }

  isEmpty() {
    return Object.keys(this.clients).length == 0;
  }

  processEvent(msg: string): void {}
}
