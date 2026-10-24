# NPTEL Cyber Security & Privacy – exam prep site

Open `../docs/index.html` (or `../Exam Prep.html`) in any browser. No server or internet needed.

- Week pages: summary (topics with a side nav), diagrams & calculators, formulae with worked examples, all assignment questions with explained answers, revision quiz
- Master quiz: random mix of assignment + revision questions, filter by week/source, retry mistakes
- Formula sheet, standards & laws tables, acronyms list
- Light/dark toggle (moon/sun button in the sidebar); works on phones too
- Progress is saved in your browser's localStorage

## Editing content
- `src/data/assignments.json` – questions parsed from `Assignment Questions.md`
- `src/data/explanations.js` – answer explanations / steps, plus statements, match tables and figures for questions whose text was missing from the source file
- `src/data/weeks.js` – week summaries, formulas and revision quizzes
- `src/data/formulas.js` – formula sheet cards (terms, derivation, examples)
- `src/data/visuals.js` – diagram and table specs, and which week shows which
- `src/data/references.js` – standards, laws and acts tables
- `src/data/acronyms.js` – acronym list

Rebuild after editing: `npm install` then `npm run build`. This writes a single self-contained `../docs/index.html`, which is what GitHub Pages serves, so commit `docs/` along with your source changes.
