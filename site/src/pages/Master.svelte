<script>
  import { allQuestions, weeks } from '../data/index.js';
  import { progress, shuffle } from '../lib/stores.js';
  import QuizRunner from '../components/QuizRunner.svelte';

  let count = 25;
  let source = 'both';
  let picked = weeks.map((w) => w.week);
  let onlyMistakes = false;
  let running = null;

  $: pool = allQuestions.filter((q) =>
    picked.includes(q.week) &&
    (source === 'both' || q.source === source) &&
    (!onlyMistakes || $progress[q.id]?.last === false));

  function start() { running = shuffle(pool).slice(0, Math.min(count, pool.length)); }
  function toggleAll() { picked = picked.length === weeks.length ? [] : weeks.map((w) => w.week); }
</script>

<h1>🎯 Master quiz</h1>

{#if !running}
  <p class="muted">Draws questions at random from the assignment questions and the revision quizzes. Your answers are saved in this browser so you can drill your mistakes later.</p>
  <section class="card setup">
    <label>Number of questions
      <input type="number" min="5" max={pool.length || 5} bind:value={count} />
    </label>

    <fieldset>
      <legend>Question source</legend>
      <label><input type="radio" bind:group={source} value="both" /> Both</label>
      <label><input type="radio" bind:group={source} value="assignment" /> Assignments only</label>
      <label><input type="radio" bind:group={source} value="revision" /> Revision quizzes only</label>
    </fieldset>

    <fieldset>
      <legend>Weeks <button class="link" on:click={toggleAll}>{picked.length === weeks.length ? 'none' : 'all'}</button></legend>
      <div class="weeks">
        {#each weeks as w}
          <label class="chip" class:on={picked.includes(w.week)}>
            <input type="checkbox" bind:group={picked} value={w.week} /> W{w.week}
          </label>
        {/each}
      </div>
    </fieldset>

    <label class="switch"><input type="checkbox" bind:checked={onlyMistakes} /> Only questions I got wrong last time</label>

    <p class="muted">{pool.length} questions available.</p>
    <button class="btn" on:click={start} disabled={!pool.length}>Start quiz</button>
  </section>
{:else}
  <QuizRunner questions={running} showMeta on:restart={() => (running = null)} />
{/if}
