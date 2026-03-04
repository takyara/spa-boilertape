# SPA website — Boilerplate Vanilla JS

Architecture SPA inspirée de `vite-vanilla-js`, `frameworkless-spa` et `vanillarouter`.
Router basé sur la **History API** (pushState / popstate), sans dépendance externe.

---

## Structure

```
spa/
├── index.html              ← Unique fichier HTML — shell permanent de l'app
├── package.json
│
├── public/                 ← Assets statiques servis tels quels
│   └── assets/
│       ├── images/
│       │   ├── icons/
│       │   ├── photos/
│       │   └── logos/
│       └── fonts/
│
└── src/                    ← Tout le code source
    ├── main.js             ← Point d'entrée : monte le shell + démarre le router
    │
    ├── router/
    │   ├── Router.js       ← Moteur SPA (History API, params dynamiques, transitions)
    │   └── routes.js       ← Table de routage : path → view → title
    │
    ├── views/              ← Chaque "page" = un objet { render(), afterRender() }
    │   ├── HomeView.js
    │   ├── AboutView.js
    │   ├── ContactView.js
    │   └── NotFound.js
    │
    ├── components/         ← Composants shell (ne changent pas entre les navigations)
    │   ├── Navbar.js
    │   └── Footer.js
    │
    ├── store/
    │   └── store.js        ← État global réactif (setState / subscribe)
    │
    ├── services/
    │   └── api.js          ← Wrapper fetch : get / post / put / patch / delete
    │
    ├── utils/
    │   └── utils.js        ← $, $$, debounce, throttle, formatDate, uid…
    │
    └── styles/
        ├── reset.css       → Base propre tous navigateurs
        ├── variables.css   → Tokens design (couleurs, typo, espacement, thème dark)
        ├── global.css      → Styles globaux + utilitaires
        ├── components.css  → Nav, Card, Footer, Loader…
        ├── transitions.css → Animations d'entrée/sortie des vues
        └── responsive.css  → Media queries (mobile first)
```

---

## Comment ça marche

### Ajouter une route

1. Créer `src/views/MaView.js` :
```js
const MaView = {
  async render(params) {
    return `<section class="container"><h1>Ma page</h1></section>`;
  },
  afterRender() { /* event listeners post-rendu */ },
};
export default MaView;
```

2. L'enregistrer dans `src/router/routes.js` :
```js
import MaView from '../views/MaView.js';
{ path: '/ma-page', title: 'Ma page — MonSite', view: MaView },
```

### Naviguer sans rechargement
```html
<a href="/ma-page" data-link>Aller vers ma page</a>
```
L'attribut `data-link` est intercepté par le Router — pas de rechargement.

### Lire / modifier l'état global
```js
import store from '../store/store.js';

store.getState();               // lecture
store.setState({ user: {} });   // écriture (merge partiel)
store.subscribe(state => {});   // réaction aux changements
```

### Appeler une API
```js
import api from '../services/api.js';

const posts = await api.get('/posts');
await api.post('/posts', { title: 'Hello' });
```

### Guard de navigation (auth, redirections)
```js
// Dans main.js
import Router from './router/Router.js';

Router.beforeEach(async (to, next) => {
  if (to.startsWith('/admin') && !store.getState().user) {
    Router.navigate('/login');
  } else {
    next();
  }
});
```

---

## Démarrage rapide

```bash
npm install
npm run dev
# → ouvre http://localhost:8080
```

> ⚠️ Le serveur doit rediriger toutes les routes vers `index.html` pour que le
> rafraîchissement de page fonctionne en mode History API.
> Avec Apache, ajouter un `.htaccess` :
> ```
> RewriteEngine On
> RewriteCond %{REQUEST_FILENAME} !-f
> RewriteRule ^ index.html [QSA,L]
> ```
> Avec Nginx : `try_files $uri /index.html;`

---

## Conventions

| Concept    | Convention                                       |
|------------|--------------------------------------------------|
| CSS        | BEM : `.block__element--modifier`                |
| JS         | ES Modules natifs (`import/export`)              |
| Views      | Objet `{ render(params), afterRender() }`        |
| Navigation | Attribut `data-link` sur tous les liens internes |
| State      | Centralisé dans `store.js`, jamais dans le DOM   |
