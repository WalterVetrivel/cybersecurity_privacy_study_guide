// Formula sheet: each formula with term definitions, derivation and worked examples.
// examples: { p: problem, s: steps, a: answer }
export default [
  {
    id: 'mtd', week: 4, name: 'Maximum Tolerable Downtime', f: 'MTD = RTO + WRT',
    meaning: 'The total time a business process can be down before the damage is unacceptable is split into the time to bring the technology back and the time to make the business work again on top of it.',
    terms: [
      ['MTD', 'Maximum Tolerable Downtime', 'Total outage time the system owner/authorizing official is willing to accept for a business process.'],
      ['RTO', 'Recovery Time Objective', 'Maximum time a system resource can stay unavailable before it hurts other resources, processes and the MTD.'],
      ['WRT', 'Work Recovery Time', 'Time needed after the technology is back to make the business function work again (testing, validation, catching up).'],
      ['RPO', 'Recovery Point Objective', 'Not in the formula: the point in time to which data can be restored from backup (how much data you can lose).'],
    ],
    derive: 'The BIA starts from the business view: how long can this process be down (MTD)? Recovery happens in two consecutive stages: first IT restores the system (RTO), then users verify data and restart work (WRT). Because the stages happen one after the other, their durations add up, and together they must fit inside the MTD. So MTD = RTO + WRT, which can be rearranged as RTO = MTD − WRT or WRT = MTD − RTO. In practice planners fix the MTD first and budget the RTO and WRT within it (the lecture example gives half the time to work recovery).',
    examples: [
      { p: 'The MTD for order processing is 24 hours and testing/validation (WRT) takes 6 hours. What RTO must IT achieve?', s: ['RTO = MTD − WRT', 'RTO = 24 − 6'], a: '18 hours' },
      { p: 'A server can be restored in 10 hours (RTO) and staff need 5 hours to validate data (WRT). What is the MTD?', s: ['MTD = RTO + WRT', 'MTD = 10 + 5'], a: '15 hours' },
    ],
  },
  {
    id: 'lf', week: 6, name: 'Loss Frequency', f: 'LF = Likelihood of attack × Probability of attack success',
    meaning: 'How often per year you actually expect to lose something: how often the asset is attacked, multiplied by how often such an attack succeeds.',
    terms: [
      ['Likelihood', 'Probability of an attack', 'Usually an annual value from external references, e.g. once every 5 years = 1/5 = 0.2 (20%).'],
      ['P(success)', 'Attack success probability', 'Chance an attack succeeds given your current vulnerabilities and controls, e.g. 10% = 0.1.'],
      ['LF', 'Loss Frequency', 'Expected number of successful attacks per year (a probability when below 1).'],
    ],
    derive: 'A loss only happens if two things both happen: the asset is attacked AND the attack succeeds. For two events where the second depends on the first, P(attack and success) = P(attack) × P(success | attack). That product is the loss frequency. Convert "once every N years" to a yearly likelihood of 1/N.',
    examples: [
      { p: 'Industry reports say a database is attacked once every 10 years. If attacked, there is a 50% chance of success. Find LF.', s: ['Likelihood = 1/10 = 0.1', 'LF = 0.1 × 0.5'], a: '0.05' },
      { p: 'A web server is attacked 4 times a year; 5% of attacks succeed. Find LF.', s: ['Likelihood = 4 per year', 'LF = 4 × 0.05'], a: '0.2 successful attacks per year' },
    ],
  },
  {
    id: 'lm', week: 6, name: 'Loss Magnitude (asset exposure)', f: 'LM = Asset value × Percentage of asset lost',
    meaning: 'How much you lose in a single successful attack.',
    terms: [
      ['Asset value', 'Relative or monetary value', 'Often a score on a 0–100 scale in the course, or a rupee value.'],
      ['% lost', 'Share of the asset compromised', 'Estimated for best, worst and most likely cases, e.g. 80% = 0.8.'],
      ['LM', 'Loss Magnitude', 'Value lost per successful attack. It is the same idea as SLE in Week 8.'],
    ],
    derive: 'A successful attack rarely destroys the whole asset; it destroys some fraction of it. The loss is therefore the full value scaled by the fraction lost. Always convert the percentage to a decimal first.',
    examples: [
      { p: 'An asset is valued at 50 (0–100 scale) and 80% would be compromised. Find LM.', s: ['LM = 50 × 0.8'], a: '40' },
      { p: 'A customer database worth 90 would lose 25% in an attack. Find LM.', s: ['LM = 90 × 0.25'], a: '22.5' },
    ],
  },
  {
    id: 'risk', week: 6, name: 'Relative risk', f: 'Risk = (LF × LM) − (% mitigated by current controls) + uncertainty',
    meaning: 'A comparable risk score for one vulnerability of one asset: expected loss per year, reduced by what existing controls already handle, and padded for how unsure your estimates are.',
    terms: [
      ['LF × LM', 'Expected loss', 'Loss frequency × loss magnitude: the expected loss per year.'],
      ['% mitigated', 'Effect of current controls', 'Share of that risk already removed by controls in place. If the question does not mention controls, it is 0.'],
      ['Uncertainty', 'Measurement error', '(1 − accuracy) × the risk so far. "Measurements are 75% accurate" means uncertainty = 25% of the risk.'],
    ],
    derive: 'Start with expected loss = how often you lose × how much you lose (LF × LM). Controls already in place remove part of that, so subtract the mitigated share. Your inputs are estimates, so add a margin for error: if the estimates are only A% accurate, the error could be (100 − A)% of the value, and the conservative approach adds it. The assignment version is written Risk = (LF × LM) + uncertainty term, where controls are not mentioned.',
    examples: [
      { p: '(Lecture) An e‑commerce database: 10% chance of attack this year, 50% chance of success, asset value 50, 80% compromised, measurements 75% accurate. Estimate risk.', s: ['LF = 0.1 × 0.5 = 0.05', 'LM = 50 × 0.8 = 40', 'LF × LM = 0.05 × 40 = 2', 'Uncertainty = 2 × (1 − 0.75) = 0.5', 'Risk = 2 + 0.5'], a: '2.5' },
      { p: 'Asset value 80, attacked once every 5 years, 50% success, 50% of the asset lost, current controls mitigate 25% of the risk, measurements 90% accurate.', s: ['LF = 0.2 × 0.5 = 0.1', 'LM = 80 × 0.5 = 40', 'LF × LM = 4', 'Mitigated = 25% of 4 = 1 → 4 − 1 = 3', 'Uncertainty = 3 × 0.10 = 0.3', 'Risk = 3 + 0.3'], a: '3.3' },
    ],
  },
  {
    id: 'sle', week: 8, name: 'Single Loss Expectancy', f: 'SLE = Asset Value (AV) × Exposure Factor (EF)',
    meaning: 'The money lost each time the threat happens once.',
    terms: [
      ['AV', 'Asset Value', 'Monetary value of the asset (design, development, replacement, recovery, litigation costs).'],
      ['EF', 'Exposure Factor', 'Percentage of the asset value lost in one occurrence (40% → 0.40).'],
      ['SLE', 'Single Loss Expectancy', 'Loss per single event. The slides call it the loss magnitude.'],
    ],
    derive: 'Same reasoning as loss magnitude: one incident destroys a fraction (EF) of the asset\'s value, so the loss per incident is AV × EF. Rearranged: AV = SLE ÷ EF and EF = SLE ÷ AV.',
    examples: [
      { p: 'A server worth ₹15,00,000 loses 40% of its value in an attack. Find SLE.', s: ['SLE = 15,00,000 × 0.40'], a: '₹6,00,000' },
      { p: 'An SLE of ₹2,00,000 comes from an exposure factor of 25%. What is the asset value?', s: ['AV = SLE ÷ EF', 'AV = 2,00,000 ÷ 0.25'], a: '₹8,00,000' },
    ],
  },
  {
    id: 'ale', week: 8, name: 'Annualized Loss Expectancy', f: 'ALE = SLE × ARO',
    meaning: 'The expected loss per year from one threat, which is the yearly budget-level figure you compare against control costs.',
    terms: [
      ['SLE', 'Single Loss Expectancy', 'Loss per occurrence (AV × EF).'],
      ['ARO', 'Annualized Rate of Occurrence', 'Expected number of occurrences per year: twice a year = 2, once in 4 years = 0.25.'],
      ['ALE', 'Annualized Loss Expectancy', 'Expected loss per year.'],
    ],
    derive: 'If each incident costs SLE and you expect ARO incidents in a year, the yearly loss is SLE added ARO times, which is SLE × ARO. Combining with SLE gives ALE = AV × EF × ARO. Rearranged: ARO = ALE ÷ SLE and SLE = ALE ÷ ARO.',
    examples: [
      { p: '(Assignment W8 Q5) AV = ₹15,00,000, EF = 40%, threat occurs 2 times a year. Find ALE.', s: ['SLE = 15,00,000 × 0.40 = 6,00,000', 'ALE = 6,00,000 × 2'], a: '₹12,00,000' },
      { p: '(Assignment W8 Q4) SLE = ₹8,00,000 and ALE = ₹12,00,000. Find ARO.', s: ['ARO = ALE ÷ SLE', 'ARO = 12,00,000 ÷ 8,00,000'], a: '1.5 times per year' },
      { p: 'A laptop fleet worth ₹40,00,000 loses 10% per theft incident; a theft happens once every 2 years. Find ALE.', s: ['SLE = 40,00,000 × 0.10 = 4,00,000', 'ARO = 1/2 = 0.5', 'ALE = 4,00,000 × 0.5'], a: '₹2,00,000' },
    ],
  },
  {
    id: 'cba', week: 8, name: 'Cost–Benefit Analysis', f: 'CBA = ALE(prior) − ( ALE(post) + ACS )',
    meaning: 'The net yearly benefit of a control: how much loss it saves minus what it costs. Positive means the control is worth buying.',
    terms: [
      ['ALE(prior)', 'ALE before the control', 'Expected yearly loss without the safeguard.'],
      ['ALE(post)', 'ALE after the control', 'Expected yearly loss once the safeguard has been in place a while.'],
      ['ACS', 'Annualized Cost of Safeguard', 'Yearly cost of the control: acquisition, training, implementation, service, maintenance.'],
      ['CBA', 'Cost–benefit estimate', '> 0: control justified; < 0: it costs more than it saves.'],
    ],
    derive: 'Benefit of the control = loss avoided = ALE(prior) − ALE(post). Net benefit = benefit − cost = [ALE(prior) − ALE(post)] − ACS. Grouping the two subtracted terms gives ALE(prior) − (ALE(post) + ACS). In words: after buying the control you still suffer ALE(post) and you pay ACS; compare that total with what you lost before.',
    examples: [
      { p: '(Assignment W8 Q6) ALE before = ₹20,00,000, after = ₹8,00,000, ACS = ₹3,00,000.', s: ['Total cost with control = 8,00,000 + 3,00,000 = 11,00,000', 'CBA = 20,00,000 − 11,00,000'], a: '₹9,00,000 (positive, so justified)' },
      { p: 'ALE before = ₹6,00,000, after = ₹2,00,000, ACS = ₹5,00,000. Should you buy it?', s: ['CBA = 6,00,000 − (2,00,000 + 5,00,000)', 'CBA = 6,00,000 − 7,00,000'], a: '−₹1,00,000, so no: the control costs more than it saves' },
    ],
  },
  {
    id: 'caesar', week: 8, name: 'Caesar (shift) cipher', f: 'c = (p + k) mod 26     p = (c − k) mod 26',
    meaning: 'Monoalphabetic substitution: every letter is shifted forward by the same key k.',
    terms: [
      ['p', 'Plaintext letter', 'As a number A=0, B=1, …, Z=25.'],
      ['c', 'Ciphertext letter', 'As a number 0–25.'],
      ['k', 'Key', 'The shift amount (Caesar used 3).'],
      ['mod 26', 'Wrap-around', 'After Z, start again at A (e.g. 27 mod 26 = 1 = B).'],
    ],
    derive: 'Number the alphabet 0–25. Encryption adds k to each letter\'s number; "mod 26" keeps the result inside the alphabet by wrapping past Z back to A. Decryption is the inverse operation: subtract k (add 26 first if the result goes negative).',
    examples: [
      { p: 'Encrypt "MEET" with k = 3.', s: ['M=12 → 15=P', 'E=4 → 7=H', 'E=4 → 7=H', 'T=19 → 22=W'], a: 'PHHW' },
      { p: 'Decrypt "DIWHU" with k = 3.', s: ['D=3 → 0=A', 'I=8 → 5=F', 'W=22 → 19=T', 'H=7 → 4=E', 'U=20 → 17=R'], a: 'AFTER' },
      { p: 'Encrypt "XYZ" with k = 3.', s: ['X=23 → 26 mod 26 = 0 = A', 'Y=24 → 27 mod 26 = 1 = B', 'Z=25 → 28 mod 26 = 2 = C'], a: 'ABC' },
    ],
  },
  {
    id: 'vigenere', week: 8, name: 'Vigenère (polyalphabetic) cipher', f: 'cᵢ = (pᵢ + kᵢ) mod 26   (key repeated over the message)',
    meaning: 'Like Caesar, but the shift changes letter by letter according to a keyword, so the same plaintext letter can become different ciphertext letters.',
    terms: [
      ['pᵢ', 'i-th plaintext letter', 'A=0 … Z=25.'],
      ['kᵢ', 'i-th key letter', 'The keyword is repeated to the length of the message.'],
      ['cᵢ', 'i-th ciphertext letter', 'Read from the tabula recta, or computed with mod 26.'],
    ],
    derive: 'Each key letter defines its own Caesar shift (A = shift 0, B = shift 1, …). Writing the keyword under the message and applying a different Caesar shift to each position is exactly what the tabula recta does: row = key letter, column = plaintext letter.',
    examples: [
      { p: '(Slide exercise) Encode DOMS with key IITM.', s: ['D(3) + I(8) = 11 = L', 'O(14) + I(8) = 22 = W', 'M(12) + T(19) = 31 mod 26 = 5 = F', 'S(18) + M(12) = 30 mod 26 = 4 = E'], a: 'LWFE' },
    ],
  },
  {
    id: 'xor', week: 8, name: 'XOR cipher', f: 'C = M ⊕ K     M = C ⊕ K',
    meaning: 'Each message bit is combined with a key bit: same bits give 0, different bits give 1.',
    terms: [
      ['M', 'Message (plaintext) bits', ''],
      ['K', 'Key bits', ''],
      ['⊕', 'Exclusive OR', '0⊕0 = 0, 0⊕1 = 1, 1⊕0 = 1, 1⊕1 = 0.'],
    ],
    derive: 'XOR is its own inverse: (M ⊕ K) ⊕ K = M ⊕ (K ⊕ K) = M ⊕ 0 = M. So the same key both encrypts and decrypts. On its own it is easy to break, which is why it is used together with other methods.',
    examples: [
      { p: '(Slide) Message 00110101, key 01010101.', s: ['0⊕0=0, 0⊕1=1, 1⊕0=1, 1⊕1=0', '0⊕0=0, 1⊕1=0, 0⊕0=0, 1⊕1=0'], a: '01100000' },
      { p: 'Decrypt 1100 with key 0110.', s: ['1⊕0=1, 1⊕1=0, 0⊕1=1, 0⊕0=0'], a: '1010' },
    ],
  },
  {
    id: 'biometric', week: 8, name: 'Biometric error rates (FAR, FRR, CER)', f: 'FAR = false accepts ÷ impostor attempts     FRR = false rejects ÷ genuine attempts     CER: FAR = FRR',
    meaning: 'Two opposite errors of a biometric device. Making it stricter lowers FAR but raises FRR; the crossover point (CER) is used to compare devices, and lower is better.',
    terms: [
      ['FAR', 'False Acceptance Rate', 'Share of impostors wrongly accepted (a false positive). Dangerous for security.'],
      ['FRR', 'False Rejection Rate', 'Share of genuine users wrongly rejected (a false negative). Annoying for users.'],
      ['CER', 'Crossover Error Rate', 'The error rate at the sensitivity setting where FAR = FRR.'],
    ],
    derive: 'Each rate is a simple proportion: errors of that type divided by the attempts where that error could occur. As you tighten the match threshold, fewer impostors get in (FAR falls) but more genuine users are rejected (FRR rises), like the lecture\'s CAT cut-off analogy. Since one curve falls and the other rises, they cross exactly once, and that crossing is the CER.',
    examples: [
      { p: 'In a test, 1,000 impostor attempts produced 20 acceptances and 2,000 genuine attempts produced 60 rejections. Find FAR and FRR.', s: ['FAR = 20 ÷ 1,000 = 0.02', 'FRR = 60 ÷ 2,000 = 0.03'], a: 'FAR = 2%, FRR = 3%' },
      { p: 'Device A has CER 1%, device B has CER 3%. Which is more accurate?', s: ['Lower CER means fewer errors at the balanced setting'], a: 'Device A' },
    ],
  },
  {
    id: 'ev', week: 12, name: 'Expected value (prospect theory example)', f: 'EV = probability × payoff',
    meaning: 'What a gamble is worth on average. Prospect theory shows people often prefer a certain smaller amount over a gamble with higher EV, because losses loom larger than gains.',
    terms: [
      ['p', 'Probability', 'Chance of the outcome.'],
      ['Payoff', 'Value of the outcome', ''],
      ['WTA / WTP', 'Willingness to accept / pay', 'Not a formula, but in privacy studies WTA (price to give up privacy) is much larger than WTP (price to protect it).'],
    ],
    derive: 'For a gamble with outcomes xᵢ and probabilities pᵢ, EV = Σ pᵢ × xᵢ. A "rational" economic agent picks the higher EV. Behavioural economics (Kahneman & Tversky) finds people are loss averse, so they take the certain option even when its EV is lower.',
    examples: [
      { p: '(Lecture) 100% chance of $450 versus a 50% chance of $1000. Compare the EVs.', s: ['EV(sure) = 1 × 450 = 450', 'EV(gamble) = 0.5 × 1000 + 0.5 × 0 = 500'], a: 'The gamble has the higher EV ($500), yet most people pick the sure $450: loss aversion' },
    ],
  },
];
