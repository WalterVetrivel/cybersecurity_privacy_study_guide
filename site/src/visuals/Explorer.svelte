<script>
  // Generic click-to-explore diagram. layout: rings | pyramid | flow | timeline | grid
  // layout also: tiles
  // items: { label, sub?, detail (HTML) }
  export let spec;
  let sel = 0;
  $: items = spec.items;
  $: n = items.length;
  const hue = (i, n) => `hsl(${225 - (i * 170) / Math.max(n - 1, 1)} 70% 55%)`;
</script>

<div class="viz explorer l-{spec.layout}">
  {#if spec.layout === 'rings'}
    <svg viewBox="0 0 300 300" role="img" aria-label={spec.title}>
      {#each items as it, i}
        {@const r = 140 - i * (120 / n)}
        <circle cx="150" cy="150" {r} style="fill:{hue(i, n)}" class="ring" class:sel={sel === i}
          on:click={() => (sel = i)} role="presentation" />
      {/each}
      {#each items as it, i}
        {@const r = 140 - i * (120 / n)}
        <text x="150" y={i === n - 1 ? 155 : 150 - r + 18} text-anchor="middle" class="rl" on:click={() => (sel = i)} role="presentation">{it.label}</text>
      {/each}
    </svg>
  {:else if spec.layout === 'pyramid'}
    <svg viewBox="0 0 300 {n * 60 + 10}" role="img" aria-label={spec.title}>
      {#each items as it, i}
        {@const w1 = 40 + (i * 220) / n}
        {@const w2 = 40 + ((i + 1) * 220) / n}
        <polygon points="{150 - w1 / 2},{i * 60 + 5} {150 + w1 / 2},{i * 60 + 5} {150 + w2 / 2},{i * 60 + 61} {150 - w2 / 2},{i * 60 + 61}"
          style="fill:{hue(i, n)}" class="ring" class:sel={sel === i} on:click={() => (sel = i)} role="presentation" />
        <text x="150" y={i * 60 + 38} text-anchor="middle" class="rl" on:click={() => (sel = i)} role="presentation">{it.label}</text>
      {/each}
    </svg>
  {:else if spec.layout === 'grid'}
    <div class="g2" style="grid-template-columns: auto repeat({spec.cols.length}, 1fr)">
      <span></span>{#each spec.cols as c}<b class="gh">{c}</b>{/each}
      {#each spec.rows as r, ri}
        <b class="gh">{r}</b>
        {#each spec.cols as c, ci}
          {@const i = ri * spec.cols.length + ci}
          <button class="node" class:sel={sel === i} style="--c:{items[i].color || hue(i, n)}" on:click={() => (sel = i)}>
            {items[i].label}{#if items[i].sub}<small>{items[i].sub}</small>{/if}
          </button>
        {/each}
      {/each}
    </div>
  {:else if spec.layout === 'tiles'}
    <div class="tiles">
      {#each items as it, i}
        <button class="node" class:sel={sel === i} style="--c:{hue(i, n)}" on:click={() => (sel = i)}>{it.label}</button>
      {/each}
    </div>
  {:else}
    <div class="steps-row">
      {#each items as it, i}
        <button class="node" class:sel={sel === i} style="--c:{hue(i, n)}" on:click={() => (sel = i)}>
          {#if spec.layout === 'timeline'}<span class="yr">{it.sub}</span>{/if}
          {it.label}
          {#if spec.layout !== 'timeline' && it.sub}<small>{it.sub}</small>{/if}
        </button>
        {#if i < n - 1}<span class="arrow">{spec.layout === 'timeline' ? '—' : '→'}</span>{/if}
      {/each}
    </div>
  {/if}
  <div class="detail">
    <h4>{items[sel].label}{#if items[sel].sub && spec.layout !== 'flow'} <span class="muted">&nbsp;· {items[sel].sub}</span>{/if}</h4>
    <p>{@html items[sel].detail}</p>
    {#if spec.hint}<p class="muted small">{spec.hint}</p>{/if}
  </div>
</div>
