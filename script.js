// Theme toggle, draft mode, and project filters. No dependencies.
(() => {
  const root = document.documentElement;

  // --- Theme (initial value is set by the inline script in <head>) ---
  const toggle = document.querySelector('.theme-toggle');
  const syncToggle = () => {
    const dark = root.dataset.theme === 'dark';
    toggle?.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
  };
  toggle?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch {}
    syncToggle();
  });
  syncToggle();

  // --- Draft mode: show placeholders only when previewing locally ---
  const local = location.protocol === 'file:' || ['localhost', '127.0.0.1', ''].includes(location.hostname);
  if (local || new URLSearchParams(location.search).has('draft')) {
    root.classList.add('draft');
    const banner = document.createElement('div');
    banner.className = 'draft-banner';
    banner.innerHTML = '<div class="wrap">Draft preview: orange boxes and links are placeholders and are hidden on the published site. See README.md.</div>';
    document.body.prepend(banner);
  }

  // --- Project filters ---
  const buttons = [...document.querySelectorAll('.filters button')];
  const cases = [...document.querySelectorAll('.case')];
  buttons.forEach(btn => btn.addEventListener('click', () => {
    const f = btn.dataset.filter;
    buttons.forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    cases.forEach(c => { c.hidden = f !== 'all' && !c.dataset.tags.split(' ').includes(f); });
  }));

  // --- Footer year ---
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
})();
