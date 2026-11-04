# Ben-Chi Ma — academic website

Source for <https://benz666.github.io/>: a single-page academic site built with
[Jekyll](https://jekyllrb.com/) (no theme gem) and deployed by GitHub Actions to GitHub Pages.
The only external runtime dependencies are Google Fonts and D3 v7 (cdnjs) for the skills graph;
the page stays fully readable without them.

## Repository layout

| Path | What it is |
|---|---|
| `_data/*.yml` | **Content.** Almost every update is an edit here. |
| `_includes/bio.md` | Bio text (Markdown). |
| `_projects/*.md` | One file per research project: front matter = card + detail page, body = extra notes. |
| `_data/graph/nodes.json`, `edges.json` | Research & Skills Graph data. |
| `_includes/sections/*.html` | One template per home-page section. |
| `_includes/*.html` | Small components (icons, author list, BibTeX entry, dates, news item). |
| `_layouts/` | `default.html` (page frame), `project.html` (project detail page). |
| `index.html` | Section order of the home page. |
| `assets/css/site.css` | All styles; colors are CSS variables at the top (light and dark). |
| `assets/js/site.js` | Theme toggle, publication filters, BibTeX copy, active nav item. |
| `assets/js/graph.js` | Graph rendering only (reads `/assets/data/graph.json`). |
| `assets/img/`, `assets/cv/` | Photo, favicon, public CV PDF. |
| `publications.bib`, `assets/data/graph.json` | Generated from `_data/`; do not edit by hand. |
| `.github/workflows/pages.yml` | Build and deploy workflow. |

## Updating content

Edit the file, run the local preview (below), then commit and push. The site rebuilds automatically.

| Section | File | Notes |
|---|---|---|
| Header, links, contact | `_data/profile.yml` | Empty `url` hides a link. Never add a phone number or home address. |
| Bio | `_includes/bio.md` | Plain Markdown. |
| Education | `_data/education.yml` | Newest first. |
| Research interests | `_data/interests.yml` | `graph:` = node id in the graph (adds a "See in graph" link). |
| Research projects | `_projects/<id>.md` | `group: phd` or `earlier`; `order` sets position; optional `sponsor`, `code`, `image`. Do not add unpublished numbers. |
| Publications | `_data/publications.yml` | Newest first. `status`: published / accepted / submitted / preprint. `project:` links a paper to a project file id. BibTeX is generated. Add `pdf:` only for files you may share publicly. |
| Teaching | `_data/teaching.yml` | `role` must describe what you actually did. |
| Internships | `_data/internships.yml` | |
| News | `_data/news.yml` | `date` as `YYYY-MM-DD`, `YYYY-MM` or `YYYY`; `tag`: talk / poster / award / career / publication. Items older than last year fold into "Earlier news" automatically. Quote a `text` that starts with `**`. |
| Talks | `_data/talks.yml` | `type`: oral / poster / invited / technical / guest-lecture. |
| CV | `assets/cv/CV_Ben-Chi_Ma.pdf` + `cv_updated` in `profile.yml` | Use the **public** build of the CV (no phone number), see below. |
| Skills graph | `_data/graph/nodes.json`, `edges.json` | See next section. |

### Skills graph data

- **Node**: `{ "id", "label", "group", "description", "links"? }` with `group` one of `domain`, `method`,
  `tool`, `project`. `links` entries are `{ "label", "url" }`; URLs may be `/projects/<id>/`,
  `#pub-<key>`, `#talks` or absolute.
- **Edge**: `{ "source", "target", "relation" }` using node ids. `relation` is shown in the detail panel
  ("source *relation* target", e.g. `VASP implements Density functional theory`).
- Only add an edge when a project, paper, talk or CV entry backs it. There are deliberately no skill levels.
- The list version under the graph is generated from the same files, so it never goes out of sync.

### Public CV PDF

The CV source lives outside this repository (`~/Documents/Areas/CV_update/CV_Ben-Chi.tex`). It has a switch that
drops the phone number:

```bash
cd ~/Documents/Areas/CV_update
latexmk -xelatex -jobname=CV_public -usepretex='\def\publicversion{}' CV_Ben-Chi.tex
cp CV_public.pdf ~/Documents/Projects/Benz666.github.io/assets/cv/CV_Ben-Chi_Ma.pdf
```

## Local preview

On this machine Ruby comes from a conda environment (the system Ruby lacks development headers):

```bash
cd ~/Documents/Projects/Benz666.github.io
export PATH=~/miniconda3/envs/jekyll/bin:$PATH
bundle install            # first time only; installs into vendor/bundle
bundle exec jekyll serve  # http://127.0.0.1:4000/
```

Elsewhere: install Ruby 3.x with headers, then `bundle install` and `bundle exec jekyll serve`.

## Deployment (GitHub Pages)

1. Create the public repository **`Benz666/Benz666.github.io`** on GitHub (empty, no README).
2. Push this repository:
   ```bash
   git remote add origin git@github.com:Benz666/Benz666.github.io.git
   git add -A && git commit -m "Initial site"
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. The *Deploy site* workflow runs on every push to `main`; the site appears at <https://benz666.github.io/>.

All paths go through Jekyll's `relative_url`, so the site also works from a project repository
(set `baseurl: "/<repo>"` in `_config.yml`; the workflow passes the right base path automatically).

**Custom domain later:** add a `CNAME` file containing the domain, set `url` in `_config.yml`, configure DNS
as described in GitHub's Pages documentation, then enable *Enforce HTTPS*.

The site does not depend on the NAS. Keep backups there if you like, but GitHub is the source of truth for the public site.

## Maintenance checklist

- After adding a paper: update `publications.yml`, link it to a project if relevant, add a News item, refresh the CV PDF.
- After a talk: add it to `talks.yml` and a one-line item to `news.yml`.
- Check before publishing: no unpublished numerical results, no confidential collaborator code or names of private repositories, no phone numbers.
- Run `bundle exec jekyll build` locally; it fails loudly on YAML mistakes.
- Optional link check: `bundle exec jekyll build && npx linkinator _site --recurse` (not installed by default).

## Possible next steps

- Figures for projects once papers are out (`image`, `image_alt`, `image_caption` in the project front matter).
- Google Scholar citation counts (manual or a scheduled workflow).
- A "Software" section if a public repository (e.g. a JAX-BTE contribution) becomes citable.
- `jekyll-sitemap` / structured data for search engines.
