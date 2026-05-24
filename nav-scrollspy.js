document.addEventListener('DOMContentLoaded', () => {
  const links = Array.from(document.querySelectorAll('.nav-scroll-link'));
  const sections = links
    .map((link) => {
      const href = link.getAttribute('href') || '';
      if (!href.startsWith('#')) {
        return null;
      }

      const target = document.querySelector(href);
      return target ? { link, target } : null;
    })
    .filter(Boolean);

  if (!sections.length) {
    return;
  }

  const setActive = (activeId) => {
    links.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${activeId}`;
      link.classList.toggle('active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  const updateActiveLink = () => {
    const scrollPosition = window.scrollY + 160;
    let currentSectionId = sections[0].target.id;

    for (const { target } of sections) {
      if (target.offsetTop <= scrollPosition) {
        currentSectionId = target.id;
      }
    }

    setActive(currentSectionId);
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(() => {
      updateActiveLink();
      ticking = false;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  updateActiveLink();
});
