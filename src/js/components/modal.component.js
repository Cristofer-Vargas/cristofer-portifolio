import { qs, escapeHtml, renderTagList } from '../services/dom.service.js';

let lastFocusedElement = null;

export function openProjectModal(project, triggerEl) {
  const modal = qs('#project-modal');
  const categoryEl = qs('#modal-category');
  const titleEl = qs('#modal-title');
  const previewEl = qs('#modal-preview');
  const descEl = qs('#modal-desc');
  const tagsEl = qs('#modal-tags');
  const actionsEl = qs('#modal-actions');
  const closeBtn = qs('#modal-close');

  if (!modal || !project) return;
  lastFocusedElement = triggerEl || document.activeElement;

  categoryEl.textContent = project.category;
  titleEl.textContent = project.title;
  previewEl.innerHTML = `${project.emblemSvg}<span>${escapeHtml(project.category)} · ${escapeHtml(project.title)}</span>`;
  descEl.textContent = project.description;
  tagsEl.innerHTML = renderTagList(project.tags);
  actionsEl.innerHTML = project.githubUrl
    ? `<a href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer" class="pixel-btn pixel-btn--primary">Abrir Repositório no GitHub</a>`
    : `<button type="button" class="pixel-btn pixel-btn--primary" data-close-modal="true">Fechar</button>`;

  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  closeBtn?.focus();
}

export function closeProjectModal() {
  const modal = qs('#project-modal');
  if (!modal || modal.hidden) return;

  modal.hidden = true;
  document.body.style.overflow = '';

  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus();
  }
}

export function initModal() {
  const modal = qs('#project-modal');
  const closeBtn = qs('#modal-close');
  if (!modal) return;

  closeBtn?.addEventListener('click', closeProjectModal);
  modal.addEventListener('click', (event) => {
    if (event.target.closest('[data-close-modal="true"]')) {
      closeProjectModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) {
      closeProjectModal();
    }
  });
}
