/* =============================================
   STORE.JS — Gestion d'état global réactif
   Pattern Observer léger (inspiré de Zustand / Redux)
   ============================================= */

class Store {
  constructor(initialState = {}) {
    this._state     = { ...initialState };
    this._listeners = new Set();
  }

  /** Lire l'état complet */
  getState() {
    return { ...this._state };
  }

  /**
   * Mettre à jour l'état (merge partiel)
   * @param {object|function} updater  - objet ou fn(state) => patch
   */
  setState(updater) {
    const patch = typeof updater === 'function'
      ? updater(this._state)
      : updater;

    this._state = { ...this._state, ...patch };
    this._notify();
  }

  /**
   * S'abonner aux changements
   * @param {function} listener  - fn(state) appelée à chaque changement
   * @returns {function}         - fonction de désabonnement
   */
  subscribe(listener) {
    this._listeners.add(listener);
    return () => this._listeners.delete(listener);
  }

  _notify() {
    this._listeners.forEach(fn => fn(this._state));
  }
}

// ─── État initial de votre application ───────
const store = new Store({
  user:      null,
  isLoading: false,
  theme:     'light',
  // Ajouter vos clés d'état global ici
});

export default store;
