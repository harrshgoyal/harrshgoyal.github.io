// Small, dependency-free SVG charts drawn from published numbers.
// Each chart renders into an element with data-chart="<name>"; the values come
// from the tables of H. Goyal, MS thesis (IISER Pune, 2025). Every chart also has
// an HTML table next to it (in <details>) carrying the same numbers.
(() => {
  const NS = 'http://www.w3.org/2000/svg';
  const el = (tag, attrs = {}, parent) => {
    const n = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
    if (parent) parent.appendChild(n);
    return n;
  };
  const text = (parent, x, y, str, attrs = {}) => { const t = el('text', { x, y, ...attrs }, parent); t.textContent = str; return t; };
  const fmt = n => n.toLocaleString('en-US', { maximumFractionDigits: 0 });

  // ---------- Tooltip (one shared element) ----------
  const tip = document.createElement('div');
  tip.className = 'chart-tip'; tip.hidden = true; tip.setAttribute('role', 'status');
  document.body.appendChild(tip);
  const show = (target, html, evt) => {
    tip.innerHTML = html; tip.hidden = false;
    const r = target.getBoundingClientRect();
    const x = evt && evt.clientX ? evt.clientX : r.left + r.width / 2;
    const y = evt && evt.clientY ? evt.clientY : r.top;
    const w = tip.offsetWidth, h = tip.offsetHeight;
    tip.style.left = Math.min(Math.max(8, x - w / 2), innerWidth - w - 8) + 'px';
    tip.style.top = (y - h - 12 < 8 ? y + 16 : y - h - 12) + 'px';
  };
  const hide = () => { tip.hidden = true; };
  const hover = (node, html) => {
    node.setAttribute('tabindex', '0');
    node.setAttribute('role', 'img');
    node.setAttribute('aria-label', html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
    node.addEventListener('pointermove', e => show(node, html, e));
    node.addEventListener('pointerleave', hide);
    node.addEventListener('focus', () => show(node, html));
    node.addEventListener('blur', hide);
  };

  // ---------- Grouped columns: emittance, Z (2024) vs U (2019) ----------
  function emittance(root) {
    const groups = [
      { label: 'New tune · x', z: 920.336, zErr: 45.405, u: 946 },
      { label: 'New tune · y', z: 213.236, zErr: 8.120, u: 716 },
      { label: 'µSR tune · x', z: 860.811, zErr: 20.670, u: 995 },
      { label: 'µSR tune · y', z: 194.441, zErr: 5.865, u: 331 },
    ];
    const W = 560, H = 300, L = 48, R = 12, T = 16, B = 44;
    const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, class: 'chart' });
    el('title', {}, svg).textContent = 'Emittance at 125 MeV/c: Z-configuration (2024, this work) vs U-configuration (2019)';
    const max = 1000, y = v => T + (H - T - B) * (1 - v / max), pw = (W - L - R) / groups.length;
    for (let v = 0; v <= max; v += 250) {
      el('line', { x1: L, x2: W - R, y1: y(v), y2: y(v), class: v ? 'grid' : 'axis' }, svg);
      text(svg, L - 8, y(v) + 4, fmt(v), { class: 'tick', 'text-anchor': 'end' });
    }
    const bw = 30, gap = 2, r = 4;
    const col = (x, v, cls) => {
      const top = y(v), base = y(0);
      return el('path', { d: `M${x},${base} V${top + r} q0,-${r} ${r},-${r} h${bw - 2 * r} q${r},0 ${r},${r} V${base} Z`, class: cls }, svg);
    };
    groups.forEach((g, i) => {
      const cx = L + pw * i + pw / 2, xz = cx - bw - gap / 2, xu = cx + gap / 2;
      const z = col(xz, g.z, 'mark s1'), u = col(xu, g.u, 'mark s2');
      // error bar on measured values
      el('line', { x1: xz + bw / 2, x2: xz + bw / 2, y1: y(g.z + g.zErr), y2: y(g.z - g.zErr), class: 'err' }, svg);
      text(svg, xz + bw / 2, y(g.z + g.zErr) - 6, fmt(g.z), { class: 'val', 'text-anchor': 'middle' });
      text(svg, cx, H - B + 18, g.label, { class: 'tick', 'text-anchor': 'middle' });
      hover(z, `<strong>${g.label}</strong><br>Z-config 2024 (this work): ${g.z.toFixed(1)} ± ${g.zErr.toFixed(1)} mm·mrad`);
      hover(u, `<strong>${g.label}</strong><br>U-config 2019: ${fmt(g.u)} mm·mrad`);
    });
    root.appendChild(svg);
  }

  // ---------- Phase-space ellipses from Twiss parameters ----------
  function ellipses(root) {
    // 125 MeV/c new beam tune at the SciFi (thesis Table 7). Units: β in mm/mrad (= m/rad), γ in mrad/mm, ε in mm·mrad.
    const planes = [
      { key: 'x', name: 'Horizontal (x, x′)', a: 0.0384, b: 0.1920, g: 5.2165, e: 920.336, cls: 'line s1', lx: 3, ly: 73, leader: false },
      { key: 'y', name: 'Vertical (y, y′)', a: -0.6219, b: 0.8420, g: 1.6470, e: 213.236, cls: 'line s2', lx: 16, ly: 24, leader: true },
    ];
    const W = 560, H = 300, L = 52, R = 16, T = 14, B = 40;
    const xr = 30, yr = 80;
    const sx = v => L + (W - L - R) * (v + xr) / (2 * xr), sy = v => T + (H - T - B) * (1 - (v + yr) / (2 * yr));
    const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, class: 'chart' });
    el('title', {}, svg).textContent = 'Transverse phase-space ellipses of the 125 MeV/c beam at the SciFi detector';
    for (let v = -yr; v <= yr; v += 40) { el('line', { x1: L, x2: W - R, y1: sy(v), y2: sy(v), class: v ? 'grid' : 'axis' }, svg); text(svg, L - 8, sy(v) + 4, String(v).replace('-', '−'), { class: 'tick', 'text-anchor': 'end' }); }
    for (let v = -xr; v <= xr; v += 10) { el('line', { y1: T, y2: H - B, x1: sx(v), x2: sx(v), class: v ? 'grid' : 'axis' }, svg); text(svg, sx(v), H - B + 18, String(v).replace('-', '−'), { class: 'tick', 'text-anchor': 'middle' }); }
    text(svg, W - R, H - 6, 'position [mm]', { class: 'tick', 'text-anchor': 'end' });
    text(svg, 12, T, 'angle [mrad]', { class: 'tick', transform: `rotate(-90 12 ${T})`, 'text-anchor': 'end' });
    planes.forEach(p => {
      const pts = [];
      for (let i = 0; i <= 180; i++) {
        const t = (i / 180) * 2 * Math.PI;
        const u = Math.sqrt(p.e * p.b) * Math.cos(t);
        const up = -Math.sqrt(p.e / p.b) * (p.a * Math.cos(t) + Math.sin(t));
        pts.push(`${sx(u).toFixed(1)},${sy(up).toFixed(1)}`);
      }
      const d = 'M' + pts.join('L') + 'Z';
      el('path', { d, class: p.cls }, svg);
      const hit = el('path', { d, class: 'hit' }, svg);
      hover(hit, `<strong>${p.name}</strong><br>ε = ${p.e.toFixed(1)} mm·mrad<br>α = ${p.a}, β = ${p.b} m/rad, γ = ${p.g} rad/m`);
      // direct label with a short leader
      const ux = Math.sqrt(p.e * p.b), uy = -Math.sqrt(p.e / p.b) * p.a;
      text(svg, sx(p.lx), sy(p.ly), p.name, { class: 'lab' });
      if (p.leader) el('line', { x1: sx(p.lx) - 3, y1: sy(p.ly) + 2, x2: sx(ux) + 3, y2: sy(uy) - 2, class: 'leader' }, svg);
    });
    root.appendChild(svg);
  }

  const charts = { emittance, ellipses };
  document.querySelectorAll('[data-chart]').forEach(n => charts[n.dataset.chart]?.(n));
})();
