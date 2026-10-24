<script>
  // Week 6 relative risk calculator, defaults set to the lecture example.
  let likely = 10, success = 50, value = 50, lost = 80, mitig = 0, acc = 75;
  $: lf = (likely / 100) * (success / 100);
  $: lm = value * (lost / 100);
  $: base = lf * lm;
  $: afterCtl = base * (1 - mitig / 100);
  $: unc = afterCtl * (1 - acc / 100);
  $: risk = afterCtl + unc;
  const r = (x) => Math.round(x * 1000) / 1000;
</script>

<div class="viz calc">
  <div class="sliders">
    <label>Likelihood of attack per year <input type="range" min="0" max="100" bind:value={likely} /> {likely}%</label>
    <label>Probability attack succeeds <input type="range" min="0" max="100" bind:value={success} /> {success}%</label>
    <label>Asset value (0–100) <input type="range" min="0" max="100" bind:value={value} /> {value}</label>
    <label>% of asset lost <input type="range" min="0" max="100" bind:value={lost} /> {lost}%</label>
    <label>% risk mitigated by current controls <input type="range" min="0" max="100" bind:value={mitig} /> {mitig}%</label>
    <label>Measurement accuracy <input type="range" min="0" max="100" bind:value={acc} /> {acc}%</label>
  </div>
  <ol class="work">
    <li><code>LF = {likely / 100} × {success / 100} = {r(lf)}</code></li>
    <li><code>LM = {value} × {lost / 100} = {r(lm)}</code></li>
    <li><code>LF × LM = {r(base)}</code></li>
    <li><code>after controls = {r(base)} × (1 − {mitig / 100}) = {r(afterCtl)}</code></li>
    <li><code>uncertainty = {r(afterCtl)} × {r(1 - acc / 100)} = {r(unc)}</code></li>
  </ol>
  <p class="ans">Risk = {r(risk)}</p>
</div>
