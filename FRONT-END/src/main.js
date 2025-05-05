import { renderRoute } from './router.js';
import './components/AppHome.js';
import './components/AppAbout.js';

window.addEventListener('load', renderRoute);
window.addEventListener('hashchange', renderRoute);
