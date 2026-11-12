import { qs, qsa } from '../services/dom.service.js';
import {
  bindScrollThreshold,
  observeRevealElements,
  scrollToTop
} from '../services/scroll.service.js';

export function initBackToTopAndMeta() {
  const yearEl = qs('#current-year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  observeRevealElements(qsa('.reveal'));

  const backToTopBtn = qs('#back-to-top');
  if (!backToTopBtn) return;

  bindScrollThreshold(460, (shouldShow) => {
    backToTopBtn.hidden = !shouldShow;
  });

  backToTopBtn.addEventListener('click', scrollToTop);
}
