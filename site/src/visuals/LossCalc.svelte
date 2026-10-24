<script>
  // Week 8 SLE → ALE → CBA calculator (₹), defaults from the assignment questions.
  let av = 1500000, ef = 40, aro = 2, alePost = 400000, acs = 300000;
  $: sle = av * ef / 100;
  $: ale = sle * aro;
  $: cba = ale - (alePost + acs);
  const inr = (x) => '₹' + Math.round(x).toLocaleString('en-IN');
</script>

<div class="viz calc">
  <div class="sliders inputs">
    <label>Asset value (AV) ₹ <input type="number" step="10000" bind:value={av} /></label>
    <label>Exposure factor (EF) % <input type="number" min="0" max="100" bind:value={ef} /></label>
    <label>ARO (times / year) <input type="number" step="0.1" min="0" bind:value={aro} /></label>
    <label>ALE after control ₹ <input type="number" step="10000" bind:value={alePost} /></label>
    <label>Annual cost of safeguard (ACS) ₹ <input type="number" step="10000" bind:value={acs} /></label>
  </div>
  <ol class="work">
    <li><code>SLE = AV × EF = {inr(av)} × {ef / 100} = {inr(sle)}</code></li>
    <li><code>ALE(prior) = SLE × ARO = {inr(sle)} × {aro} = {inr(ale)}</code></li>
    <li><code>CBA = {inr(ale)} − ({inr(alePost)} + {inr(acs)}) = {inr(cba)}</code></li>
  </ol>
  <p class={cba >= 0 ? 'ans' : 'bad'}>{cba >= 0 ? '✓ Positive CBA: the safeguard is worth it' : '✗ Negative CBA: the safeguard costs more than it saves'}</p>
</div>
