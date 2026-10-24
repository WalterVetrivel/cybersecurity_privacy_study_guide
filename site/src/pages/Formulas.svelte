<script>
  import formulas from '../data/formulas.js';
  import { weeks } from '../data/index.js';
  import FormulaCard from '../components/FormulaCard.svelte';

  const title = (n) => weeks.find((w) => w.week === n)?.title;
  $: groups = [...new Set(formulas.map((f) => f.week))].map((w) => ({ week: w, items: formulas.filter((f) => f.week === w) }));
</script>

<h1>∑ Formula sheet</h1>
<p class="muted">Every numeric formula used in the course. Click <b>ⓘ How it's derived</b> on any formula to see where it comes from and some worked example problems. Convert percentages to decimals before you calculate (40% → 0.40).</p>

{#each groups as g}
  <h2 class="fgroup"><a href="#/week/{g.week}/formulas">Week {g.week}</a> · {title(g.week)}</h2>
  {#each g.items as f (f.id)}<FormulaCard {f} />{/each}
{/each}
