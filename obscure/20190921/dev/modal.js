export function modal() {
  const linkButtons = document.querySelectorAll('button.open');
  for (const linkButton of linkButtons) {
    linkButton.addEventListener('click', (event) => {
      const element = event.currentTarget;
      const target = element.dataset.target;
      const link = document.querySelector(`.link-${target}`);
      link.classList.add('show');
      const detail = document.querySelector(`.detail-${target}`);
      detail.classList.add('show');
    });
  }

  const closeButtons = document.querySelectorAll('button.close');
  for (const button of closeButtons) {
    button.addEventListener('click', () => {
      const links = document.querySelectorAll('.link');
      for (const link of links) {
        link.classList.remove('show');
      }
      const details = document.querySelectorAll('.detail');
      for (const detail of details) {
        detail.classList.remove('show');
      }
    });
  }
}
