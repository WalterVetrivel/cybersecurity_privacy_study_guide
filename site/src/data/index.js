import raw from './assignments.json';
import explanations from './explanations.js';
import weeks from './weeks.js';

export { weeks };

// Assignment questions merged with their explanations
export const assignments = raw.map((q) => {
  const x = explanations[q.id] || {};
  const answer = x.answer || q.answer;
  return { ...q, q: x.q || q.q, answer, multi: answer.length > 1, source: 'assignment', e: x.e || '', steps: x.steps, note: x.note, fig: x.fig, stmt: x.stmt, qfig: x.qfig };
});

// Revision quiz questions, normalised to the same shape
export const revision = weeks.flatMap((w) =>
  w.quiz.map((r, i) => ({
    id: `r${w.week}-${i + 1}`, week: w.week, n: i + 1, q: r.q, options: r.o,
    answer: r.a, multi: r.a.length > 1, source: 'revision', e: r.e,
  }))
);

export const allQuestions = [...assignments, ...revision];
export const byId = Object.fromEntries(allQuestions.map((q) => [q.id, q]));
