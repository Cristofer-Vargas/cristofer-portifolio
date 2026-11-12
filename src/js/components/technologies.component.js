import { TECHNOLOGIES } from '../data/technologies.data.js';
import { qs, qsa, escapeHtml } from '../services/dom.service.js';

function renderTechnologies(filter = 'all') {
  const grid = qs('#tech-grid');
  if (!grid) return;

  const list =
    filter === 'all'
      ? TECHNOLOGIES
      : TECHNOLOGIES.filter((item) => item.category === filter);

  grid.innerHTML = list
    .map(
      (tech) => `
      <div class="tech-item">
        <div class="tech-item__top">
          <i class="${escapeHtml(tech.icon)} tech-item__icon" aria-hidden="true"></i>
          <span class="tech-item__name">${escapeHtml(tech.name)}</span>
        </div>
        <span class="tech-item__cat">${escapeHtml(tech.label)}</span>
      </div>
    `
    )
    .join('');
}

export function initTechnologies() {
  const filterBar = qs('#tech-filters');
  renderTechnologies('all');
  if (!filterBar) return;

  filterBar.addEventListener('click', (event) => {
    const btn = event.target.closest('.filter-btn');
    if (!btn) return;

    const selected = btn.dataset.filter || 'all';
    qsa('.filter-btn', filterBar).forEach((button) => {
      const isCurrent = button === btn;
      button.classList.toggle('is-active', isCurrent);
      button.setAttribute('aria-selected', String(isCurrent));
    });

    renderTechnologies(selected);
  });
}
