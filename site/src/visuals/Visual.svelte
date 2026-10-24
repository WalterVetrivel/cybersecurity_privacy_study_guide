<script>
  // Renders one visual spec by kind.
  import Explorer from './Explorer.svelte';
  import Table from './Table.svelte';
  import CIATriad from './CIATriad.svelte';
  import McCumberCube from './McCumberCube.svelte';
  import RecoveryTimeline from './RecoveryTimeline.svelte';
  import RiskCalc from './RiskCalc.svelte';
  import LossCalc from './LossCalc.svelte';
  import BiometricChart from './BiometricChart.svelte';
  import CipherTool from './CipherTool.svelte';
  import KAnonymity from './KAnonymity.svelte';

  export let spec;
  const custom = { cia: CIATriad, cube: McCumberCube, recovery: RecoveryTimeline, riskcalc: RiskCalc,
    losscalc: LossCalc, biometric: BiometricChart, cipher: CipherTool, kanon: KAnonymity };
  const badge = { table: '▦ Table', explorer: '◉ Interactive' };
</script>

<section class="card visual">
  <h2>{spec.title} <span class="vbadge">{badge[spec.kind] || '◉ Interactive'}</span></h2>
  {#if spec.kind === 'explorer'}<Explorer {spec} />
  {:else if spec.kind === 'table'}<Table {spec} />
  {:else}<svelte:component this={custom[spec.kind]} />{/if}
</section>
