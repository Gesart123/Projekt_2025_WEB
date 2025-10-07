<script>
    export let country = '—';
    </script>
    
    
    <header class="brand">
    <div class="title">
    <div class="logo">La Vida</div>
    <div class="subtitle">Kanban</div>
    </div>
    <div class="country">{country}</div>
    </header>
    
    
    <style>
    .brand{display:flex;justify-content:space-between;align-items:center;padding:1rem;border-bottom:1px solid rgba(0,0,0,0.06);background:linear-gradient(90deg,#ffffff,#f7fbff)}
    .logo{font-weight:700;font-size:1.1rem}
    .subtitle{font-size:0.9rem;color:#666}
    .country{font-size:0.9rem;color:#333}
    </style>