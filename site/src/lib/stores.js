import { writable } from 'svelte/store';

// Hash routing works from file:// with no server
const parse = () => (location.hash.slice(1) || '/').split('/').filter(Boolean);
export const route = writable(parse());
window.addEventListener('hashchange', () => { route.set(parse()); window.scrollTo({ top: 0, behavior: 'instant' }); });

// Per-question history: { [id]: { right, wrong, last } }, kept in localStorage
const KEY = 'nptel-csp-progress';
let initial = {};
try { initial = JSON.parse(localStorage.getItem(KEY)) || {}; } catch {}
export const progress = writable(initial);
progress.subscribe((v) => { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch {} });

export function record(id, correct) {
  progress.update((p) => {
    const s = p[id] || { right: 0, wrong: 0 };
    return { ...p, [id]: { right: s.right + (correct ? 1 : 0), wrong: s.wrong + (correct ? 0 : 1), last: correct } };
  });
}

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Light / dark theme: follows the system until the user picks one, then remembered
const THEME = 'nptel-csp-theme';
let savedTheme = null;
try { savedTheme = localStorage.getItem(THEME); } catch {}
const systemDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
export const theme = writable(savedTheme || (systemDark ? 'dark' : 'light'));
let firstTheme = true;
theme.subscribe((t) => {
  document.documentElement.dataset.theme = t;
  if (!firstTheme) try { localStorage.setItem(THEME, t); } catch {}
  firstTheme = false;
});

// Animations are skipped for people who ask their OS for reduced motion
export const motion = !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
