import { defineStore } from 'pinia';

export const useSearchStore = defineStore('search', {
  state: () => ({
    keyword: '',
    sortBy: '',
    sortOrder: 'asc',
    page: 1,
    perPage: 12,
    filters: {},
  }),
  persist: true,
  actions: {
    updateKeyword(value) {
      this.keyword = value;
      this.page = 1; // reset page saat keyword berubah
    },
    updateSort(field) {
      this.sortBy = field;
      this.page = 1; // reset page
    },
    updateSortOrder(order) {
      this.sortOrder = order;
      this.page = 1; // reset page
    },
    updatePage(newPage) {
      this.page = newPage; // ubah halaman
    },
    updatePerPage(limit) {
      this.perPage = limit;
      this.page = 1; // reset page kalau limit berubah
    },
    updateFilter(key, value) {
      this.filters = { ...this.filters, [key]: value };
      this.page = 1; // reset page saat filter berubah
    },
    resetFilters() {
      this.keyword = '';
      this.filters = {};
      this.sortBy = '';
      this.sortOrder = 'asc';
      this.page = 1;
    },
  },
  getters: {
    queryParams(state) {
      const params = new URLSearchParams();

      // Keyword pencarian
      if (state.keyword) params.append('q', state.keyword);

      // Sorting
      if (state.sortBy) params.append('sort', state.sortBy);
      if (state.sortOrder) params.append('order', state.sortOrder);

      // Pagination
      params.append('page', state.page.toString());
      params.append('limit', state.perPage.toString());

      // Dynamic filters
      Object.entries(state.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, String(value));
        }
      });

      return params.toString();
    },
  },
});
