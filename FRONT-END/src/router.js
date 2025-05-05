const routes = {
    home: '<app-home></app-home>',
    about: '<app-about></app-about>',
  };
  
  export function renderRoute() {
    const root = document.querySelector('app-root');
    const hash = location.hash.slice(2) || 'home';
    root.innerHTML = routes[hash] || '<p>404 - Halaman tidak ditemukan</p>';
  }
  