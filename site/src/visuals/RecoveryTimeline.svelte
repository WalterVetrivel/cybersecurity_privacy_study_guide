<script>
  // Drag the sliders to see how RTO and WRT fill the Maximum Tolerable Downtime.
  let rpo = 4, rto = 8, wrt = 4, mtd = 16;
  $: used = rto + wrt;
  $: ok = used <= mtd;
  $: total = Math.max(mtd, used) + rpo;
  const pct = (h) => (h / total) * 100;
</script>

<div class="viz calc">
  <div class="timeline">
    <div class="seg rpo" style="width:{pct(rpo)}%">RPO {rpo}h</div>
    <div class="seg rto" style="width:{pct(rto)}%">RTO {rto}h</div>
    <div class="seg wrt" style="width:{pct(wrt)}%">WRT {wrt}h</div>
  </div>
  <div class="timeline axis-row">
    <span style="width:{pct(rpo)}%">last backup</span>
    <span class="mtdbar" class:bad={!ok} style="width:{pct(mtd)}%">◂ MTD {mtd}h ▸</span>
  </div>
  <p class="muted small">⚡ The disruption happens where the RPO block ends. Data written after the last backup (RPO) is lost; downtime runs from the disruption onwards.</p>
  <div class="sliders">
    <label>RPO (data loss window) <input type="range" min="0" max="24" bind:value={rpo} /> {rpo}h</label>
    <label>RTO (restore systems) <input type="range" min="1" max="48" bind:value={rto} /> {rto}h</label>
    <label>WRT (test & validate) <input type="range" min="0" max="24" bind:value={wrt} /> {wrt}h</label>
    <label>MTD (business limit) <input type="range" min="1" max="72" bind:value={mtd} /> {mtd}h</label>
  </div>
  <p class={ok ? 'ans' : 'bad'}>RTO + WRT = {rto} + {wrt} = {used}h {ok ? '≤' : '>'} MTD {mtd}h → {ok ? 'plan meets the MTD' : 'plan exceeds the MTD: shorten RTO/WRT (e.g. use a hot site)'}</p>
</div>
