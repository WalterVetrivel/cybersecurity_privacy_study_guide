<script>
  import { weeks, assignments, revision } from '../data/index.js';
  import { progress } from '../lib/stores.js';

  $: stats = weeks.map((w) => {
    const qs = [...assignments, ...revision].filter((q) => q.week === w.week);
    const tried = qs.filter((q) => $progress[q.id]);
    return { ...w, total: qs.length, tried: tried.length, right: tried.filter((q) => $progress[q.id].last).length };
  });
  $: mistakes = Object.values($progress).filter((p) => p.last === false).length;

  function reset() {
    if (confirm('Clear all saved quiz progress in this browser?')) progress.set({});
  }
</script>

<h1>NPTEL Cyber Security & Privacy</h1>
<p class="lead">Revise all 12 weeks: topic summaries, every assignment question with an explained answer, revision quizzes, and a master quiz that mixes them all.</p>

<div class="row">
  <a class="btn" href="#/master">🎯 Start a master quiz</a>
  <a class="btn ghost" href="#/formulas">∑ Formula sheet</a>
  <a class="btn ghost" href="#/reference">📚 Standards & laws</a>
  <a class="btn ghost" href="#/acronyms">🔤 Acronyms</a>
  {#if mistakes}<a class="btn ghost" href="#/master">🔁 {mistakes} questions to retry</a>{/if}
</div>

<div class="grid weeks-grid">
  {#each stats as w}
    <a class="card weekcard" href="#/week/{w.week}">
      <span class="wk">Week {w.week}</span>
      <h3>{w.title}</h3>
      <div class="progress"><div style="width:{(w.tried / w.total) * 100}%"></div></div>
      <small class="muted">{w.tried}/{w.total} attempted{w.tried ? ` · ${w.right} correct` : ''}</small>
    </a>
  {/each}
</div>

<p class="muted small">{assignments.length} assignment questions · {revision.length} revision questions · progress is stored only in this browser. <button class="link" on:click={reset}>Reset progress</button></p>
