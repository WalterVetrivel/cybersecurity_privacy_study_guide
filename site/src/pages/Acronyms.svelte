<script>
  import acronyms from '../data/acronyms.js';
  import { weeks } from '../data/index.js';
  import SideNav from '../components/SideNav.svelte';

  let q = '';
  let wk = 0;
  const sorted = [...acronyms].sort((a, b) => a[0].localeCompare(b[0], 'en', { sensitivity: 'base' }));
  $: needle = q.trim().toLowerCase();
  $: rows = sorted.filter(([a, s, w, n]) => (!wk || w === wk) && (!needle || `${a} ${s} ${n}`.toLowerCase().includes(needle)));
  $: letters = [...new Set(rows.map((r) => r[0][0].toUpperCase()))];
  $: navItems = letters.map((L) => ({ id: `acr-${L}`, label: L }));
</script>

<h1>🔤 Acronyms</h1>
<p class="muted">{acronyms.length} acronyms from the lectures and assignments. Search by the letters or by any word in the full form.</p>

<div class="toolbar acr-tools">
  <input class="filter" placeholder="Search, e.g. ALE or recovery" bind:value={q} />
  <div class="chips">
    <button class:on={!wk} on:click={() => (wk = 0)}>All weeks</button>
    {#each weeks as w}<button class:on={wk === w.week} on:click={() => (wk = w.week)} title={w.title}>W{w.week}</button>{/each}
  </div>
</div>

<div class="summary-wrap">
  <div>
    {#each letters as L}
      <h2 class="fgroup" id="acr-{L}">{L}</h2>
      <table class="ref acr">
        {#each rows.filter((r) => r[0][0].toUpperCase() === L) as [a, s, w, n]}
          <tr>
            <td class="acr-a">{a}</td>
            <td><b>{s}</b>{#if n}<br /><span class="muted small">{n}</span>{/if}</td>
            <td class="acr-w"><a href="#/week/{w}">W{w}</a></td>
          </tr>
        {/each}
      </table>
    {:else}
      <p class="muted">No acronyms match.</p>
    {/each}
  </div>
  <SideNav items={navItems} title="Jump to letter" compact />
</div>
