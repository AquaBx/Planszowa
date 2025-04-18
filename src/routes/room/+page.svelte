<script lang="ts">
  import { goto } from "$app/navigation";
  import { players, pseudonym, room, socket } from "$lib/store.svelte";
  import { onMount } from "svelte";

  onMount(() => {
    if (socket === undefined) {
      goto("/");
    }
  });

  function copyClipboard() {
    navigator.clipboard.writeText($room).then(
      function () {
        console.log("Async: Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  }
</script>

<div class="h-full p-4 flex flex-col gap-4">
  <div class="flex gap-4 w-full justify-between items-center h-16">
    <h1 class="ml-8 text-3xl font-black">Planszowa</h1>
    <button
      onclick={copyClipboard}
      class="cursor-pointer transition-color ease-in-out duration-200 bg-complementary-600 text-complementary-50 p-4 rounded-xl hover:bg-complementary-700"
    >
      Room : {$room}
    </button>
  </div>
  <div class="flex gap-4 h-full justify-between flex-1">
    <div
      class="w-64 bg-main-900 h-full p-4 rounded-xl overflow-y-auto flex flex-col gap-4"
    >
      <h2 class="text-center text-xl font-bold">Players</h2>

      <p>{$pseudonym}</p>

      {#each Object.values($players) as player}
        <p>{player}</p>
      {/each}
    </div>
    <div
      class="flex flex-1 flex-wrap gap-4 h-full content-start justify-between overflow-auto"
    >
      <div class="size-32 bg-main-800 rounded-xl"></div>
      <div class="size-32 bg-main-800 rounded-xl"></div>
      <div class="size-32 bg-main-800 rounded-xl"></div>
      <div class="size-32 bg-main-800 rounded-xl"></div>
      <div class="size-32 bg-main-800 rounded-xl"></div>
      <div class="size-32 bg-main-800 rounded-xl"></div>
      <div class="size-32 bg-main-800 rounded-xl"></div>
      <div class="size-32 bg-main-800 rounded-xl"></div>
      <div class="size-32 bg-main-800 rounded-xl"></div>
      <div class="size-32 bg-main-800 rounded-xl"></div>
      <div class="size-32 bg-main-800 rounded-xl"></div>
      <div class="size-32 bg-main-800 rounded-xl"></div>
      <div class="size-32 bg-main-800 rounded-xl"></div>
      <div class="size-32 bg-main-800 rounded-xl"></div>
      <div class="size-32 bg-main-800 rounded-xl"></div>
      <div class="size-32 bg-main-800 rounded-xl"></div>
      <div class="size-32 bg-main-800 rounded-xl"></div>
      <div class="size-32 bg-main-800 rounded-xl"></div>
      <div class="size-32 bg-main-800 rounded-xl"></div>
      <div class="size-32 bg-main-800 rounded-xl"></div>
      <div class="size-32 bg-main-800 rounded-xl"></div>
      <div class="size-32 bg-main-800 rounded-xl"></div>
      <div class="size-32 bg-main-800 rounded-xl"></div>
      <div class="size-32 bg-main-800 rounded-xl"></div>
    </div>
  </div>
</div>
