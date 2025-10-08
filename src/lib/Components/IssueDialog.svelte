<script>
  import { createEventDispatcher } from 'svelte';
  import { uid } from '$lib/utils.js';
  const dispatch = createEventDispatcher();
  let dialog;

  export function open() { dialog && dialog.showModal(); }
  export function close() { dialog && dialog.close(); }

  let title = '', description = '', dueDate = '', storyPoints = 1, priority = 'Medium';

  function submit(e) {
    e.preventDefault();
    const item = {
      id: uid(),
      title: title.trim() || 'Untitled',
      description: description.trim(),
      creationDate: new Date().toISOString(),
      dueDate: dueDate || null,
      storyPoints: Number(storyPoints) || 0,
      priority,
      lane: 'Do'
    };
    dispatch('create', { detail: item });
    dispatch('created', item);
    title=''; description=''; dueDate=''; storyPoints=1; priority='Medium';
    close();
    window.dispatchEvent(new CustomEvent('kanban:changed'));
  }
</script>

<dialog bind:this={dialog} class="rounded-lg">
  <form class="p-6 space-y-4" onsubmit={submit}>
    <h3 class="text-xl font-semibold">Neues Issue</h3>
    <div>
      <!-- svelte-ignore a11y_label_has_associated_control -->
      <label class="block text-sm">Title</label>
      <input required bind:value={title} class="mt-1 w-full rounded-md border-gray-200 p-2" />
    </div>
    <div>
      <!-- svelte-ignore a11y_label_has_associated_control -->
      <label class="block text-sm">Description</label>
      <textarea bind:value={description} rows="4" class="mt-1 w-full rounded-md border-gray-200 p-2"></textarea>
    </div>
    <div class="grid grid-cols-3 gap-3">
      <div>
        <!-- svelte-ignore a11y_label_has_associated_control -->
        <label class="block text-sm">Due Date</label>
        <input type="datetime-local" bind:value={dueDate} class="mt-1 w-full rounded-md border-gray-200 p-2" />
      </div>
      <div>
        <!-- svelte-ignore a11y_label_has_associated_control -->
        <label class="block text-sm">Story Points</label>
        <input type="number" min="0" bind:value={storyPoints} class="mt-1 w-full rounded-md border-gray-200 p-2" />
      </div>
      <div>
        <!-- svelte-ignore a11y_label_has_associated_control -->
        <label class="block text-sm">Priority</label>
        <select bind:value={priority} class="mt-1 w-full rounded-md border-gray-200 p-2">
          <option>Low</option><option selected>Medium</option><option>High</option>
        </select>
      </div>
    </div>

    <div class="flex justify-end gap-3">
      <button type="button" onclick={close} class="px-4 py-2 rounded-md border">Abbrechen</button>
      <button type="submit" class="px-4 py-2 rounded-md bg-primary text-white">Erstellen</button>
    </div>
  </form>
</dialog>
