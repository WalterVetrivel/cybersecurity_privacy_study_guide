<script>
  // Try the Caesar, Vigenère and XOR ciphers from Week 8.
  let mode = 'caesar', text = 'MEET ME AFTER THE TOGA PARTY', k = 3, key = 'IITM', decrypt = false;
  let bits = '00110101 01000101', kbits = '01010101 01010101';
  const shift = (ch, s) => String.fromCharCode(((ch.charCodeAt(0) - 65 + s) % 26 + 26) % 26 + 65);
  $: up = text.toUpperCase();
  $: caesar = up.replace(/[A-Z]/g, (c) => shift(c, decrypt ? -k : +k));
  $: vig = (() => {
    const kk = key.toUpperCase().replace(/[^A-Z]/g, '') || 'A';
    let i = 0;
    return up.replace(/[A-Z]/g, (c) => { const s = kk.charCodeAt(i++ % kk.length) - 65; return shift(c, decrypt ? -s : s); });
  })();
  $: xor = (() => {
    const a = bits.replace(/\s/g, ''), b = kbits.replace(/\s/g, '');
    if (!/^[01]*$/.test(a + b)) return 'Use only 0 and 1';
    return [...a].map((x, i) => (b[i % b.length] === x ? '0' : '1')).join('').replace(/(.{8})/g, '$1 ').trim();
  })();
</script>

<div class="viz calc">
  <div class="pick">
    <button class:on={mode === 'caesar'} on:click={() => (mode = 'caesar')}>Caesar</button>
    <button class:on={mode === 'vig'} on:click={() => (mode = 'vig')}>Vigenère</button>
    <button class:on={mode === 'xor'} on:click={() => (mode = 'xor')}>XOR</button>
    {#if mode !== 'xor'}<label class="switch"><input type="checkbox" bind:checked={decrypt} /> decrypt</label>{/if}
  </div>
  {#if mode === 'xor'}
    <label class="full">Message bits <input bind:value={bits} /></label>
    <label class="full">Key bits <input bind:value={kbits} /></label>
    <p>Ciphertext: <code>{xor}</code></p>
    <p class="muted small">Same bits → 0, different bits → 1. XOR again with the same key to decrypt.</p>
  {:else}
    <label class="full">Text <input bind:value={text} /></label>
    {#if mode === 'caesar'}
      <label class="sl">Shift k = {k} <input type="range" min="1" max="25" bind:value={k} /></label>
      <p>Result: <code>{caesar}</code></p>
      <p class="muted small">c = (p + k) mod 26. Caesar used k = 3.</p>
    {:else}
      <label class="full">Keyword <input bind:value={key} /></label>
      <p>Result: <code>{vig}</code></p>
      <p class="muted small">Each key letter is its own Caesar shift (A=0 … Z=25), repeated along the message. Try text DOMS with key IITM.</p>
    {/if}
  {/if}
</div>
