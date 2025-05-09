import HomePage from './pages/HomePage.js';
import ResepPage from './pages/ResepPage.js';
import NotFoundPage from './pages/NotFoundPage.js';

// Menyimpan rute untuk halaman yang ada
const routes = {
  '/': HomePage,
  '/resep/:id': ResepPage,
};

// Fungsi untuk mendapatkan parameter id dari path
function getRouteParams(path) {
  const match = path.match(/\/resep\/([^/]+)/);
  return match ? { id: match[1] } : {};
}

// Fungsi untuk menavigasi halaman berdasarkan URL
async function navigate() {
  const path = location.hash.slice(1) || '/';
  const { id } = getRouteParams(path);
  const page = id ? ResepPage : routes[path] || NotFoundPage;
  const content = await page({ id });
  document.getElementById('app').innerHTML = content;
}

// Menambahkan event listener untuk menangani perubahan URL hash dan pemuatan halaman pertama kali
window.addEventListener('hashchange', navigate);
window.addEventListener('load', navigate);
