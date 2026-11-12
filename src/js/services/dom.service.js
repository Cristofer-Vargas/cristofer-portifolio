/**
 * DOM utilities for safe HTML serialization and reusable fragment rendering.
 */

export function qs(selector, root = document) {
  return root.querySelector(selector);
}

export function qsa(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

export function escapeHtml(value) {
  const div = document.createElement('div');
  div.textContent = String(value ?? '');
  return div.innerHTML;
}

export function renderTagList(tags) {
  return tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join('');
}
