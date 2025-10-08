<script>
  import { onMount } from 'svelte';
  export let serverCountry = null;
  let country = serverCountry || '...';

  async function fetchCountry() {
    try {
      const res = await fetch('https://ipapi.co/json/');
      if (!res.ok) return;
      const j = await res.json();
      country = j.country_name || j.country || country;
    } catch(e) { country = country || '—'; }
  }

  onMount(() => {
    if (!country || country === '...') fetchCountry();
  });
</script>

<header class="bg-gradient-to-r from-white to-sky-50 border-b border-slate-100 p-4">
  <div class="max-w-6xl mx-auto flex items-center justify-between">
    <div>
      <div class="text-2xl font-bold text-primary">La Vida</div>
      <div class="text-sm text-slate-500">Kanban Board</div>
    </div>
    <div class="text-sm text-slate-600">Standort: <strong class="text-slate-800">{country}</strong></div>
  </div>
</header>
