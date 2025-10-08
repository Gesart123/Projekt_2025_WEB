<script>
  import { onMount } from 'svelte';
  let country = '...';

  onMount(async () => {
    try {
      const res = await fetch('https://ipapi.co/json/');
      const data = await res.json();
      country = data.country_name || 'Unbekannt';
    } catch {
      country = 'Unbekannt';
    }
  });
</script>

<header class="bg-blue-600 text-white p-4 shadow flex justify-between items-center">
  <h1 class="text-2xl font-bold">Kanban Board</h1>
  <p class="text-sm">🌍 Land: {country}</p>
</header>
