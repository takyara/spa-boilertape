/* =============================================
   FOOTER.JS — Composant footer permanent
   ============================================= */

const Footer = {
  mount(selector) {
    const el = document.querySelector(selector);
    if (!el) return;
    el.innerHTML = this._template();
  },

  _template() {
    const year = new Date().getFullYear();
    return `
      <footer class="footer" role="contentinfo">
        <div class="container">
          <p>© ${year} MonSite — Tous droits réservés</p>
        </div>
      </footer>
    `;
  },
};

export default Footer;
