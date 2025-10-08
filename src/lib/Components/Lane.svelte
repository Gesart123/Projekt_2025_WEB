<script>
  import IssueCard from './IssueCard.svelte';
  import { issues, moveIssue, saveIssues } from '$lib/stores.js';
  import { derived } from 'svelte/store';

  export let title;
  export let laneKey;

  const laneIssues = derived(issues, $i => $i.filter(it => it.lane === laneKey));

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function handleDrop(ev) {
    const id = ev.dataTransfer.getData('text/plain');
    moveIssue(id, laneKey);
    saveIssues();

    if (laneKey === 'done') {
      new Notification('Issue abgeschlossen!', {
        body: 'Ein Issue wurde als Done markiert.'
      });
    }
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<section
  ondragover={allowDrop}
  ondrop={handleDrop}
  class="flex-1 bg-white rounded-2xl shadow p-4 min-w-[280px] flex flex-col"
>
  <h2 class="text-lg font-bold mb-2">{title}</h2>

  <div class="flex-1 flex flex-col gap-2 overflow-y-auto">
    {#each $laneIssues as issue (issue.id)}
      <IssueCard {issue} />
    {/each}
  </div>

  <p class="text-sm mt-2 text-gray-500">
    Story Points: {$laneIssues.reduce((a, b) => a + Number(b.storyPoints || 0), 0)}
  </p>
</section>
