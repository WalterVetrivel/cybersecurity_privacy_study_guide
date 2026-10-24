<script>
  // Right-hand "On this page" nav. items: [{ id, label, sub? }] where id is an element id on the page.
  export let items = [];
  export let title = 'On this page';
  export let compact = false; // letter grid (acronyms)

  let active = null;
  let clicked = null;
  let lockUntil = 0; // keep the clicked item highlighted while the smooth scroll runs

  function go(id) {
    clicked = id;
    active = id;
    lockUntil = Date.now() + 900;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  // The active item is the last one whose element has reached the top of the screen.
  function onScroll() {
    if (Date.now() < lockUntil) return;
    let a = items[0]?.id;
    for (const it of items) {
      const el = document.getElementById(it.id);
      if (el && el.getBoundingClientRect().top <= 120) a = it.id;
    }
    const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
    if (atBottom && clicked && items.findIndex((i) => i.id === clicked) > items.findIndex((i) => i.id === a)) a = clicked;
    active = a;
  }
  $: items, (active = items[0]?.id ?? null);
</script>

<svelte:window on:scroll={onScroll} />

<nav class="topicnav" class:compact aria-label={title}>
  <div class="navhead">{title}</div>
  {#each items as it (it.id)}
    <button class:active={active === it.id} class:sub={it.sub} on:click={() => go(it.id)}>{it.label}</button>
  {/each}
</nav>
