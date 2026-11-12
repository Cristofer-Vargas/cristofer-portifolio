import { qs, qsa } from '../services/dom.service.js';
import { observeActiveSection } from '../services/scroll.service.js';
import { audio } from '../services/audio.service.js';

export function initHeader() {
  const toggleBtn = qs('#menu-toggle');
  const nav = qs('#primary-nav');
  const navLinks = qsa('.nav-link');
  const sfxBtn = qs('#sfx-toggle');
  const sfxLabel = qs('#sfx-label');

  // SFX Toggle Setup
  if (sfxBtn) {
    const updateSfxUI = (muted) => {
      sfxBtn.classList.toggle('is-muted', muted);
      if (sfxLabel) {
        sfxLabel.textContent = muted ? 'SFX: OFF' : 'SFX: ON';
      }
    };

    updateSfxUI(audio.isMuted());

    sfxBtn.addEventListener('click', () => {
      const isMuted = audio.toggleMute();
      updateSfxUI(isMuted);
    });
  }

  // Mobile Menu Toggle
  if (toggleBtn && nav) {
    const closeMenu = () => {
      nav.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    };

    toggleBtn.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggleBtn.setAttribute('aria-expanded', String(isOpen));
      audio.playBlip();
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        audio.playCoin();
        closeMenu();
      });
      link.addEventListener('mouseenter', () => {
        audio.playBlip();
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        closeMenu();
        toggleBtn.focus();
      }
    });
  }

  observeActiveSection(['sobre', 'trajetoria', 'projetos', 'tecnologias', 'contato'], (activeId) => {
    navLinks.forEach((link) => {
      const target = link.getAttribute('href')?.slice(1);
      link.classList.toggle('is-active', target === activeId);
    });
  });
}
