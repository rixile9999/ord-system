(() => {
  const slides = [...document.querySelectorAll('main > .slide')];
  const links = [...document.querySelectorAll('[data-slide-link]')];
  const languages = [...document.querySelectorAll('[data-language-href]')];
  const diagrams = [...document.querySelectorAll('.diagram')];
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const played = new WeakSet();
  const timers = new Map();
  let frame = 0;

  // Keep links from the combined page and earlier editions working.
  const aliases = { planning: 'formulation', model: 'formulation', execution: 'orchestration' };
  const technologySections = new Set(['identity', 'formulation', 'optimization', 'orchestration', 'rn-ai']);
  function resolveLegacyHash() {
    const hash = location.hash.slice(1);
    const target = aliases[hash] || hash;
    const technologyHref = document.body.dataset.technologyHref;
    if (technologyHref && technologySections.has(target)) {
      location.replace(`${technologyHref}#${target}`);
      return true;
    }
    if (aliases[hash]) {
      history.replaceState(null, '', `#${target}`);
      document.getElementById(target)?.scrollIntoView({ behavior: 'instant' });
    }
    return false;
  }

  if (resolveLegacyHash()) return;

  function updateNavigation() {
    frame = 0;
    let active = slides[0];
    for (const slide of slides) {
      if (slide.getBoundingClientRect().top <= innerHeight * .42) active = slide;
    }
    for (const link of links) {
      if (link.dataset.slideLink === active.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
    for (const link of languages) link.href = `${link.dataset.languageHref}#${active.id}`;
    const length = document.documentElement.scrollHeight - innerHeight;
    document.documentElement.style.setProperty('--page-progress', length > 0 ? Math.min(1, Math.max(0, scrollY / length)) : 0);
  }

  function scheduleNavigation() {
    if (!frame) frame = requestAnimationFrame(updateNavigation);
  }

  function stopDiagram(diagram) {
    clearTimeout(timers.get(diagram));
    timers.delete(diagram);
    diagram.classList.remove('is-playing');
  }

  function playDiagram(diagram) {
    if (motion.matches) return;
    stopDiagram(diagram);
    // Restart the finite sequence for the explicit replay control.
    void diagram.offsetWidth;
    diagram.classList.add('is-playing');
    played.add(diagram);
    timers.set(diagram, setTimeout(() => stopDiagram(diagram), 3600));
  }

  function syncMotion() {
    for (const diagram of diagrams) {
      diagram.querySelector('.replay').hidden = motion.matches || !('IntersectionObserver' in window);
      if (motion.matches) stopDiagram(diagram);
    }
  }

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        if (!motion.matches) entry.target.classList.add('entered');
        revealObserver.unobserve(entry.target);
      }
    }, { threshold: .12 });
    document.querySelectorAll('.copy').forEach(copy => {
      copy.querySelectorAll('.reveal').forEach((element, index) => {
        element.style.setProperty('--reveal-delay', `${index * 90}ms`);
      });
    });
    document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

    const diagramObserver = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting && !played.has(entry.target)) playDiagram(entry.target);
        else if (!entry.isIntersecting) stopDiagram(entry.target);
      }
    }, { threshold: .25 });
    diagrams.forEach(diagram => {
      diagramObserver.observe(diagram);
      diagram.querySelector('.replay').addEventListener('click', () => playDiagram(diagram));
    });
  }

  motion.addEventListener('change', syncMotion);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) diagrams.forEach(stopDiagram);
  });
  addEventListener('scroll', scheduleNavigation, { passive: true });
  addEventListener('resize', scheduleNavigation);
  addEventListener('hashchange', () => {
    if (resolveLegacyHash()) return;
    scheduleNavigation();
  });
  syncMotion();
  updateNavigation();
})();
