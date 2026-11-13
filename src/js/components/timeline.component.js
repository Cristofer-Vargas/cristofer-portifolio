export function initTimeline() {
  const timeline = document.querySelector('#trajetoria');
  const dialog = timeline?.querySelector('#timeline-dialog');
  if (typeof dialog?.showModal !== 'function') return;

  const dialogCategory = dialog.querySelector('.timeline-dialog-category');
  const dialogTitle = dialog.querySelector('#timeline-dialog-title');
  const dialogOrg = dialog.querySelector('.timeline-dialog-org');
  const dialogDate = dialog.querySelector('.timeline-dialog-date');
  const dialogDetails = dialog.querySelector('.timeline-dialog-details');

  for (const list of timeline.querySelectorAll('.timeline-list')) {
    const category = list.parentElement.querySelector('.timeline-label').textContent;

    for (const item of list.children) {
      const title = item.querySelector('h4');
      const org = item.querySelector('.timeline-org');
      const date = item.querySelector('.timeline-date');
      const details = item.querySelector('.timeline-details');
      const tags = item.querySelector('.timeline-tags');
      const trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'timeline-trigger';
      trigger.textContent = title.textContent;
      trigger.setAttribute('aria-haspopup', 'dialog');
      trigger.setAttribute('aria-controls', dialog.id);
      title.replaceChildren(trigger);

      const openDialog = () => {
        dialogCategory.textContent = category;
        dialogTitle.textContent = trigger.textContent;
        dialogOrg.textContent = org.textContent;
        dialogDate.replaceChildren(...date.cloneNode(true).childNodes);
        dialogDetails.replaceChildren(details.content.cloneNode(true));
        if (tags) dialogDetails.append(tags.cloneNode(true));
        trigger.focus({ preventScroll: true });
        dialog.showModal();
        dialog.scrollTop = 0;
      };

      trigger.addEventListener('click', openDialog);
      item.addEventListener('click', (event) => {
        if (event.target.closest('.timeline-trigger, a')) return;
        openDialog();
      });
    }
  }

  let pressedBackdrop = false;
  dialog.addEventListener('pointerdown', (event) => {
    pressedBackdrop = event.target === dialog;
  });
  dialog.addEventListener('click', (event) => {
    if (pressedBackdrop && event.target === dialog) dialog.close();
  });
}
