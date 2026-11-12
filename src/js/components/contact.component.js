import { qs } from '../services/dom.service.js';
import { copyToClipboard } from '../services/clipboard.service.js';
import { audio } from '../services/audio.service.js';

const GITHUB_URL = 'https://github.com/Cristofer-Vargas';
// Cristofer pode adicionar seu número com DDI e DDD caso deseje direcionar para um número específico (Ex: '5555999999999')
const WHATSAPP_PHONE = '';

export function initContact() {
  const copyBtn = qs('#copy-github-btn');
  const form = qs('#contact-form');
  const statusEl = qs('#form-status');

  copyBtn?.addEventListener('click', async () => {
    audio.playCoin();
    const original = copyBtn.textContent;
    const copied = await copyToClipboard(GITHUB_URL);
    copyBtn.textContent = copied ? '✓ Link do GitHub copiado!' : GITHUB_URL;

    setTimeout(() => {
      copyBtn.textContent = original;
    }, 2400);
  });

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!statusEl) return;

    const name = qs('#contact-name')?.value.trim() || '';
    const subject = qs('#contact-subject')?.value.trim() || '';
    const message = qs('#contact-message')?.value.trim() || '';

    if (!name || !subject || !message) {
      audio.playBlip();
      statusEl.className = 'form-status is-error';
      statusEl.textContent = 'Por favor, preencha nome, assunto e mensagem.';
      return;
    }

    // Build stylized retro message for WhatsApp
    const formatted =
      `🕹️ *Contato via Portfólio*\n\n` +
      `👤 *Nome:* ${name}\n` +
      `📌 *Assunto:* ${subject}\n\n` +
      `💬 *Mensagem:*\n${message}`;

    const targetUrl = WHATSAPP_PHONE
      ? `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(formatted)}`
      : `https://api.whatsapp.com/send?text=${encodeURIComponent(formatted)}`;

    audio.playPowerup();
    statusEl.className = 'form-status is-success';
    statusEl.textContent = 'Transmissão pronta! Abrindo WhatsApp...';

    // Also copy formatted text to clipboard as safety backup
    await copyToClipboard(formatted);

    setTimeout(() => {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
      statusEl.textContent = '✓ Mensagem aberta no WhatsApp e texto copiado para sua área de transferência!';
    }, 350);
  });
}
