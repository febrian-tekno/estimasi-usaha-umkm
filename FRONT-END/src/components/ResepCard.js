class ResepCard extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <div class="card mb-3">
          <img src="${this.getAttribute('image')}" class="card-img-top" alt="${this.getAttribute('title')}" />
          <div class="card-body">
            <h5 class="card-title">${this.getAttribute('title')}</h5>
            <p>Modal: Rp${this.getAttribute('modal')}</p>
            <p>Jual: Rp${this.getAttribute('jual')}</p>
            <p>Untung: Rp${this.getAttribute('profit')}</p>
          </div>
        </div>
      `;
    }
  }
  customElements.define('resep-card', ResepCard);
  