<script>
  // Readable reference table with an optional quick filter. Cells may contain HTML.
  export let spec;
  export let filterable = false;
  let q = '';
  $: rows = q ? spec.rows.filter((r) => r.join(' ').toLowerCase().includes(q.toLowerCase())) : spec.rows;
</script>

<div class="viz tablewrap">
  {#if filterable}<input class="filter" placeholder="Filter…" bind:value={q} />{/if}
  <div class="scroll">
    <table class="ref">
      <thead><tr>{#each spec.cols as c}<th>{c}</th>{/each}</tr></thead>
      <tbody>
        {#each rows as r}<tr>{#each r as cell, i}<td class:first={i === 0}>{@html cell}</td>{/each}</tr>{/each}
        {#if !rows.length}<tr><td colspan={spec.cols.length} class="muted">No matches</td></tr>{/if}
      </tbody>
    </table>
  </div>
</div>
