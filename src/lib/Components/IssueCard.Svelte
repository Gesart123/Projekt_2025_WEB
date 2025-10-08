<script>
  import { format } from 'date-fns';
  export let issue;

  function drag(ev) {
    ev.dataTransfer.setData('text/plain', issue.id);
  }

  function exportICS() {
    const ics = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${issue.title}
DESCRIPTION:${issue.description}
DTSTART:${issue.dueDate.replace(/-/g, '')}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([ics], { type: 'text/calendar' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${issue.title}.ics`;
    a.click();
  }

  async function shareIssue() {
    if (navigator.share) {
      await navigator.share({
        title: issue.title,
        text: issue.description,
      });
    } else {
      alert('Web Share API nicht verfügbar');
    }
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  draggable="true"
  ondragstart={drag}
  class="bg-gray-50 border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition"
  class:expired={new Date(issue.dueDate) < new Date()}
>
  <h3 class="font-semibold text-blue-700">{issue.title}</h3>
  <p class="text-sm text-gray-600">{issue.description}</p>
  <p class="text-xs text-gray-400">
    Fällig: {format(new Date(issue.dueDate), 'dd.MM.yyyy')}
  </p>
  <div class="flex justify-between mt-2">
    <button onclick={exportICS} class="text-xs text-blue-600 hover:underline">ICS</button>
    <button onclick={shareIssue} class="text-xs text-blue-600 hover:underline">Teilen</button>
  </div>
</div>

<style>
  .expired {
    border-color: #ef4444;
    background-color: #fee2e2;
  }
</style>
