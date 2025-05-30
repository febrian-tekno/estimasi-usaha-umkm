// stores/auth.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLogin: false,
    user: null,
  }),
  actions: {
    async fetchCurrentUser() {
      try {
        const baseUrl = import.meta.env.VITE_USER_BASE_URL;
        const response = await axios.get(`${baseUrl}/me`, {
          withCredentials: true,
        });
        if (response.data.status === 'success') {
          this.user = response.data.user;
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        this.isLogin = false;
        this.user = null;
      }
    },
  },
});
