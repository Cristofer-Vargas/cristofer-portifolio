/**
 * Scroll and viewport observation utilities (active nav tracking, reveal, scroll-to-top).
 */

export function observeActiveSection(sectionIds, onActiveChange) {
  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if (!('IntersectionObserver' in window) || sections.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onActiveChange(entry.target.id);
        }
      });
    },
    { rootMargin: '-35% 0px -55% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

export function observeRevealElements(elements, visibleClass = 'is-visible') {
  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add(visibleClass));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add(visibleClass);
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.08 }
  );

  elements.forEach((el) => observer.observe(el));
}

export function bindScrollThreshold(thresholdY, onToggle) {
  const handleScroll = () => onToggle(window.scrollY >= thresholdY);
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
