# Harrsh Goyal — personal website

A static site in plain HTML, CSS and JavaScript. It has no build step and no dependencies, and Google Fonts falls back to system fonts. It's built to host on GitHub Pages.

| File | Purpose |
|---|---|
| `index.html` | Home: summary, muEDM explainer, case studies, publications & talks, skills linked to evidence, timeline, contact |
| `cv.html` | Public CV. Its print stylesheet gives a clean PDF via *Print → Save as PDF* |
| `styles.css` | All styling. Colours are CSS variables at the top; dark mode uses `[data-theme="dark"]` |
| `script.js` | Theme toggle, project filters, draft mode |
| `charts.js` | Interactive SVG charts (emittance, phase-space ellipses) drawn from the thesis tables. Data lives at the top of each chart function |
| `projects/` | One page per in-depth case study (currently `mue1-phase-space.html`) |
| `assets/figures/` | Plots and images (see its README for the approval and quality checklist) |
| `*.pdf` | Reference material (CV, thesis, paper). **All PDFs are git-ignored and never published.** |

## Preview

```sh
python3 -m http.server 8000   # then open http://localhost:8000
```

## Draft mode

Unfinished content (missing figures, profile links, thesis and slide links) is marked `draft-only` and shows as **orange** boxes or links. It only appears when previewing locally (`file://` or `localhost`) or with `?draft` in the URL. On the published site it's hidden, so you can deploy at any point without placeholders showing.

To finish an item, fill in the real link or figure and remove `draft-only` and `todo` from its class. A full list of what's left:

```sh
grep -n 'draft-only\|TODO' index.html cv.html
```

## Adding a project

Copy an existing `<article class="case">` block in `index.html`. Fill in **Question / My role / Result**, the tags, and evidence links (DOI, code, slides). Set `data-tags` to one or more of `particle`, `cosmology`, `software` for the filters. Give it an `id` and link to it from the skills table.

## Publishing (GitHub Pages)

1. Push this repository to a public GitHub repo (name it `USERNAME.github.io` for a root URL).
2. In **Settings → Pages**, choose **Deploy from a branch** with the default branch and `/ (root)`.
3. Changes go live a minute or two after each push.
