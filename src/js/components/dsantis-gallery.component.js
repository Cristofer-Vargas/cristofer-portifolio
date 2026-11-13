export function initDsantisGallery() {
  const filters = document.querySelector('.ds-filters');
  const status = document.querySelector('#gallery-status');
  const pieces = document.querySelectorAll('.ds-piece[data-topic]');
  const groups = document.querySelectorAll('[data-topic-group]');
  if (!filters || !status || !pieces.length || !groups.length) return;

  const buttons = filters.querySelectorAll('[data-topic]');

  filters.addEventListener('click', (event) => {
    const selected = event.target.closest('[data-topic]');
    if (!selected || selected.getAttribute('aria-pressed') === 'true') return;

    const topic = selected.dataset.topic;
    let visible = 0;

    for (const button of buttons) {
      button.setAttribute('aria-pressed', String(button === selected));
    }

    for (const group of groups) {
      group.hidden = topic !== 'all' && group.dataset.topicGroup !== topic;
    }

    for (const piece of pieces) {
      visible += Number(topic === 'all' || piece.dataset.topic === topic);
    }

    const topicName = selected.firstChild.textContent.trim();
    status.textContent = `${visible} ${visible === 1 ? 'peça exibida' : 'peças exibidas'} em ${topicName}.`;
  });
}

export function initDsantisLightbox() {
  const dialog = document.querySelector('#ds-lightbox');
  const dialogImage = dialog?.querySelector('img');
  const dialogCaption = dialog?.querySelector('figcaption');
  const close = dialog?.querySelector('.ds-lightbox__close');
  const pieces = document.querySelectorAll('.ds-piece');
  if (!dialog || !dialogImage || !dialogCaption || !close || !pieces.length) return;

  const open = (piece) => {
    const image = piece.querySelector('img');
    const category = piece.querySelector('figcaption span')?.textContent.trim();
    const title = piece.querySelector('figcaption strong')?.textContent.trim();
    if (!image) return;

    dialogImage.src = image.currentSrc || image.src;
    dialogImage.alt = image.alt;
    dialogImage.width = image.naturalWidth || image.width;
    dialogImage.height = image.naturalHeight || image.height;
    dialogCaption.textContent = category && title ? `${category} — ${title}` : image.alt;
    dialog.showModal();
  };

  for (const piece of pieces) {
    const image = piece.querySelector('img');
    if (!image) continue;

    piece.tabIndex = 0;
    piece.setAttribute('role', 'button');
    piece.setAttribute('aria-label', `Ampliar: ${image.alt}`);
    piece.addEventListener('click', () => open(piece));
    piece.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open(piece);
      }
    });
  }

  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
}
