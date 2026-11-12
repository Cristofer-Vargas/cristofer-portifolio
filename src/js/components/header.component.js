import { qs, qsa } from '../services/dom.service.js';
import { observeActiveSection } from '../services/scroll.service.js';

export function initHeader() {
  const toggleBtn = qs('#menu-toggle');
  const nav = qs('#primary-nav');
  const navLinks = qsa('.nav-link');

  if (toggleBtn && nav) {
    const closeMenu = () => {
      nav.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    };

    toggleBtn.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggleBtn.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach((link) => link.addEventListener('click', closeMenu));

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        closeMenu();
        toggleBtn.focus();
      }
    });
  }

  observeActiveSection(['tecnologias', 'projetos', 'contato'], (activeId) => {
    navLinks.forEach((link) => {
      const target = link.getAttribute('href')?.slice(1);
      link.classList.toggle('is-active', target === activeId);
    });
  });
}
