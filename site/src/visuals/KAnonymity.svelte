<script>
  // Toggle suppression/generalisation and watch k (the smallest group of identical quasi-identifiers) change.
  const data = [
    ['Arun', 34, '600036', 'M', 'Diabetes'], ['Bala', 37, '600036', 'M', 'Flu'],
    ['Chitra', 29, '600041', 'F', 'Asthma'], ['Divya', 26, '600042', 'F', 'Flu'],
    ['Ezhil', 31, '600036', 'M', 'Cancer'], ['Fathima', 22, '600041', 'F', 'Diabetes'],
  ];
  let supName = false, genAge = false, genZip = false;
  const age = (a, on) => (on ? `${Math.floor(a / 10) * 10}–${Math.floor(a / 10) * 10 + 9}` : a);
  const zip = (z, on) => (on ? z.slice(0, 4) + '**' : z);
  $: rows = data.map(([n, a, z, g, d]) => [supName ? '*' : n, age(a, genAge), zip(z, genZip), g, d]);
  $: k = (() => {
    const qi = rows.map((r) => (supName ? '' : r[0]) + '|' + r[1] + '|' + r[2] + '|' + r[3]);
    const counts = {}; qi.forEach((x) => (counts[x] = (counts[x] || 0) + 1));
    return Math.min(...Object.values(counts));
  })();
</script>

<div class="viz calc">
  <div class="pick">
    <label class="switch"><input type="checkbox" bind:checked={supName} /> Suppress name</label>
    <label class="switch"><input type="checkbox" bind:checked={genAge} /> Generalise age</label>
    <label class="switch"><input type="checkbox" bind:checked={genZip} /> Generalise PIN code</label>
  </div>
  <div class="scroll"><table class="ref">
    <thead><tr><th>Name <small>(identifier)</small></th><th>Age</th><th>PIN</th><th>Gender</th><th>Disease <small>(sensitive)</small></th></tr></thead>
    <tbody>{#each rows as r}<tr>{#each r as c}<td>{c}</td>{/each}</tr>{/each}</tbody>
  </table></div>
  <p class={k >= 2 ? 'ans' : 'bad'}>This release is {k}-anonymous{k < 2 ? ': every person can be singled out' : ''}.</p>
  <p class="muted small">Age, PIN and gender are quasi-identifiers. k-anonymity needs each combination of quasi-identifiers to match at least k people. Turn on all three options to reach k = 3, then notice how much less useful the data has become (the R-U trade-off).</p>
</div>
