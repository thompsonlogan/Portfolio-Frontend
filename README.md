# Portfolio — Frontend

Logan Thompson's personal portfolio site. A single-page, dark-first site with a
terminal-style hero, a live GitHub activity section (repos, languages, and a
contribution heatmap pulled from the [backend API](https://github.com/thompsonlogan/Portfolio-Backend)),
and lightweight first-party visit analytics.

## Tech stack

- **React 19** + **TypeScript**, bundled with **Vite 7**
- **TanStack Router** (file-based routes) and **TanStack Query** for data fetching/caching
- **Tailwind CSS v4** (CSS-first config) for styling
- **shadcn/ui** components built on **Base UI** (`@base-ui/react`) primitives
- **lucide-react** icons
- A generated **typescript-fetch** API client (`src/services/generated`) for the Go backend

## Getting started

Prerequisites: **Node 18+** and the [Portfolio-Backend](https://github.com/thompsonlogan/Portfolio-Backend)
running locally (for the GitHub section and analytics).

```bash
npm install
cp .env.example .env   # then fill in the values below
npm run dev            # http://localhost:5173
```

### Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite dev server (HMR)      |
| `npm run build`   | Production build to `dist/`          |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint                           |

## Environment variables

Configured via a git-ignored `.env` (Vite exposes only `VITE_`-prefixed vars):

| Variable                   | Description                                     |
| -------------------------- | ----------------------------------------------- |
| `VITE_API_BASE_URL`        | Base URL of the backend API (e.g. `http://localhost:8080`) |
| `VITE_GITHUB_URL`          | GitHub profile URL                              |
| `VITE_LINKEDIN_URL`        | LinkedIn profile URL                            |
| `VITE_RESUME_DOWNLOAD_URL` | Resume PDF/export URL for the download buttons  |

## Project structure

```
src/
  routes/            File-based routes (TanStack Router)
  components/
    portfolio/       Page sections (hero, about, work, github, connect, …)
    ui/              shadcn/ui components (Base UI primitives)
  queries/           TanStack Query hooks (GitHub data)
  mutations/         Analytics visit-tracking mutations
  services/
    generated/       Auto-generated API client — do not edit by hand
  data/              Static content (work history, nav, stack)
  hooks/             Shared hooks (scroll spy, theme)
```

## API client

`src/services/generated` is generated from the backend's OpenAPI spec — don't
edit it by hand. To regenerate after backend API changes:

```bash
npx @openapitools/openapi-generator-cli generate \
  -i ../Portfolio-Backend/docs/swagger.json \
  -g typescript-fetch \
  -o src/services/generated
```
