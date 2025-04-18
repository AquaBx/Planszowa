import type { Socket } from "socket.io";

export class Client {
  constructor(public name: String, public socket: Socket) {}
}
