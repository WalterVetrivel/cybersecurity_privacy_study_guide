<script>
  import { createEventDispatcher } from 'svelte';
  import Question from './Question.svelte';

  export let questions = [];
  export let showMeta = false;

  const dispatch = createEventDispatcher();
  let idx = 0;
  let results = {}; // id -> correct
  let answered = false;

  $: q = questions[idx];
  $: score = Object.values(results).filter(Boolean).length;
  $: finished = idx >= questions.length;
  $: wrong = questions.filter((x) => results[x.id] === false);
  $: skipped = questions.filter((x) => !(x.id in results));

  function onAnswer(e) { results = { ...results, [q.id]: e.detail.correct }; answered = true; }
  function next() { idx += 1; answered = false; }
</script>

{#if !finished}
  <div class="runner-bar">
    <span>Question {idx + 1} of {questions.length}</span>
    <span>Score: {score}/{Object.keys(results).length}</span>
  </div>
  <div class="progress"><div style="width:{(idx / questions.length) * 100}%"></div></div>
  {#key q.id}
    <Question {q} {showMeta} on:answered={onAnswer} />
  {/key}
  <div class="row">
    <button class="btn" on:click={next}>{answered ? 'Next →' : 'Skip →'}</button>
    <button class="link" on:click={() => (idx = questions.length)}>Finish now</button>
  </div>
{:else}
  <section class="card result">
    <h2>Result: {score} / {questions.length - skipped.length} answered</h2>
    <p class="big">{Math.round((score / Math.max(questions.length - skipped.length, 1)) * 100)}%</p>
    <p>{wrong.length} wrong · {skipped.length} skipped</p>
    <div class="row">
      <button class="btn" on:click={() => dispatch('restart')}>New quiz</button>
    </div>
  </section>
  {#if wrong.length}
    <h3>Review what you missed</h3>
    {#each wrong as w, i (w.id)}
      <Question q={w} label={`#${i + 1}`} reveal {showMeta} />
    {/each}
  {/if}
{/if}
