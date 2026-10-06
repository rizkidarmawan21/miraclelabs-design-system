# Miracle UI

shadcn/ui (Radix, `radix-nova` style) themed for Miracle Labs.
Direction lives in `../DESIGN.md`; brand source is `../FInal Logo v6` (logo files copied to `public/brand/`, not modified).

```sh
npm install
npm run dev      # showcase at http://localhost:5173
npm run build
```

## Theme

All tokens live in `src/index.css`.

- **Neutral UI.** Light mode is grey `#F7F7F8` with black as the primary action. Dark mode is near-black `#0B0B0E` with white as the primary action. Default follows the system setting; the toggle is in the header.
- **v6 accents** (violet `#7B2CFF`, magenta `#E0306E`, orange `#FF7A3D`) are used only by the mark, the brand surface, the `orbit` CTA border and charts. Available as `bg-ml-violet`, `bg-ml-magenta`, `bg-ml-orange`, plus `bg-ink`.
- **Brand surface**: `dark bg-orbit-glow bg-grain`. The v6 Primary board composition at low alpha, with the v6 grain. One per screen, always dark (the `dark` class makes its children use dark tokens in both themes). Tune grain with `[--grain-opacity:0.1]`.
- **Type**: Inter Tight Variable, the wordmark face. Headings weight 500 and -0.02em tracking; display -0.03em.
- **Radius**: `0.75rem`.
- **Touch**: on coarse pointers every control gets a 44px minimum target (see the unlayered `@media (pointer: coarse)` block).

Every text/background pair in both modes passes WCAG AA.

## Additions to stock shadcn components

- `Button`: `variant="orbit"` (near-black fill, thin v6 gradient border; once per screen). `link` is always underlined, since it no longer differs from body text by color.
- `Badge`: `success`, `warning`.
- `Logo` and `OrbitMark` in `src/components/brand/logo.tsx` (the v6 mark as inline SVG, gradient or `currentColor`).

Add more components the normal way: `npx shadcn@latest add <name>`. They pick up the theme automatically.
