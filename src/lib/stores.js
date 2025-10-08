import { writable, derived } from 'svelte/store';
import { uid as gen } from './utils.js';

const KEY = 'lv_kanban_v1';

export const lanes = [
  { key: 'Do', title: 'Do' },
  { key: 'Doing', title: 'Doing' },
  { key: 'Done', title: 'Done' },
  { key: 'Archive', title: 'Archiv' }
];

function loadFromLocal() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch { return []; }
}

function persist(list) {
  try { localStorage.setItem(KEY, JSON.stringify(list)); } catch(e) { console.error(e); }
}

function createItems() {
  const { subscribe, set, update } = writable(loadFromLocal());

  subscribe(v => persist(v));

  return {
    subscribe,
    set,
    update,
    add(item) { update(list => [...list, item]); },
    remove(id) { update(list => list.filter(i => i.id !== id)); },
    updateItem(id, patch) { update(list => list.map(i => i.id === id ? {...i, ...patch} : i)); },
    move(id, toLane) { update(list => list.map(i => i.id === id ? {...i, lane: toLane} : i)); }
  };
}

export const items = createItems();

export const storyPointsPerLane = derived(items, $items => {
  const sums = {}; lanes.forEach(l => sums[l.key] = 0);
  $items.forEach(i => { const sp = Number(i.storyPoints) || 0; if (sums[i.lane] !== undefined) sums[i.lane] += sp; });
  return sums;
});

export function addDemoIfEmpty() {
  const current = loadFromLocal();
  if (current.length === 0) {
    const now = new Date().toISOString();
    const demo = [
      { id: gen(), title: 'Konzept erstellen', description: 'CI + Layout', creationDate: now, dueDate: null, storyPoints: 3, priority: 'Medium', lane: 'Do' },
      { id: gen(), title: 'Menu-Fotos', description: 'Fotoshoot', creationDate: now, dueDate: null, storyPoints: 5, priority: 'High', lane: 'Doing' }
    ];
    localStorage.setItem(KEY, JSON.stringify(demo));
    items.set(demo);
  }
}
