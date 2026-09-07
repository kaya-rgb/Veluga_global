(() => {
  const embedded = window.parent !== window;
  const board = document.querySelector('.artboard');
  const motion = document.querySelector('.hero-motion');
  const motionToggle = motion?.querySelector('.motion-toggle');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let motionPaused = false;
  let motionVisible = false;
  function updateMotion() {
    if (!motion || !motionToggle) return;
    const still = reducedMotion.matches;
    motion.dataset.motion = still ? 'still' : !motionPaused && motionVisible && !document.hidden ? 'playing' : 'paused';
    motionToggle.hidden = still;
    motionToggle.setAttribute('aria-pressed', String(motionPaused));
    motionToggle.querySelector('span').textContent = motionPaused ? '모션 재생하기' : '모션 멈추기';
    motionToggle.querySelector('path').setAttribute('d', motionPaused ? 'm7 4 9 6-9 6V4Z' : 'M7 5v10M13 5v10');
  }
  motionToggle?.addEventListener('click', () => { motionPaused = !motionPaused; updateMotion(); });
  if (motion) new IntersectionObserver(entries => {
    motionVisible = entries[0].isIntersecting;
    updateMotion();
  }, { threshold: 0.15 }).observe(motion);
  reducedMotion.addEventListener('change', updateMotion);
  document.addEventListener('visibilitychange', updateMotion);
  updateMotion();

  const capabilityTabs = [...document.querySelectorAll('.capability-tabs [role="tab"]')];
  const capabilityPanels = [...document.querySelectorAll('.capability-panel')];
  function selectCapability(id, focus = false) {
    if (!capabilityPanels.some(panel => panel.id === id)) return;
    capabilityPanels.forEach(panel => { panel.hidden = panel.id !== id; });
    capabilityTabs.forEach(tab => {
      const selected = tab.getAttribute('aria-controls') === id;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && focus) tab.focus();
    });
  }
  capabilityTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectCapability(tab.getAttribute('aria-controls')));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowDown') next = (index + 1) % capabilityTabs.length;
      if (event.key === 'ArrowUp') next = (index + capabilityTabs.length - 1) % capabilityTabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = capabilityTabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      selectCapability(capabilityTabs[next].getAttribute('aria-controls'), true);
    });
  });
  // Reveal a deep-linked panel before the preview calculates its scroll position.
  board.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (link) selectCapability(link.hash.slice(1));
  }, { capture: true });
  function restoreCapabilityHash() { selectCapability(window.location.hash.slice(1)); }
  window.addEventListener('hashchange', restoreCapabilityHash);
  restoreCapabilityHash();
  function sendHeight() {
    if (embedded) window.parent.postMessage({type:'wireframe:height',height:Math.ceil(board.getBoundingClientRect().height)},window.location.origin);
  }
  document.fonts.ready.then(() => {
    document.documentElement.dataset.fontReady = String(document.fonts.check('500 16px Pretendard'));
    sendHeight();
  });
  new ResizeObserver(sendHeight).observe(board);
  document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    if (embedded) {
      event.preventDefault();
      window.parent.postMessage({type:'wireframe:navigate',top:target.offsetTop},window.location.origin);
    }
  }));
  window.addEventListener('message', event => {
    if(event.origin !== window.location.origin || event.source !== window.parent) return;
    if(event.data?.type === 'wireframe:grid') document.body.classList.toggle('show-grid',Boolean(event.data.enabled));
    if(event.data?.type === 'wireframe:measure') sendHeight();
  });
  const caseSlides = Array.from(document.querySelectorAll('[data-case-slide]'));
  const caseDots = Array.from(document.querySelectorAll('[data-case-index]'));
  function showCase(index) {
    caseSlides.forEach((slide, i) => slide.hidden = i !== index);
    caseDots.forEach((dot, i) => dot.setAttribute('aria-current', String(i === index)));
    sendHeight();
  }
  caseDots.forEach((dot, index) => {
    dot.addEventListener('click', () => showCase(index));
    dot.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % caseDots.length;
      if (event.key === 'ArrowLeft') next = (index + caseDots.length - 1) % caseDots.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = caseDots.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      showCase(next);
      caseDots[next].focus();
    });
  });
  const dialog = document.getElementById('talent-dialog');
  document.getElementById('talent-open').addEventListener('click', () => {
    if(embedded){window.parent.postMessage({type:'wireframe:talent'},window.location.origin);return;}
    dialog.showModal();
  });
  document.getElementById('talent-close').addEventListener('click', () => dialog.close());
  document.getElementById('talent-form').addEventListener('submit', e => e.preventDefault());
  let timer;
  document.querySelectorAll('[data-notice]').forEach(button => button.addEventListener('click', () => {
    const message = button.dataset.notice;
    if(embedded){window.parent.postMessage({type:'wireframe:notice',message},window.location.origin);return;}
    const notice = document.getElementById('notice');notice.textContent=message;notice.hidden=false;
    clearTimeout(timer);timer=setTimeout(() => notice.hidden=true,4000);
  }));
})();
