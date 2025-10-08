<script>
  import Brand from '$lib/components/Brand.svelte';
  import Lane from '$lib/components/Lane.svelte';
  import IssueDialog from '$lib/components/IssueDialog.svelte';
  import { lanes, issues, loadIssues, saveIssues } from '$lib/stores.js';
  import { onMount } from 'svelte';

  let showDialog = false;

  onMount(() => {
    loadIssues();
  });

  function openDialog() {
    showDialog = true;
  }

  function handleIssueCreated(issue) {
    issues.update(list => [...list, issue]);
    saveIssues();
    showDialog = false;
  }

  function exportCSV() {
    $issues; // triggers subscription
    const data = JSON.parse(localStorage.getItem('issues')) || [];
    const csv = [
      ['Title', 'Description', 'CreationDate', 'DueDate', 'StoryPoints', 'Priority', 'Lane'],
      ...data.map(i => [
        i.title, i.description, i.creationDate, i.dueDate, i.storyPoints, i.priority, i.lane
      ])
    ].map(r => r.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'issues.csv';
    a.click();
  }
</script>

<div class="min-h-screen bg-gray-100 flex flex-col">
  <Brand />

  <div class="flex justify-between items-center p-4">
    <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onclick={openDialog}>
      Neues Issue
    </button>
    <button class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700" onclick={exportCSV}>
      CSV Exportieren
    </button>
  </div>

  <div class="flex flex-1 gap-4 p-4 overflow-x-auto">
    {#each $lanes as ln (ln.key)}
      <Lane title={ln.title} laneKey={ln.key} />
    {/each}
  </div>

  {#if showDialog}
    <IssueDialog on:close={() => (showDialog = false)} on:create={handleIssueCreated} />
  {/if}
</div>
