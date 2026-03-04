/* =============================================
   ABOUTVIEW.JS
   ============================================= */

const AboutView = {
  async render(params) {
    return `
      <section class="container">
        <h1>À propos</h1>
        <p>Présentez votre projet, votre équipe ou votre histoire ici.</p>
      </section>
    `;
  },

  afterRender() {},
};

export default AboutView;
