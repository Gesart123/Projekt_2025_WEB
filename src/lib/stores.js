import { writable } from 'svelte/store';

export const lanes = writable([
  { key: 'do', title: 'To Do' },
  { key: 'doing', title: 'Doing' },
  { key: 'done', title: 'Done' },
  { key: 'archiv', title: 'Archiv' }
]);

export const issues = writable([]);

export function loadIssues() {
  const stored = localStorage.getItem('issues');
  if (stored) issues.set(JSON.parse(stored));
}

export function saveIssues() {
  issues.subscribe(value => {
    localStorage.setItem('issues', JSON.stringify(value));
  })();
}

export function moveIssue(id, newLane) {
  issues.update(list =>
    list.map(i => (i.id === id ? { ...i, lane: newLane } : i))
  );
}
