/* =============================================
   UTILS.JS — Fonctions utilitaires
   ============================================= */

/** Sélecteurs courts */
export const $  = (sel, ctx = document) => ctx.querySelector(sel);
export const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/** Attendre N ms */
export const sleep = (ms) => new Promise(r => setTimeout(r, ms));

/** Debounce */
export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
}

/** Throttle */
export function throttle(fn, limit = 200) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= limit) { last = now; fn(...args); }
  };
}

/** Cloner un objet profondément */
export const deepClone = (obj) => structuredClone(obj);

/** Formater une date en français */
export const formatDate = (date, opts = { dateStyle: 'long' }) =>
  new Intl.DateTimeFormat('fr-FR', opts).format(new Date(date));

/** Générer un id unique court */
export const uid = () => Math.random().toString(36).slice(2, 9);

/** Récupérer un paramètre de l'URL courante */
export const getParam = (key) =>
  new URLSearchParams(window.location.search).get(key);

/** Tronquer un texte */
export const truncate = (str, max = 80) =>
  str.length > max ? str.slice(0, max) + '…' : str;
