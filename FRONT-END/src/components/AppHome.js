class AppHome extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <section>
          <h1>Beranda</h1>
          <p>Selamat datang di Jual Apa!</p>
        </section>
      `;
    }
  }
  customElements.define('app-home', AppHome);
  