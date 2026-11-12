/**
 * Subtle 3D tilt effect for active cards on hover (no mouse-trailing glow).
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
    const rx = ((0.5 - py) * 4).toFixed(2);
    const ry = ((px - 0.5) * 5).toFixed(2);

    card.style.setProperty('--rx', `${rx}deg`);
    card.style.setProperty('--ry', `${ry}deg`);
  });

  container.addEventListener(
    'pointerleave',
    (event) => {
      const card = event.target.closest?.(activeCardSelector);
      if (!card) return;
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    },
    true
  );
}
