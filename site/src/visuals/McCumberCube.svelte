<script>
  // Isometric McCumber cube. Pick a goal, an information state and a safeguard;
  // the matching cell lights up on all three visible faces.
  const goals = ['Confidentiality', 'Integrity', 'Availability'];
  const states = ['Storage', 'Processing', 'Transmission'];
  const guards = ['Policy', 'Education', 'Technology'];
  const examples = {
    'C-Storage-Policy': 'Data classification policy: who may store and view "Confidential" files.',
    'C-Storage-Education': 'Train staff to keep sensitive documents in locked, approved storage only.',
    'C-Storage-Technology': 'Full-disk or database encryption, file access control lists.',
    'C-Processing-Policy': 'Least-privilege policy: only payroll staff may run salary reports.',
    'C-Processing-Education': 'Awareness of shoulder surfing and screen locking while working on data.',
    'C-Processing-Technology': 'Role-based access control, memory protection against RAM scrapers.',
    'C-Transmission-Policy': 'Email policy forbidding sending customer data unencrypted.',
    'C-Transmission-Education': 'Teach users to spot phishing and avoid public Wi-Fi without a VPN.',
    'C-Transmission-Technology': 'TLS/HTTPS, VPNs, end-to-end encryption.',
    'I-Storage-Policy': 'Change-management policy for master data and records retention.',
    'I-Storage-Education': 'Train custodians to verify backups and avoid unauthorised edits.',
    'I-Storage-Technology': 'Hashes/checksums, file integrity baselines, write-once backups.',
    'I-Processing-Policy': 'Segregation of duties: the person who enters a payment cannot approve it.',
    'I-Processing-Education': 'Train developers in input validation (prevents SQL injection).',
    'I-Processing-Technology': 'Input validation, transaction logs, Clark-Wilson style controls.',
    'I-Transmission-Policy': 'Policy that contracts and approvals must be digitally signed.',
    'I-Transmission-Education': 'Teach users to verify sender identity before acting on requests.',
    'I-Transmission-Technology': 'Digital signatures, message authentication codes, hashing.',
    'A-Storage-Policy': 'Backup and retention policy; contingency planning policy.',
    'A-Storage-Education': 'Train staff on restoring backups and the DR procedure.',
    'A-Storage-Technology': 'RAID, backups, electronic vaulting, database shadowing.',
    'A-Processing-Policy': 'BIA-based MTD/RTO targets for critical processes.',
    'A-Processing-Education': 'Run contingency tests: desk check, walkthrough, simulation.',
    'A-Processing-Technology': 'Redundant servers, hot sites, load balancing, patching.',
    'A-Transmission-Policy': 'Service-level agreements with ISPs; redundancy requirements.',
    'A-Transmission-Education': 'Train the IR team to recognise and escalate DDoS attacks.',
    'A-Transmission-Technology': 'DDoS protection, redundant links, firewalls blocking floods.',
  };
  let g = 0, s = 2, f = 2;

  const O = [170, 140], ex = [28, 16], ey = [-28, 16], ez = [0, -32];
  const P = (i, j, k) => [O[0] + i * ex[0] + j * ey[0] + k * ez[0], O[1] + i * ex[1] + j * ey[1] + k * ez[1]];
  const poly = (pts) => pts.map((p) => p.join(',')).join(' ');
  const kOf = (goal) => 2 - goal; // C on top
  const top = (i, j) => poly([P(i, j, 3), P(i + 1, j, 3), P(i + 1, j + 1, 3), P(i, j + 1, 3)]);
  const right = (j, k) => poly([P(3, j, k), P(3, j + 1, k), P(3, j + 1, k + 1), P(3, j, k + 1)]);
  const left = (i, k) => poly([P(i, 3, k), P(i + 1, 3, k), P(i + 1, 3, k + 1), P(i, 3, k + 1)]);
  const r3 = [0, 1, 2];
  $: key = `${goals[g][0]}-${states[s]}-${guards[f]}`;
</script>

<div class="viz cube">
  <svg viewBox="0 0 340 300" role="img" aria-label="McCumber cube">
    {#each r3 as i}{#each r3 as j}
      <polygon points={top(i, j)} class="cell top" class:slice={i === f || j === s} class:hit={i === f && j === s}
        on:click={() => { f = i; s = j; }} role="presentation" />
    {/each}{/each}
    {#each r3 as j}{#each r3 as k}
      <polygon points={right(j, k)} class="cell rgt" class:slice={j === s || k === kOf(g)} class:hit={j === s && k === kOf(g)}
        on:click={() => { s = j; g = 2 - k; }} role="presentation" />
    {/each}{/each}
    {#each r3 as i}{#each r3 as k}
      <polygon points={left(i, k)} class="cell lft" class:slice={i === f || k === kOf(g)} class:hit={i === f && k === kOf(g)}
        on:click={() => { f = i; g = 2 - k; }} role="presentation" />
    {/each}{/each}
    {#each guards as name, i}
      {@const p = P(i + 0.5, 3, 0)}<text x={p[0] - 6} y={p[1] + 18} text-anchor="end" class="axl" class:on={i === f}>{name}</text>
    {/each}
    {#each states as name, j}
      {@const p = P(3, j + 0.5, 0)}<text x={p[0] + 6} y={p[1] + 18} class="axl" class:on={j === s}>{name}</text>
    {/each}
    {#each goals as name, gi}
      {@const p = P(0, 3, kOf(gi) + 0.5)}<text x={p[0] - 8} y={p[1] + 4} text-anchor="end" class="axl" class:on={gi === g}>{name[0]}</text>
    {/each}
  </svg>

  <div class="detail">
    <div class="pick"><b>Goal</b>{#each goals as n, i}<button class:on={g === i} on:click={() => (g = i)}>{n}</button>{/each}</div>
    <div class="pick"><b>State</b>{#each states as n, i}<button class:on={s === i} on:click={() => (s = i)}>{n}</button>{/each}</div>
    <div class="pick"><b>Safeguard</b>{#each guards as n, i}<button class:on={f === i} on:click={() => (f = i)}>{n}</button>{/each}</div>
    <h4>{goals[g]} × {states[s]} × {guards[f]}</h4>
    <p>{examples[key]}</p>
    <p class="muted small">3 goals × 3 information states × 3 safeguards = 27 cells. A complete security program covers every cell, so nothing is missed. Click the cube faces or the buttons to explore.</p>
  </div>
</div>
