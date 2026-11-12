import { qs } from '../services/dom.service.js';
import { copyToClipboard } from '../services/clipboard.service.js';

const GITHUB_URL = 'https://github.com/Cristofer-Vargas';

export function initContact() {
  const copyBtn = qs('#copy-github-btn');
  const form = qs('#contact-form');
  const statusEl = qs('#form-status');

  copyBtn?.addEventListener('click', async () => {
    const original = copyBtn.textContent;
    const copied = await copyToClipboard(GITHUB_URL);
    copyBtn.textContent = copied ? 'Link copiado!' : GITHUB_URL;

    setTimeout(() => {
      copyBtn.textContent = original;
    }, 2200);
  });

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!statusEl) return;

    const name = qs('#contact-name')?.value.trim() || '';
    const subject = qs('#contact-subject')?.value.trim() || '';
    const message = qs('#contact-message')?.value.trim() || '';

    if (!name || !subject || !message) {
      statusEl.textContent = 'Preencha nome, assunto e mensagem para continuar.';
      return;
    }

    const formatted = `Olá Cristofer!\n\nNome: ${name}\nAssunto: ${subject}\n\n${message}`;
    const copied = await copyToClipboard(formatted);
    if (copied) {
      statusEl.textContent = 'Mensagem formatada e copiada para a área de transferência!';
      form.reset();
    } else {
      statusEl.textContent = 'Mensagem validada! Copie seus dados ou entre em contato via GitHub.';
    }
  });
}
