/* =============================================
   ROUTES.JS — Définitions des routes de l'app
   Ajouter une route = ajouter un objet ici
   ============================================= */
import HomeView    from '../views/HomeView.js';
import AboutView   from '../views/AboutView.js';
import ContactView from '../views/ContactView.js';
import NotFound    from '../views/NotFound.js';

const routes = [
  {
    path:  '/',
    title: 'Accueil — Mon SPA',
    view:  HomeView,
  },
  {
    path:  '/about',
    title: 'À propos — Mon SPA',
    view:  AboutView,
  },
  {
    path:  '/contact',
    title: 'Contact — Mon SPA',
    view:  ContactView,
  },
  // Exemple de route avec paramètre dynamique
  // { path: '/post/:id', title: 'Article', view: PostView },

  // Route 404 — doit être en dernier
  {
    path:  '404',
    title: '404 — Mon SPA',
    view:  NotFound,
  },
];

export default routes;
