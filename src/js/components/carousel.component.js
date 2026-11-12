import { PROJECTS } from '../data/projects.data.js';
import { qs, escapeHtml, renderTagList } from '../services/dom.service.js';
import { bindCardReflection } from '../services/cardReflection.service.js';
import { openProjectModal } from './modal.component.js';
import { audio } from '../services/audio.service.js';

let activeProjectIndex = 1; // Starts centered on LudoVault (Desenvolvimento)

function getOrderedIndices(centerIndex, length) {
  const prev = (centerIndex - 1 + length) % length;
  const next = (centerIndex + 1) % length;
  return [prev, centerIndex, next];
}

function createProjectCardHtml(project, projectIdx, isActive) {
  const repoLinkHtml = project.githubUrl
    ? `<a href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer" class="pixel-btn project-card__btn" data-stop-card="true">GitHub ↗</a>`
    : '';

  return `
    <article
      class="project-card pixel-shadow ${isActive ? 'is-active' : ''}"
      data-index="${projectIdx}"
      tabindex="0"
      aria-label="${escapeHtml(project.category)}: ${escapeHtml(project.title)}"
    >
      <div class="project-card__reflection" aria-hidden="true"></div>
      <div class="project-card__sweep" aria-hidden="true"></div>

      <div class="project-card__header-row">
        <span class="project-card__category">${escapeHtml(project.category)}</span>
        <span class="badge-xp">SLOT 0${projectIdx + 1}</span>
      </div>

      <h3 class="project-card__title">${escapeHtml(project.title)}</h3>

      <div class="project-card__emblem">
        ${project.emblemSvg}
      </div>

      <h4 class="project-card__heading">Descrição</h4>
      <p class="project-card__desc">${escapeHtml(project.description)}</p>

      <h4 class="project-card__heading">Tecnologias</h4>
      <ul class="project-card__tags">${renderTagList(project.tags)}</ul>

      <div class="project-card__footer">
        <button
          type="button"
          class="pixel-btn project-card__btn"
          data-open-modal="${projectIdx}"
        >
          🔍 Inspecionar
        </button>
        ${repoLinkHtml}
      </div>
    </article>
  `;
}

function renderCarousel() {
  const track = qs('#carousel-track');
  const dotsContainer = qs('#carousel-dots');
  if (!track || !dotsContainer) return;

  const ordered = getOrderedIndices(activeProjectIndex, PROJECTS.length);
  track.innerHTML = ordered
    .map((idx) => createProjectCardHtml(PROJECTS[idx], idx, idx === activeProjectIndex))
    .join('');

  dotsContainer.innerHTML = PROJECTS.map((project, idx) => {
    const active = idx === activeProjectIndex;
    return `
      <button
        type="button"
        class="carousel-dot ${active ? 'is-active' : ''}"
        data-dot-index="${idx}"
        role="tab"
        aria-selected="${active}"
        aria-label="Exibir ${escapeHtml(project.title)} (${escapeHtml(project.category)})"
      ></button>
    `;
  }).join('');
}

function stepCarousel(delta) {
  activeProjectIndex = (activeProjectIndex + delta + PROJECTS.length) % PROJECTS.length;
  renderCarousel();
  audio.playBlip();
}

export function initCarousel() {
  const prevBtn = qs('#carousel-prev');
  const nextBtn = qs('#carousel-next');
  const viewport = qs('#carousel-viewport');
  const track = qs('#carousel-track');
  const dotsContainer = qs('#carousel-dots');

  renderCarousel();

  prevBtn?.addEventListener('click', () => stepCarousel(-1));
  nextBtn?.addEventListener('click', () => stepCarousel(1));

  dotsContainer?.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-dot-index]');
    if (!btn) return;
    activeProjectIndex = Number(btn.dataset.dotIndex);
    renderCarousel();
  });

  track?.addEventListener('click', (event) => {
    if (event.target.closest('[data-stop-card]')) return;

    const modalBtn = event.target.closest('[data-open-modal]');
    if (modalBtn) {
      audio.playCoin();
      const idx = Number(modalBtn.dataset.openModal);
      openProjectModal(PROJECTS[idx], modalBtn);
      return;
    }

    const card = event.target.closest('.project-card');
    if (!card) return;
    const idx = Number(card.dataset.index);
    if (idx !== activeProjectIndex) {
      activeProjectIndex = idx;
      renderCarousel();
    }
  });

  track?.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    if (event.target.closest('button, a')) return;

    const card = event.target.closest('.project-card');
    if (!card) return;
    event.preventDefault();
    const idx = Number(card.dataset.index);
    if (idx !== activeProjectIndex) {
      activeProjectIndex = idx;
      renderCarousel();
    }
  });

  bindCardReflection(track, '.project-card.is-active');

  viewport?.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      stepCarousel(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      stepCarousel(1);
    }
  });

  let touchStartX = 0;
  viewport?.addEventListener(
    'touchstart',
    (event) => {
      touchStartX = event.changedTouches[0]?.clientX ?? 0;
    },
    { passive: true }
  );

  viewport?.addEventListener(
    'touchend',
    (event) => {
      const touchEndX = event.changedTouches[0]?.clientX ?? 0;
      const deltaX = touchEndX - touchStartX;
      if (Math.abs(deltaX) > 45) {
        stepCarousel(deltaX < 0 ? 1 : -1);
      }
    },
    { passive: true }
  );
}
