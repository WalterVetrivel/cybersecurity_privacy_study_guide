<script>
  export let f;
  export let open = false;
</script>

<section class="card formula">
  <div class="fhead">
    <h3>{f.name}</h3>
    <button class="tip-btn" class:on={open} aria-expanded={open} on:click={() => (open = !open)}>
      ⓘ {open ? 'Hide' : "How it's derived"}
    </button>
  </div>
  <p class="fbig"><code>{f.f}</code></p>
  <p>{f.meaning}</p>
  <table class="terms">
    {#each f.terms as [sym, name, desc]}
      <tr><td><code>{sym}</code></td><td><b>{name}</b>{#if desc}<br /><span class="muted">{desc}</span>{/if}</td></tr>
    {/each}
  </table>

  {#if open}
    <div class="tip">
      <h4>How it's derived</h4>
      <p>{f.derive}</p>
      <h4>Example problems</h4>
      {#each f.examples as ex, i}
        <div class="ex">
          <p><b>Example {i + 1}.</b> {ex.p}</p>
          <ol>{#each ex.s as s}<li><code>{s}</code></li>{/each}</ol>
          <p class="ans">Answer: {ex.a}</p>
        </div>
      {/each}
    </div>
  {/if}
</section>
