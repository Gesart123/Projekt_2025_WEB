<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let title = '';
  let description = '';
  let dueDate = '';
  let storyPoints = 1;
  let priority = 'medium';

  function createIssue() {
    const issue = {
      id: crypto.randomUUID(),
      title,
      description,
      creationDate: new Date().toISOString(),
      dueDate,
      storyPoints,
      priority,
      lane: 'do'
    };
    dispatch('create', issue);
  }
</script>

<dialog open class="bg-white rounded-2xl shadow-lg w-96 p-6">
  <h2 class="text-xl font-bold mb-4">Neues Issue</h2>
  <input class="w-full border rounded p-2 mb-2" placeholder="Titel" bind:value={title} />
  <textarea class="w-full border rounded p-2 mb-2" placeholder="Beschreibung" bind:value={description}></textarea>
  <input type="date" class="w-full border rounded p-2 mb-2" bind:value={dueDate} />
  <input type="number" min="1" class="w-full border rounded p-2 mb-2" placeholder="Story Points" bind:value={storyPoints} />
  <select class="w-full border rounded p-2 mb-4" bind:value={priority}>
    <option value="low">Niedrig</option>
    <option value="medium">Mittel</option>
    <option value="high">Hoch</option>
  </select>

  <div class="flex justify-end gap-2">
    <button onclick={() => dispatch('close')} class="px-4 py-2 bg-gray-200 rounded">Abbrechen</button>
    <button onclick={createIssue} class="px-4 py-2 bg-blue-600 text-white rounded">Erstellen</button>
  </div>
</dialog>
