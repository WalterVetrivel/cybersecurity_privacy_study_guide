<script>
  import { assignments, revision } from '../data/index.js';
  import { progress, shuffle } from '../lib/stores.js';
  import Question from '../components/Question.svelte';
  import QuizRunner from '../components/QuizRunner.svelte';
  import Visual from '../visuals/Visual.svelte';
  import { visuals, weekVisuals } from '../data/visuals.js';
  import { weeks } from '../data/index.js';
  import { motion } from '../lib/stores.js';
  import { fly } from 'svelte/transition';
  import formulas from '../data/formulas.js';
  import FormulaCard from '../components/FormulaCard.svelte';
  import SideNav from '../components/SideNav.svelte';
  
  export let week;
  export let tab = 'assignment';

  let reviewAll = false;
  let runKey = 0;
  $: aq = assignments.filter((q) => q.week === week.week);
  $: rq = revision.filter((q) => q.week === week.week);
  $: quizSet = (runKey, shuffle(rq));
  $: done = aq.filter((q) => $progress[q.id]).length;
  $: right = aq.filter((q) => $progress[q.id]?.last).length;
  $: vis = (weekVisuals[week.week] || []).map((id) => visuals[id]);
  $: next = weeks.find((w) => w.week === week.week + 1);
  $: wf = formulas.filter((f) => f.week === week.week);
  // Weeks without full formula cards fall back to the short list in weeks.js.
  $: extraF = wf.length ? [] : week.formulas || [];

  const topicId = (i) => `topic-${week.week}-${i}`;
  $: navItems = week.topics.map((t, i) => ({ id: topicId(i), label: t.title }));
</script>

<h1><span class="wk big">Week {week.week}</span> {week.title}</h1>
<p class="muted">Source: {week.source}</p>

<div class="tabs">
  <a href="#/week/{week.week}/assignment" class:active={tab === 'assignment'}>📝 Assignment ({aq.length})</a>
  <a href="#/week/{week.week}/summary" class:active={tab === 'summary'}>📘 Summary</a>
  {#if vis.length}<a href="#/week/{week.week}/diagrams" class:active={tab === 'diagrams'}>📊 Diagrams ({vis.length})</a>{/if}
  {#if wf.length || extraF.length}<a href="#/week/{week.week}/formulas" class:active={tab === 'formulas'}>∑ Formulae ({wf.length + extraF.length})</a>{/if}
  <a href="#/week/{week.week}/revision" class:active={tab === 'revision'}>⚡ Revision quiz ({rq.length})</a>
</div>

{#key tab}
<div class="tabbody" in:fly={{ y: 10, duration: motion ? 220 : 0 }}>
{#if tab === 'summary'}
  <div class="summary-wrap">
    <div class="topics">
      {#each week.topics as t, i}
        <section class="card topic" id={topicId(i)} data-i={i}>
          <h2>{t.title}</h2>
          <ul>{#each t.points as p}<li>{@html p}</li>{/each}</ul>
        </section>
      {/each}
      <div class="row">
        {#if vis.length}<a class="btn ghost" href="#/week/{week.week}/diagrams">📊 Diagrams & calculators →</a>{/if}
        {#if wf.length || extraF.length}<a class="btn ghost" href="#/week/{week.week}/formulas">∑ Formulae →</a>{/if}
        <a class="btn" href="#/week/{week.week}/assignment">Revise assignment questions →</a>
        <a class="btn ghost" href="#/week/{week.week}/revision">Take the revision quiz →</a>
      </div>
    </div>
    <SideNav items={navItems} />
  </div>
{:else if tab === 'diagrams'}
  <p class="muted">Click, drag and type in the diagrams below to explore this week's concepts.</p>
  {#each vis as v}<Visual spec={v} />{/each}
  <div class="row nextrow">
    {#if wf.length || extraF.length}<a class="btn ghost" href="#/week/{week.week}/formulas">∑ Week {week.week} formulae</a>{/if}
    <a class="btn" href="#/week/{week.week}/assignment">Revise assignment questions →</a>
  </div>
{:else if tab === 'formulas'}
  <p class="muted">Each formula with what its terms mean. The derivation and worked examples are open below; the <a href="#/formulas">formula sheet</a> has every week's formulae together.</p>
  {#each wf as f (f.id)}<FormulaCard {f} open={true} />{/each}
  {#if extraF.length}
    <section class="card formulas">
      <h2>Also this week</h2>
      {#each extraF as f}<p><b>{f.name}:</b> <code>{f.f}</code></p>{/each}
    </section>
  {/if}
  <div class="row nextrow">
    <a class="btn" href="#/week/{week.week}/assignment">Revise assignment questions →</a>
    <a class="btn ghost" href="#/week/{week.week}/revision">Take the revision quiz →</a>
  </div>
{:else if tab === 'assignment'}
  <div class="toolbar">
    <label class="switch"><input type="checkbox" bind:checked={reviewAll} /> Show all answers & explanations</label>
    <span class="muted">Attempted {done}/{aq.length} · last attempt correct {right}</span>
  </div>
  {#key reviewAll}
    {#each aq as q (q.id)}
      <Question {q} label={`Q${q.n}`} reveal={reviewAll} />
    {/each}
  {/key}
  <div class="row nextrow">
    <a class="btn ghost" href="#/week/{week.week}/revision">⚡ Week {week.week} revision quiz</a>
    {#if next}<a class="btn" href="#/week/{next.week}/assignment">Next: Week {next.week} assignment →</a>
    {:else}<a class="btn" href="#/master">🎯 Take the master quiz →</a>{/if}
  </div>
{:else}
  {#key runKey}
    <QuizRunner questions={quizSet} on:restart={() => runKey++} />
  {/key}
  <div class="row nextrow">
    {#if next}<a class="btn" href="#/week/{next.week}/revision">Next: Week {next.week} quiz →</a>
    {:else}<a class="btn" href="#/master">🎯 Take the master quiz →</a>{/if}
    {#if week.week > 1}<a class="btn ghost" href="#/week/{week.week - 1}/revision">← Week {week.week - 1} quiz</a>{/if}
  </div>
{/if}
</div>
{/key}
