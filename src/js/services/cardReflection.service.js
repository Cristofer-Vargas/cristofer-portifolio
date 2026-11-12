/**
 * Interactive specular reflection and subtle 3D tilt effect for active cards.
 */

export function bindCardReflection(container, activeCardSelector) {
  if (!container) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  if (prefersReducedMotion || !finePointer) return;

  container.addEventListener('pointermove', (event) => {
    const card = event.target.closest(activeCardSelector);
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const rx = ((0.5 - py) * 5).toFixed(2);
    const ry = ((px - 0.5) * 6).toFixed(2);

    card.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
    card.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
    card.style.setProperty('--shine-opacity', '0.22');
    card.style.setProperty('--rx', `${rx}deg`);
    card.style.setProperty('--ry', `${ry}deg`);
  });

  container.addEventListener(
    'pointerleave',
    (event) => {
      const card = event.target.closest?.(activeCardSelector);
      if (!card) return;
      card.style.setProperty('--shine-opacity', '0');
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    },
    true
  );
}
