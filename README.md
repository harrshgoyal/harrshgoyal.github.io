# Harrsh Goyal — Personal Website

A responsive, interactive personal site built with plain HTML, CSS, and JavaScript. It has no build step, package manager, or paid dependencies. Google Fonts are loaded when online; system fonts are used as fallbacks. Personal and project information is summarized from the CV provided in this directory. LinkedIn is linked as an external profile.

## Preview it locally

Open `index.html` in a browser, or from this directory run:

```sh
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Make it yours

Edit `index.html` to update the home page and `cv.html` to update the public CV. Adjust colors, spacing, and responsive styles in `styles.css`. The theme switch remembers its choice in the browser, and project filters work without a server.

`CV_HG.pdf` is the original source file and is excluded by `.gitignore`. The website displays a public CV page in `cv.html` that omits the home address, phone number, date of birth, and referee details.

## Free public hosting with GitHub Pages

GitHub Pages can host this static site at a public URL at no cost for a public repository. The files intended for publication are `index.html`, `cv.html`, `styles.css`, `script.js`, and `.nojekyll`:

1. Create a public repository on GitHub (for a personal URL, name it `YOUR-USERNAME.github.io`).
2. Add the website files to the repository root. The original `CV_HG.pdf` is excluded from Git by `.gitignore`; do not force-add it.
3. In the repository, open **Settings → Pages** and select **Deploy from a branch**, then choose the default branch and `/ (root)`.
4. GitHub will show the published URL in the Pages settings after deployment.

A custom domain is optional and may have a separate registration cost. After publishing, edits made in this workspace reach the live site when the updated website files are pushed to the repository.
