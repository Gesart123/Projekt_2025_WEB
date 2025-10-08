import { format, parseISO, isAfter } from 'date-fns';

export function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export function formatDate(iso) {
  if (!iso) return '';
  try { return format(parseISO(iso), 'yyyy-MM-dd HH:mm'); }
  catch { return iso; }
}

export function isOverdue(iso) {
  if (!iso) return false;
  try { return isAfter(new Date(), parseISO(iso)); }
  catch { return false; }
}

export function toCSV(items) {
  const headers = ['id','title','description','creationDate','dueDate','storyPoints','priority','lane'];
  const rows = items.map(i => headers.map(h => `"${String(i[h] ?? '').replace(/"/g,'""')}"`).join(','));
  return [headers.join(','), ...rows].join('\n');
}

export function toICS(item) {
  const uidStr = `${item.id}@kanban`;
  const dtstamp = new Date().toISOString().replace(/[-:]/g,'').split('.')[0] + 'Z';
  const dtstart = item.dueDate ? item.dueDate.replace(/[-:]/g,'').split('.')[0] + 'Z' : dtstamp;
  const esc = s => (s || '').replace(/\n/g,'\\n').replace(/,/g,'\\,');
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//la-vida-kanban//EN',
    'BEGIN:VEVENT',
    `UID:${uidStr}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${dtstart}`,
    `SUMMARY:${esc(item.title)}`,
    `DESCRIPTION:${esc(item.description || '')}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\n');
}
