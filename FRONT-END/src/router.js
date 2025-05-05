import HomePage from './pages/HomePage.js';
import ResepPage from './pages/ResepPage.js';
import NotFoundPage from './pages/NotFoundPage.js';

const routes = {
  '/': HomePage,
  '/resep': ResepPage,
};

function navigate() {
  const path = location.hash.slice(1) || '/';
  const page = routes[path] || NotFoundPage;
  document.getElementById('app').innerHTML = page();
}

window.addEventListener('hashchange', navigate);
window.addEventListener('load', navigate);
