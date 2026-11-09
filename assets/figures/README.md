# Figures

Current figures: `mue1-rates-by-beamtune` and `g4beamline-quadrupole-doublet` (from the MS thesis), and `muedm-apparatus-sketch-epjc2025` (EPJ C 85, 622, Fig. 2, CC BY 4.0, credited in its caption).

Put plots and images used on the site here (PNG, SVG or WebP, ideally ≤ 300 KB each and ~1600 px wide).

Checklist before adding a figure:
- **Approval:** muEDM / PSI results that haven't been published may need collaboration approval before going public. Prefer plots already in a paper, thesis, or public talk, and cite where they appeared.
- **Self-explanatory:** readable axis labels, units, and a one-sentence takeaway in the `<figcaption>`.
- **Alt text:** describe what the plot shows, not just its title.
- **Both themes:** use a white or transparent background that reads well on light and dark pages.

To replace a placeholder in `index.html`, swap the `<div class="fig-slot draft-only">…</div>` in the project's `<article>` with:

```html
<figure>
  <img src="assets/figures/NAME.png" alt="…" loading="lazy" width="1600" height="1200">
  <figcaption>Takeaway sentence. Source: … </figcaption>
</figure>
```
