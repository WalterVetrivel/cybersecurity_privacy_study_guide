# NPTEL Cyber Security & Privacy – exam prep

A small study site for the NPTEL *Cyber Security and Privacy* course: week summaries, every assignment question with an explained answer, revision quizzes, a master quiz, a formula sheet, standards and laws tables, acronyms, and interactive diagrams. It works on desktop and mobile, offline or online.

| Folder | What it is |
| --- | --- |
| `site/` | Svelte source code ([details](site/README.md)) |
| `docs/` | The built site: one self-contained `index.html`. GitHub Pages serves this folder. |

## Use it locally

Open `docs/index.html` in a browser. It works from `file://`, with no server or internet needed.

To change the content or code:

```bash
cd site
npm install
npm run dev      # live-reloading dev server
npm run build    # rebuilds docs/index.html
```

## Publish on GitHub Pages

1. Create an empty repository on GitHub, then push this one to it:
   ```bash
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
2. On GitHub, open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, then pick branch **main** and folder **/docs**, and save.
3. After a minute the site is live at `https://<you>.github.io/<repo>/`.

To update the live site later, run `npm run build` in `site/`, then commit and push. The build uses relative paths and hash routing (`#/week/3`), so it works under any repository name with no extra configuration.

## Not in the repo

The lecture PDFs, the assignment source file and the question screenshots are listed in `.gitignore`, because a GitHub Pages repository is usually public. The questions and explanations the site needs are already in `site/src/data/`.
