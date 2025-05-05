class AppAbout extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <section>
          <h1>Tentang Kami</h1>
          <p>Aplikasi ini dibangun dengan hash-based routing & Web Components.</p>
        </section>
      `;
    }
  }
  customElements.define('app-about', AppAbout);
  