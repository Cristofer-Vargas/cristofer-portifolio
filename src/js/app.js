import { initHeader } from './components/header.component.js';
import { initCarousel } from './components/carousel.component.js';
import { initModal } from './components/modal.component.js';
import { initTechnologies } from './components/technologies.component.js';
import { initContact } from './components/contact.component.js';
import { initBackToTopAndMeta } from './components/backToTop.component.js';

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initCarousel();
  initModal();
  initTechnologies();
  initContact();
  initBackToTopAndMeta();
});
