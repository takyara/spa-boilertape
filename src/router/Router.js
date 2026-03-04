/* =============================================
   ROUTER.JS — Client-side SPA router
   Utilise la History API (pushState / popstate)
   Inspiré de : vanillarouter, frameworkless-spa
   ============================================= */

class Router {
  constructor() {
    this.routes     = [];
    this.rootEl     = null;
    this._beforeEach = null;  // Hook de garde de navigation
  }

  /**
   * Initialise le router
   * @param {Array}  routes  - tableau de définitions de routes
   * @param {string} rootId  - sélecteur de la zone de rendu (défaut: #app)
   */
  init(routes, rootId = '#app') {
    this.routes = routes;
    this.rootEl = document.querySelector(rootId);

    if (!this.rootEl) {
      console.error(`[Router] Élément "${rootId}" introuvable.`);
      return;
    }

    // Intercepter tous les clics sur les liens [data-link]
    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-link]');
      if (link) {
        e.preventDefault();
        this.navigate(link.getAttribute('href'));
      }
    });

    // Gestion du bouton retour / avance du navigateur
    window.addEventListener('popstate', () => this._resolve());

    // Résoudre la route initiale au chargement
    this._resolve();
  }

  /**
   * Navigue vers un chemin
   * @param {string} path
   */
  navigate(path) {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    this._resolve();
  }

  /**
   * Enregistre un hook exécuté avant chaque navigation
   * Utile pour l'auth guard : beforeEach((to, from, next) => next())
   */
  beforeEach(fn) {
    this._beforeEach = fn;
  }

  /**
   * Résout la route courante et rend la vue correspondante
   */
  async _resolve() {
    const path   = window.location.pathname;
    const match  = this._match(path);
    const view   = match ? match.view : this._getNotFoundView();

    // Exécuter le guard si défini
    if (this._beforeEach) {
      let proceed = false;
      await this._beforeEach(path, (next = path) => {
        proceed = true;
        if (next !== path) { this.navigate(next); }
      });
      if (!proceed) return;
    }

    // Transition sortie
    this.rootEl.classList.add('view-exit');

    await new Promise(r => setTimeout(r, 150));

    // Rendre la vue
    this.rootEl.innerHTML = await view.render(match?.params ?? {});
    view.afterRender?.();

    // Mettre à jour le titre
    document.title = match?.title ?? 'Mon SPA';

    // Mettre à jour les liens actifs dans la nav
    this._updateActiveLinks(path);

    // Transition entrée
    this.rootEl.classList.remove('view-exit');
    this.rootEl.classList.add('view-enter');
    this.rootEl.addEventListener('animationend', () => {
      this.rootEl.classList.remove('view-enter');
    }, { once: true });
  }

  /**
   * Trouve la route correspondant au chemin
   * Supporte les paramètres dynamiques : /post/:id
   */
  _match(path) {
    for (const route of this.routes) {
      const paramNames = [];
      const pattern = route.path
        .replace(/:([^/]+)/g, (_, key) => {
          paramNames.push(key);
          return '([^/]+)';
        })
        .replace(/\//g, '\\/');

      const regex = new RegExp(`^${pattern}$`);
      const match = path.match(regex);

      if (match) {
        const params = Object.fromEntries(
          paramNames.map((name, i) => [name, match[i + 1]])
        );
        return { ...route, params };
      }
    }
    return null;
  }

  _getNotFoundView() {
    const notFoundRoute = this.routes.find(r => r.path === '404');
    return notFoundRoute?.view ?? { render: () => '<h1>404 — Page introuvable</h1>' };
  }

  _updateActiveLinks(currentPath) {
    document.querySelectorAll('[data-link]').forEach(link => {
      const isActive = link.getAttribute('href') === currentPath;
      link.classList.toggle('nav__link--active', isActive);
      link.setAttribute('aria-current', isActive ? 'page' : 'false');
    });
  }
}

export default new Router();
