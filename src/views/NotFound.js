/* =============================================
   NOTFOUND.JS — Vue 404
   ============================================= */

const NotFound = {
  async render() {
    return `
      <section class="container text-center" style="padding-top: var(--space-24)">
        <h1 style="font-size: 6rem; opacity: .15">404</h1>
        <h2>Page introuvable</h2>
        <p>La page que vous cherchez n'existe pas ou a été déplacée.</p>
        <a href="/" data-link class="btn btn-primary" style="margin-top: var(--space-6)">
          Retour à l'accueil
        </a>
      </section>
    `;
  },

  afterRender() {},
};

export default NotFound;
