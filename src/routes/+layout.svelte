<script lang="ts">
  import Modal from "$lib/components/modal.svelte";
  import "../app.css";

  let { children } = $props();
</script>

<div class="w-dvw h-dvh bg-main-950 grid place-items-center">
  {@render children()}
</div>
<Modal></Modal>
