class FilterBar extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <div class="mb-3">
          <label>Filter modal maksimal:</label>
          <input type="number" class="form-control" placeholder="Contoh: 20000" />
        </div>
      `;
    }
  }
  customElements.define('filter-bar', FilterBar);
  