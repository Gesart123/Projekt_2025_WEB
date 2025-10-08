<script>
  import IssueCard from './IssueCard.svelte';
  import { items, moveItem, storyPointsPerLane } from '$lib/stores.js';
  import { derived, get } from 'svelte/store';

  export let title;
  export let laneKey;

  const laneItems = derived(items, $items => $items.filter(i => i.lane === laneKey));
  const sumSP = derived(items, $items => $items.filter(i => i.lane === laneKey).reduce((s,i) => s + (Number(i.storyPoints)||0), 0));

  function ondragover(e) { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; }
  function ondrop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    if (!id) return;
    const prev = get(items).find(it => it.id === id);
    items.update(list => list.map(it => it.id === id ? {...it, lane: laneKey} : it));
    window.dispatchEvent(new CustomEvent('kanban:changed'));
    // notification when moved to Done
    if (laneKey === 'Done' && prev?.lane !== 'Done') {
      if ('Notification' in window) {
        if (Notification.permission === 'granted') new Notification('✅ Task erledigt', { body: prev.title });
        else if (Notification.permission !== 'denied') Notification.requestPermission().then(p => { if (p === 'granted') new Notification('✅ Task erledigt', { body: prev.title }); });
      }
    }
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<section class="flex-1 bg-white rounded-2xl shadow p-4 min-w-[240px] flex flex-col" ondragover={ondragover} ondrop={ondrop}>
  <header class="flex items-center justify-between mb-3">
    <h3 class="text-lg font-semibold">{title}</h3>
    <div class="text-sm text-slate-500">{$sumSP} SP</div>
  </header>

  <div class="flex-1 flex flex-col gap-3 overflow-auto">
    {#each $laneItems as issue (issue.id)}
    <IssueCard item={issue} />
    {/each}

  </div>
</section>
