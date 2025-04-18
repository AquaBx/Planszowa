<script lang="ts">
  import { goto } from "$app/navigation";
  import {
    pseudonym,
    createRoom,
    room,
    createSocket,
    joinRoom,
  } from "$lib/store.svelte";

  function create(e: SubmitEvent) {
    e.preventDefault();
    createSocket();
    createRoom();
    goto("/room");
  }

  function join(e: SubmitEvent) {
    e.preventDefault();
    createSocket();
    joinRoom();
    goto("/room");
  }
</script>

<div class="flex flex-col gap-8 ">
  <h1 class="text-center text-3xl font-black">Planszowa</h1>
  <div class="flex gap-8 p-8 rounded-2xl bg-main-900 border-1 border-main-900">
    <form class="flex-1" onsubmit={create}>
      <h2 class="text-center text-xl mb-8">Create a game</h2>
      <input
        placeholder="Pseudonym"
        name="pseudonym"
        bind:value={$pseudonym}
        required
        class="text-main-100 bg-main-900 w-full px-4 py-2 mb-6 text-sm outline-0 focus:border rounded-lg focus:border-main-800"
      />
      <button
        type="submit"
        class="w-full px-4 py-2 text-complementary-50 bg-complementary-800 rounded-lg hover:bg-complementary-700 transition duration-150"
        >Join</button
      >
    </form>
    <div class="border-1 border-main-800"></div>
    <form class="flex-1" onsubmit={join}>
      <h2 class="text-center text-xl mb-8">Join a game</h2>
      <input
        placeholder="Pseudonym"
        required
        bind:value={$pseudonym}
        name="pseudonym"
        class="text-main-100 bg-main-900 w-full px-4 py-2 mb-6 text-sm outline-0 focus:border rounded-lg focus:border-main-800"
      />
      <input
        placeholder="RoomId"
        bind:value={$room}
        required
        class="text-main-100 bg-main-900 w-full px-4 py-2 mb-6 text-sm outline-0 focus:border rounded-lg focus:border-main-800"
      />
      <button
        type="submit"
        class="w-full px-4 py-2 text-complementary-50 bg-complementary-800 rounded-lg hover:bg-complementary-700 transition duration-150"
        >Join</button
      >
    </form>
  </div>
</div>
