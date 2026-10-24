<script>
  // Clickable CIA triangle: pick a vertex (or the centre) to see its definition, threats and controls.
  const parts = {
    C: { name: 'Confidentiality', x: 160, y: 30, color: 'var(--accent)',
      def: 'Only those with sufficient privileges can access the information.',
      threats: 'Eavesdropping, shoulder surfing, phishing for credentials, data leaks, RAM scraping (Target).',
      controls: 'Encryption, information classification, secure document storage, access control, security policies, education of custodians and users.',
      ex: 'A hospital receptionist disclosing a diagnosis to an unverified visitor breaches confidentiality (PHI).' },
    I: { name: 'Integrity', x: 40, y: 230, color: 'var(--ok)',
      def: 'Information is whole, complete and uncorrupted while it is compiled, stored or transmitted.',
      threats: 'Unauthorised modification, malware corrupting files, SQL injection altering records, Stuxnet manipulating PLCs.',
      controls: 'Hashing and checksums, digital signatures, file integrity baselines, change control, access logging.',
      ex: 'An audit finds a database record silently modified by an unauthorised party.' },
    A: { name: 'Availability', x: 280, y: 230, color: 'var(--bad)',
      def: 'Authorised users (people or systems) can access information without interference, in the required format.',
      threats: 'DoS/DDoS, ransomware, hardware failure, natural disasters, power or ISP outages.',
      controls: 'Redundancy, backups, hot/warm/cold sites, contingency planning (IRP, DRP, BCP), DDoS protection.',
      ex: 'A DDoS attack takes Ukraine\'s bank websites and ATMs offline (Feb 2022).' },
    M: { name: 'Means to ensure CIA', x: 160, y: 165, color: 'var(--muted)',
      def: 'Identification, authentication and authorisation are the means to ensure CIA, and accountability lets every action be traced to a person or process.',
      threats: 'Weak passwords, shared accounts, excessive privileges.',
      controls: 'IAAA: Identification → Authentication (know / have / are / produce) → Authorization → Accountability.',
      ex: 'The extended list adds authenticity, accuracy, utility and possession, plus non-repudiation (ITU).' },
  };
  let sel = 'C';
  $: p = parts[sel];
</script>

<div class="viz cia">
  <svg viewBox="0 0 320 270" role="img" aria-label="CIA triad">
    <polygon points="160,30 40,230 280,230" class="tri" />
    <line x1="160" y1="30" x2="160" y2="165" class="spoke" /><line x1="40" y1="230" x2="160" y2="165" class="spoke" /><line x1="280" y1="230" x2="160" y2="165" class="spoke" />
    {#each Object.entries(parts) as [k, v]}
      <g class="node" class:sel={sel === k} on:click={() => (sel = k)} on:keydown={(e) => e.key === 'Enter' && (sel = k)} role="button" tabindex="0">
        <circle cx={v.x} cy={v.y} r={k === 'M' ? 22 : 28} style="fill:{v.color}" />
        <text x={v.x} y={v.y + 6} text-anchor="middle" class="lbl" class:small={k === 'M'}>{k === 'M' ? 'IAAA' : k}</text>
      </g>
    {/each}
    <text x="160" y="262" text-anchor="middle" class="hint">Click a corner or the centre</text>
  </svg>
  <div class="detail">
    <h4 style="color:{p.color}">{p.name}</h4>
    <p>{p.def}</p>
    <p><b>Threats:</b> {p.threats}</p>
    <p><b>Controls:</b> {p.controls}</p>
    <p class="muted"><b>Example:</b> {p.ex}</p>
  </div>
</div>
