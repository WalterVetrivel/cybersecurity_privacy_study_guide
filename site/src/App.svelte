<script>
  import { route } from './lib/stores.js';
  import { weeks } from './data/index.js';
  import Home from './pages/Home.svelte';
  import Week from './pages/Week.svelte';
  import Master from './pages/Master.svelte';
  import Formulas from './pages/Formulas.svelte';
  import Reference from './pages/Reference.svelte';
  import Acronyms from './pages/Acronyms.svelte';
  import { theme, motion } from './lib/stores.js';
  import { fade, fly } from 'svelte/transition';

  let menuOpen = false;
  $: page = $route[0] || 'home';
  $: weekNo = +($route[1] || 1);
  $: route, (menuOpen = false);

  // A short loader when moving to a different page or week (not when switching tabs).
  $: viewKey = page === 'week' ? `week-${weekNo}` : page;
  let shownKey = null;
  let loading = false;
  let timer;
  $: if (viewKey !== shownKey) {
    if (shownKey !== null && motion) {
      loading = true;
      clearTimeout(timer);
      timer = setTimeout(() => (loading = false), 280);
    }
    shownKey = viewKey;
  }
  $: dur = motion ? 1 : 0;
</script>

<div class="layout">
  <aside class:open={menuOpen}>
    <div class="brandrow">
      <a class="brand" href="#/">🔐 CS&P Exam Prep</a>
      <button class="themebtn" on:click={() => theme.set($theme === 'dark' ? 'light' : 'dark')}
        title="Switch to {$theme === 'dark' ? 'light' : 'dark'} mode" aria-label="Switch to {$theme === 'dark' ? 'light' : 'dark'} mode">
        {$theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </div>
    <nav>
      <a href="#/" class:active={page === 'home'}>Home</a>
      <a href="#/master" class:active={page === 'master'}>🎯 Master quiz</a>
      <a href="#/formulas" class:active={page === 'formulas'}>∑ Formula sheet</a>
      <a href="#/reference" class:active={page === 'reference'}>📚 Standards & laws</a>
      <a href="#/acronyms" class:active={page === 'acronyms'}>🔤 Acronyms</a>
      <div class="navhead">Weeks</div>
      {#each weeks as w}
        <a href="#/week/{w.week}" class:active={page === 'week' && weekNo === w.week}>
          <span class="wk">W{w.week}</span> {w.title}
        </a>
      {/each}
    </nav>
  </aside>

  {#if menuOpen}<div class="backdrop" transition:fade={{ duration: 150 * dur }} on:click={() => (menuOpen = false)} aria-hidden="true" />{/if}

  <main>
    <div class="topbar">
      <button class="menu" on:click={() => (menuOpen = !menuOpen)} aria-label="Open menu">☰</button>
      <a class="topbrand" href="#/">🔐 CS&P Exam Prep</a>
      <button class="themebtn" on:click={() => theme.set($theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">{$theme === 'dark' ? '☀️' : '🌙'}</button>
    </div>
    {#if loading}
      <div class="loader" aria-label="Loading"><span class="spinner" /></div>
    {:else}
    {#key viewKey}
    <div class="view" in:fly={{ y: 14, duration: 260 * dur }}>
    {#if page === 'week'}
      <Week week={weeks.find((w) => w.week === weekNo) || weeks[0]} tab={$route[2] || 'assignment'} />
    {:else if page === 'master'}
      <Master />
    {:else if page === 'acronyms'}
      <Acronyms />
    {:else if page === 'reference'}
      <Reference />
    {:else if page === 'formulas'}
      <Formulas />
    {:else}
      <Home />
    {/if}
    </div>
    {/key}
    {/if}
  </main>
</div>
