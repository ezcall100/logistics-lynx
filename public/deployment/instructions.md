# Deployment Instructions (React + Vite + Tailwind)

## 1. Scaffold Project

```bash
npm create vite@latest transbot-site -- --template react-ts
cd transbot-site
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm i clsx tailwind-merge lucide-react
```

## 2. Configure Tailwind

- Replace generated `tailwind.config.cjs` with the one in `/style-guide/tailwind.config.cjs`.
- Add `/style-guide/src/index.css` to your `src/index.css`.

## 3. Routing + Content

- Copy `/content/**` into your project (e.g., `/src/content/`).
- Add `nav.json` and build your navbar and routes from it.
- Render markdown using your preferred MD/MDX renderer (e.g., `marked`, `react-markdown`, or `mdx-bundler`).

## 4. Pages

- Map each `content/**/*.md` file to a route defined in `nav.json` (slug in frontmatter).
- Home: `/content/home.md` → `/`

## 5. Global CTAs

- Place **Sign In**, **Sign Up**, **Contact Us** buttons on the topbar and footer.
- Link Sign In → `/signin`, Sign Up → `/signup`, Contact → `/company/contact`.

## 6. Build & Deploy

```bash
npm run build
# Deploy the `dist/` folder to your hosting (Vercel, Netlify, Cloudflare, S3 + CloudFront, etc.)
```
