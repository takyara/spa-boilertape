/* =============================================
   HOMEVIEW.JS
   ============================================= */

const HomeView = {
  async render(params) {
    return `
      <section class="hero container">
        <h1>Bienvenue 👋</h1>
        <p>Ceci est la page d'accueil de votre SPA.</p>
        <a href="/about" data-link class="btn btn-primary">En savoir plus</a>
      </section>
    `;
  },

  afterRender() {
    // Code à exécuter après l'injection dans le DOM
    // Ex: attacher des event listeners, initialiser des animations…
  },
};

export default HomeView;
