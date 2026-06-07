# Design System

The site is built on **design tokens** — named values for every color, space,
font size, radius, and shadow. They live in [`css/tokens.css`](css/tokens.css)
and are the single source of truth. Change a token once and the whole site
updates. **Never hardcode a raw value in a component — reference a token.**

## The layers

| File | Responsibility |
|------|----------------|
| `css/tokens.css` | All design tokens (the "variables"). Theme the site here. |
| `css/base.css` | Reset + element defaults (`body`, `h1`–`h3`, background layers). |
| `css/components.css` | Reusable pieces: buttons, cards, forms, panels, quotes. |
| `css/layout.css` | Page regions: nav, hero, grids, contact split, footer. |

Load order matters and is set in `index.html`: **tokens → base → components → layout.**

## Token reference

### Color
Two tiers. **Primitives** are the raw palette (`--c-gold-400`). **Semantic**
tokens give them meaning (`--color-accent`) — *use the semantic ones in your CSS.*

| Token | Use |
|-------|-----|
| `--color-bg`, `--color-bg-alt` | Page backgrounds |
| `--color-text`, `--color-text-dim` | Body text, muted text |
| `--color-accent`, `--color-accent-soft` | Gold — primary accent |
| `--color-brand`, `--color-brand-deep` | Red — secondary brand |
| `--surface`, `--surface-hover`, `--surface-line` | Card/panel fills & borders |
| `--surface-input` | Form field background |
| `--gradient-accent` | Gold→red button gradient |
| `--color-success-*`, `--color-error-*` | Form feedback states |

### Typography
- Families: `--font-display` (Fraunces, headings) · `--font-body` (Hanken Grotesk).
- Weights: `--weight-regular` … `--weight-black`.
- Sizes: `--text-xs` … `--text-xl`, plus fluid `--text-2xl` (h2) and `--text-3xl` (h1).

### Spacing
4px-based scale: `--space-2xs` (0.4rem) → `--space-3xl` (5rem).
Section rhythm: `--section-pad`.

### Radius
`--radius-sm` (11px) → `--radius-xl` (22px), plus `--radius-pill` for buttons.

### Shadow
`--shadow-soft` (buttons), `--shadow-hover`, `--shadow-panel` (forms/cards).

### Layout / motion / z-index
`--container`, `--container-narrow`, `--gutter`, `--nav-height` ·
`--transition`, `--ease` · `--z-bg`, `--z-fx`, `--z-nav`.

## How to…

**Re-theme the colors** — edit the semantic tokens in `tokens.css`. Example, a
blue "winter night" theme:
```css
--color-accent: #8fb8e0;
--color-brand:  #4f7fb5;
```

**Add a new component** — add a block to `components.css`, referencing tokens:
```css
.badge {
  background: var(--surface);
  border: 1px solid var(--surface-line);
  border-radius: var(--radius-pill);
  padding: var(--space-2xs) var(--space-md);
  font-size: var(--text-sm);
}
```

**Add a token** — define it in `tokens.css` (primitive if it's a new raw value,
semantic if it's a new role), then reference it. Document it in the table above.

## Conventions
- One concern per file; keep the load order intact.
- Semantic tokens in components; primitives only inside `tokens.css`.
- Breakpoints (560 / 820 / 880px) are duplicated in `layout.css` media queries
  and noted at the bottom of `tokens.css` — keep them in sync.
- 2-space indent, kebab-case class names (enforced by `.editorconfig`).
