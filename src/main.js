/* =============================================
   MAIN.JS — Point d'entrée de l'application
   ============================================= */
import Router  from './router/Router.js';
import routes  from './router/routes.js';
import Navbar  from './components/Navbar.js';
import Footer  from './components/Footer.js';
import store   from './store/store.js';

// ─── Démarrage de l'app ──────────────────────
async function init() {
  // 1. Monter les composants shell (permanents)
  Navbar.mount('#navbar');
  Footer.mount('#footer-container');

  // 2. Démarrer le router — il prend le contrôle du rendu dans #app
  Router.init(routes);

  console.log('[App] Initialisé ✓', { store: store.getState() });
}

init();
