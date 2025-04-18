import { io, type Socket } from "socket.io-client";
import { writable, type Writable } from "svelte/store";

export let pseudonym = writable("");
export let room = writable("");
export let socket: Socket;

export let players: Writable<{ [key: string]: string }> = writable({});

function addPlayer(idplayer: string, player: string) {
  players.update(p => {
    return { ...p, [idplayer]: player };
  });
  players.subscribe(v=>
  console.log(v)

  )
}

export function createSocket() {
  socket = io();

  socket.on("playerJoined", (player) => {
    let playerJSON = JSON.parse(player);
    addPlayer(playerJSON.id, playerJSON.name);
  });
}

export function createRoom() {
  socket.emit("createRoom", JSON.stringify({ game: "tictactoe" }));

  socket.on("roomCreated", (roomId) => {
    room.set(roomId);
    joinRoom();
  });
}

export function joinRoom() {
  room.subscribe((roomV) => {
    pseudonym.subscribe((pseudonymV) => {
      socket.emit(
        "joinRoom",
        JSON.stringify({ name: pseudonymV, roomId: roomV })
      );
    });
  });
}
