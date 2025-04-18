<script lang="ts">
  import { DialogService, type output } from "../../services/dialog.svelte";

  function confirm() {
    let retour: output = { cancelled: false, values: {} };
    for (let key in DialogService.input.values) {
      retour.values[key] = DialogService.input.values[key].value;
    }
    DialogService.promiseResolve(retour);
    DialogService.showDialog = false;
  }

  function modify(key: string, e: Event) {
    let newValue = (e.target as HTMLInputElement).value;

    let regex = DialogService.input.values[key].regex;

    if (!regex || regex.test(newValue)) {
      DialogService.input.values[key].value = newValue;
      DialogService.input.values[key].error = false;
    } else {
      DialogService.input.values[key].error = true;
    }
  }

  function cancel() {
    let retour: output = { cancelled: true, values: {} };
    DialogService.promiseResolve(retour);
    DialogService.showDialog = false;
  }
</script>

{#if DialogService.showDialog}
  <div
    class="fixed inset-0 bg-complementary-950/10 bg-opacity-30 flex justify-center items-center z-50"
  >
    <div class="bg-complementary-950 rounded-2xl p-6 shadow-md max-w-sm w-full">
      <h3 class="text-xl font-bold mb-4">{DialogService.input.title}</h3>
      <p class="text-complementary-850 mb-6">
        {DialogService.input.description}
      </p>

      {#each Object.keys(DialogService.input.values) as key}
        <label class="text-sm font-medium text-primary-200" for={key}
          >{DialogService.input.values[key].label}</label
        >
        {DialogService.input.values[key].error
          ? DialogService.input.values[key].errorMessage
          : ""}
        <input
          class="text-complementary-100 bg-main-900  w-full px-4 py-2 mb-6 text-sm outline-0 focus:border rounded-lg focus:border-main-800"
          id={key}
          bind:value={DialogService.input.values[key].value}
          type={DialogService.input.values[key].type}
        />
      {/each}

      <div class="flex justify-end gap-4">
        <button
          onclick={confirm}
          class="px-4 py-2 text-white bg-complementary-800 rounded-lg hover:bg-complementary-700 transition duration-150"
        >
          Confirm
        </button>
        <button
          onclick={cancel}
          class="px-4 py-2 text-complementary-50 bg-main-800 rounded-lg hover:bg-main-700 transition duration-150"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
{/if}
