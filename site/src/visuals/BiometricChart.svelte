<script>
  // Move the threshold: stricter matching lowers FAR but raises FRR. They cross at the CER.
  let t = 30;
  const far = (x) => 40 * Math.exp(-x / 22);
  const frr = (x) => 40 * Math.exp(-(100 - x) / 22);
  const X = (x) => 40 + x * 2.6, Y = (y) => 160 - y * 3.4;
  const path = (fn) => Array.from({ length: 101 }, (_, x) => `${x ? 'L' : 'M'}${X(x)},${Y(fn(x))}`).join(' ');
  $: a = far(t);
  $: b = frr(t);
</script>

<div class="viz calc">
  <svg viewBox="0 0 320 190" class="fig wide" role="img" aria-label="FAR and FRR versus threshold">
    <line x1="40" y1="160" x2="300" y2="160" class="axis" /><line x1="40" y1="160" x2="40" y2="20" class="axis" />
    <path d={path(far)} class="c1" /><path d={path(frr)} class="c2" />
    <circle cx={X(50)} cy={Y(far(50))} r="5" class="pt" />
    <text x={X(50) - 12} y={Y(far(50)) - 12}>CER</text>
    <line x1={X(t)} y1="20" x2={X(t)} y2="160" class="thr" />
    <text x="48" y="32">FAR</text><text x="268" y="32">FRR</text>
    <text x="110" y="182">Sensitivity / strictness →</text>
  </svg>
  <label class="sl">Threshold <input type="range" min="0" max="100" bind:value={t} /></label>
  <p>FAR (impostors accepted) = <b>{a.toFixed(1)}%</b> · FRR (genuine users rejected) = <b>{b.toFixed(1)}%</b></p>
  <p class="muted small">{t < 45 ? 'Lenient: convenient for users but lets impostors in (high FAR).' : t > 55 ? 'Strict: secure but frustrates genuine users (high FRR).' : 'Near the CER, where FAR ≈ FRR. Devices are compared by their CER, and lower is better.'}</p>
</div>
