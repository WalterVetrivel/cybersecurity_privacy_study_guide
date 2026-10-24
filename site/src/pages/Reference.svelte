<script>
  import references from '../data/references.js';
  import Table from '../visuals/Table.svelte';
  import Visual from '../visuals/Visual.svelte';
  import { visuals } from '../data/visuals.js';
  let tab = references[0].id;
  $: t = references.find((r) => r.id === tab);
</script>

<h1>📚 Standards, laws & frameworks</h1>
<p class="muted">Every ISO standard, framework, law and act mentioned in the course, in one place. Use the filter to search.</p>
<div class="tabs">
  {#each references as r}<button class:active={tab === r.id} on:click={() => (tab = r.id)}>{r.title} ({r.rows.length})</button>{/each}
  <button class:active={tab === 'compare'} on:click={() => (tab = 'compare')}>Comparisons</button>
</div>
{#if t}
  <p class="muted">{t.intro}</p>
  {#key tab}<Table spec={t} filterable />{/key}
{:else}
  {#each ['frameworks', 'gdprVsDpdp', 'stakeholders', 'regTimeline', 'indiaTimeline'] as id}<Visual spec={visuals[id]} />{/each}
{/if}
