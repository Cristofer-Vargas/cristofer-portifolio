export function initProjects() {
  const filters = document.querySelector('.project-filters');
  const status = document.querySelector('#project-count');
  const cards = document.querySelectorAll('.project-card[data-category]');
  if (!filters || !status || !cards.length) return;

  const buttons = filters.querySelectorAll('[data-filter]');
  filters.hidden = false;

  filters.addEventListener('click', (event) => {
    const selected = event.target.closest('[data-filter]');
    if (!selected || selected.getAttribute('aria-pressed') === 'true') return;

    const category = selected.dataset.filter;
    for (const button of buttons) {
      button.setAttribute('aria-pressed', String(button === selected));
    }

    let visibleCount = 0;
    for (const card of cards) {
      const matches = category === 'all' || card.dataset.category.split(' ').includes(category);
      card.hidden = !matches;
      visibleCount += Number(matches);
    }

    status.textContent = visibleCount === 1 ? '1 projeto exibido.' : `${visibleCount} projetos exibidos.`;
  });
}
