const menuToggle = document.querySelector('[data-menu-toggle]');
const mainNavigation = document.querySelector('[data-navigation]');

if (menuToggle && mainNavigation) {
  const closeNavigation = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir navegação');
    mainNavigation.classList.remove('is-open');
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Abrir navegação' : 'Fechar navegação');
    mainNavigation.classList.toggle('is-open', !isOpen);
  });

  mainNavigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNavigation));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeNavigation();
  });
}

const categoryNavigation = document.querySelector('[data-menu-filters]');
const menuSections = document.querySelectorAll('[data-menu-sections] [data-category]');

if (categoryNavigation && menuSections.length) {
  categoryNavigation.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-filter]');
    if (!button) return;

    const selected = button.dataset.filter;
    categoryNavigation.querySelectorAll('button[data-filter]').forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle('is-active', isActive);
      filterButton.setAttribute('aria-pressed', String(isActive));
    });

    menuSections.forEach((section) => {
      section.hidden = selected !== 'all' && section.dataset.category !== selected;
    });
  });
}
