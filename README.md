# Santa Michael of New Mexico

Marketing & booking website for Santa Michael — a real-bearded, insured,
background-checked Santa serving New Mexico.

Plain static site: HTML + CSS + JS, **no build step**. Open `index.html` and it
works. Built on a structured design system — see
[`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md).

## Project structure

```
santa-michael-nm/
├── index.html          # markup (all content lives here)
├── css/
│   ├── tokens.css      # design tokens — theme the site here
│   ├── base.css        # reset + element defaults
│   ├── components.css  # buttons, cards, forms, panels
│   └── layout.css      # nav, hero, grids, contact, footer
├── js/
│   └── main.js         # year, scroll reveal, form submit, snow
├── photos/             # gallery images
├── DESIGN-SYSTEM.md    # token reference + how to extend
├── .editorconfig       # consistent formatting
└── .gitignore
```

## Run it locally

Just open `index.html` in a browser. For a local server (so paths behave exactly
like production):

```powershell
# Python (built into most systems)
python -m http.server 8000
# then open http://localhost:8000
```

## ✅ Things to fill in before going live

Search the project for `EDIT:` and `YOUR-` to find every placeholder.

- [x] **Web3Forms key** — contact + home-visit forms each have their own key.
- [x] **Contact email** — `santamichael.nm@gmail.com`.
- [x] **Phone number** — none posted (intentionally removed from the public
      contact section). Re-add a `tel:` contact-line in `index.html` if that changes.
- [x] **Apple Pay** — shown as "accepted" with no destination posted.
- [ ] **PayPal link** — replace `YOUR-PAYPAL-LINK` with the PayPal.me URL (in progress).
- [ ] **Social links** — replace `YOUR-FACEBOOK-URL`, `YOUR-INSTAGRAM-URL`.
- [ ] **Photos** — add images to `/photos`, swap the placeholder gallery tiles.
- [ ] **About bio** — replace the placeholder text in the About section.
- [ ] **Testimonials** — replace placeholder quotes with real ones.
- [ ] **Home-visit form** — confirm fields match the OneDrive form.
- [ ] **Open Graph URL/image** — uncomment + set in `<head>` once hosted.
- [ ] Remove the dashed `.placeholder-note` blocks once content is real.

## Deploy

This is a static site — it can be hosted free on GitHub Pages, Netlify, or Vercel.

### GitHub Pages (with custom domain support)
1. Push this folder to a GitHub repo (see below).
2. Repo **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   branch `main`, folder `/ (root)`. Save.
3. Site goes live at `https://<user>.github.io/<repo>/` in a minute or two.
4. **Custom domain:** in Settings → Pages, enter your domain (e.g.
   `santamichaelnm.com`). GitHub adds a `CNAME` file to the repo. Then at your
   domain registrar, add the DNS records GitHub shows (an `A`/`ALIAS` for the
   apex and/or a `CNAME` for `www`). HTTPS is issued automatically.

## Version control (GitHub)

```powershell
cd "santa-michael-nm"
git init
git add .
git commit -m "Initial commit: structured static site + design system"
git branch -M main
# create an empty repo on github.com first, then:
git remote add origin https://github.com/<user>/santa-michael-nm.git
git push -u origin main
```

> ⚠️ This folder lives under OneDrive. OneDrive syncing a `.git` folder can
> occasionally cause conflicts. It's usually fine for a small site, but if you
> hit odd git errors, consider moving the project outside the OneDrive folder.

### Suggested workflow
- Work on a branch per change: `git checkout -b update-photos`
- Commit small, descriptive changes.
- Open a Pull Request on GitHub to review before merging to `main`.
- With Pages set up, merging to `main` auto-publishes.
