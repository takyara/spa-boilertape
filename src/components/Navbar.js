/* =============================================
   NAVBAR.JS — Composant navigation permanent
   ============================================= */
import Router from '../router/Router.js';

const Navbar = {
  mount(selector) {
    const el = document.querySelector(selector);
    if (!el) return;

    el.innerHTML = this._template();
    this._bindEvents(el);
  },

  _template() {
    return `
      <nav class="nav" role="navigation" aria-label="Navigation principale">
        <div class="nav__inner container">
          <a href="/" data-link class="nav__logo" aria-label="Accueil">MonSite</a>

          <!-- Liens desktop -->
          <ul class="nav__links" role="list">
            <li><a href="/"        data-link class="nav__link">Accueil</a></li>
            <li><a href="/about"   data-link class="nav__link">À propos</a></li>
            <li><a href="/contact" data-link class="nav__link">Contact</a></li>
          </ul>

          <!-- Burger mobile -->
          <button class="nav__burger" aria-label="Menu" aria-expanded="false" aria-controls="mobile-menu">
            <span></span><span></span><span></span>
          </button>
        </div>

        <!-- Menu mobile -->
        <div class="nav__mobile" id="mobile-menu" hidden>
          <ul role="list">
            <li><a href="/"        data-link class="nav__link">Accueil</a></li>
            <li><a href="/about"   data-link class="nav__link">À propos</a></li>
            <li><a href="/contact" data-link class="nav__link">Contact</a></li>
          </ul>
        </div>
      </nav>
    `;
  },

  _bindEvents(el) {
    const burger  = el.querySelector('.nav__burger');
    const mobileMenu = el.querySelector('.nav__mobile');

    // Toggle menu burger
    burger?.addEventListener('click', () => {
      const isOpen = !mobileMenu.hidden;
      mobileMenu.hidden = isOpen;
      burger.setAttribute('aria-expanded', String(!isOpen));
    });

    // Fermer le menu mobile après navigation
    el.querySelectorAll('[data-link]').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.hidden = true;
        burger?.setAttribute('aria-expanded', 'false');
      });
    });
  },
};

export default Navbar;
