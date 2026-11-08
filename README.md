# Shrishti Dubey: Portfolio

React + Vite + Tailwind CSS + Framer Motion. No backend.

## Run
    npm install
    npm run dev        # local
    npm run build      # production build in /dist

## Personalise
- Content, links, projects: `src/data.js`
- Photo: replace `public/profile.jpg` (a placeholder ships in the box; portrait 4:5 works best)
- Project cover images: replace `public/projects/<slug>.png` (16:10). Slugs: `beautyguide`, `digital-canteen`, `tripwiseai`, `hydra`, `imposter-desi`, `aws-sbg-sigce`, `shrishtigamesweb`, `minigamehub`
- Demo walkthrough screenshots in the modal: `public/projects/<slug>-1.png`, `-2.png`, `-3.png`. There is one per key feature in `src/data.js` (2 or 3 per project). Add or remove features there and the walkthrough follows.
- Live demos: set `live: 'https://...'` on a project
- Contact form: create a form at formspree.io, then paste the endpoint into `formEndpoint` in `src/data.js`. Until then, the form opens the visitor's email app.

## Deploy
Push to GitHub, import the repo in Vercel or Netlify. Build command `npm run build`, output `dist`.
