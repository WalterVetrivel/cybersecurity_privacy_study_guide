<script>
  import { createEventDispatcher } from 'svelte';
  import { record } from '../lib/stores.js';

  export let q;
  export let label = '';
  export let reveal = false; // review mode: show the answer straight away
  export let showMeta = false; // show week/source tags (master quiz)

  const dispatch = createEventDispatcher();
  let picked = [];
  let submitted = false;

  $: done = submitted || reveal;
  $: isRight = submitted && picked.length === q.answer.length && picked.every((i) => q.answer.includes(i));

  // Reset when a different question is shown in the same slot
  let lastId = q.id;
  $: if (q.id !== lastId) { lastId = q.id; picked = []; submitted = false; }

  function choose(i) {
    if (done) return;
    if (q.multi) picked = picked.includes(i) ? picked.filter((x) => x !== i) : [...picked, i];
    else { picked = [i]; submit(); }
  }

  function submit() {
    if (!picked.length) return;
    submitted = true;
    const ok = picked.length === q.answer.length && picked.every((i) => q.answer.includes(i));
    record(q.id, ok);
    dispatch('answered', { correct: ok });
  }

  function cls(i) {
    if (!done) return picked.includes(i) ? 'opt picked' : 'opt';
    if (q.answer.includes(i)) return 'opt right';
    if (picked.includes(i)) return 'opt wrong';
    return 'opt dim';
  }
</script>

<article class="card q">
  <header>
    {#if label}<span class="qnum">{label}</span>{/if}
    {#if showMeta}
      <span class="tag">Week {q.week}</span>
      <span class="tag {q.source}">{q.source === 'assignment' ? 'Assignment' : 'Revision'}</span>
    {/if}
    {#if q.multi}<span class="tag multi">Select all that apply</span>{/if}
  </header>

  {#if q.note}<p class="note">⚠ {q.note}</p>{/if}
  <h3>{q.q}</h3>
  {#if q.stmt}<div class="stmt">{@html q.stmt}</div>{/if}
  {#if q.qfig === 'ddos'}
    <svg viewBox="0 0 340 170" class="fig qfig" role="img" aria-label="Three compromised systems sending traffic through the internet to one target server">
      {#each [30, 85, 140] as y}
        <rect x="10" y={y - 18} width="54" height="32" rx="4" class="dev" /><text x="37" y={y + 3} text-anchor="middle" class="skull">☠</text>
        <text x="37" y={y + 26} text-anchor="middle" class="cap">Compromised</text>
        <line x1="70" y1={y} x2="140" y2={85 + (y - 85) / 4} class="atk" marker-end="url(#ah)" />
      {/each}
      <ellipse cx="185" cy="85" rx="44" ry="28" class="cloud" /><text x="185" y="90" text-anchor="middle" class="lbl">Internet</text>
      <line x1="230" y1="85" x2="268" y2="85" class="atk solid" marker-end="url(#ah)" />
      <rect x="276" y="52" width="46" height="66" rx="5" class="srv" />
      {#each [64, 80, 96] as y}<rect x="283" y={y} width="32" height="8" rx="2" class="slot" />{/each}
      <text x="299" y="136" text-anchor="middle" class="cap">Target server</text>
      <defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" class="ahead" /></marker></defs>
    </svg>
  {:else if q.qfig === 'cer-q'}
    <svg viewBox="0 0 320 180" class="fig qfig" role="img" aria-label="Two curves against sensitivity: curve 1 falls from 100% to 0, curve 2 rises from 0 to 100%, crossing at point 3">
      <line x1="40" y1="150" x2="300" y2="150" class="axis" />
      <line x1="40" y1="150" x2="40" y2="15" class="axis" />
      <path d="M45 25 C 120 60, 160 120, 295 140" class="c1" />
      <path d="M45 140 C 180 120, 220 60, 295 25" class="c2" />
      <circle cx="166" cy="107" r="5" class="pt" />
      <text x="282" y="160" class="num">1</text><text x="282" y="20" class="num">2</text><text x="176" y="124" class="num">3</text>
      <text x="120" y="172">Sensitivity (%) →</text>
      <text x="6" y="90" transform="rotate(-90 12 90)">Percentage (%)</text>
    </svg>
  {/if}

  <ul class="opts">
    {#each q.options as o, i}
      <li>
        <button class={cls(i)} on:click={() => choose(i)} disabled={done}>
          <span class="mark">{q.multi ? (picked.includes(i) ? '☑' : '☐') : String.fromCharCode(65 + i)}</span>
          <span>{o}</span>
        </button>
      </li>
    {/each}
  </ul>

  {#if q.multi && !done}
    <button class="btn" on:click={submit} disabled={!picked.length}>Check answer</button>
  {/if}

  {#if !done}
    <button class="link" on:click={() => (reveal = true)}>Show answer</button>
  {:else}
    <div class="expl">
      {#if submitted}
        <p class={isRight ? 'verdict ok' : 'verdict bad'}>{isRight ? '✓ Correct' : '✗ Not quite'}</p>
      {/if}
      <p><b>Answer:</b> {q.answer.map((i) => q.options[i]).join('; ')}</p>
      {#if q.e}<p>{@html q.e}</p>{/if}
      {#if q.fig === 'cer'}
        <svg viewBox="0 0 320 180" class="fig" role="img" aria-label="FAR and FRR curves crossing at the CER">
          <line x1="40" y1="150" x2="300" y2="150" class="axis" />
          <line x1="40" y1="150" x2="40" y2="15" class="axis" />
          <path d="M45 25 C 120 60, 160 120, 295 140" class="c1" />
          <path d="M45 140 C 180 120, 220 60, 295 25" class="c2" />
          <circle cx="166" cy="107" r="5" class="pt" />
          <text x="60" y="30">1 · FAR</text><text x="240" y="30">2 · FRR</text>
          <text x="150" y="128">3 · CER</text>
          <text x="120" y="172">Sensitivity / strictness →</text>
          <text x="6" y="90" transform="rotate(-90 12 90)">Error rate</text>
        </svg>
      {/if}
      {#if q.steps}
        <div class="steps">
          <b>Steps & formulae</b>
          <ol>{#each q.steps as s}<li><code>{s}</code></li>{/each}</ol>
        </div>
      {/if}
    </div>
  {/if}
</article>
