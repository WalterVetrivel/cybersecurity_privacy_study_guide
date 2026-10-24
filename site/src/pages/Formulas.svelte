<script>
  import formulas from '../data/formulas.js';
  import { weeks } from '../data/index.js';
  import FormulaCard from '../components/FormulaCard.svelte';
  import SideNav from '../components/SideNav.svelte';

  const title = (n) => weeks.find((w) => w.week === n)?.title;
  const groups = [...new Set(formulas.map((f) => f.week))].map((w) => ({ week: w, items: formulas.filter((f) => f.week === w) }));
  const navItems = groups.flatMap((g) => [
    { id: `fw-${g.week}`, label: `Week ${g.week} · ${title(g.week)}` },
    ...g.items.map((f) => ({ id: `f-${f.id}`, label: f.name, sub: true })),
  ]);
</script>

<h1>∑ Formula sheet</h1>
<p class="muted">Every numeric formula used in the course. Click <b>ⓘ How it's derived</b> on any formula to see where it comes from and some worked example problems. Convert percentages to decimals before you calculate (40% → 0.40).</p>

<div class="summary-wrap">
  <div>
    {#each groups as g}
      <h2 class="fgroup" id="fw-{g.week}"><a href="#/week/{g.week}/formulas">Week {g.week}</a> · {title(g.week)}</h2>
      {#each g.items as f (f.id)}<div id="f-{f.id}" class="anchor"><FormulaCard {f} /></div>{/each}
    {/each}
  </div>
  <SideNav items={navItems} title="Formulae" />
</div>
