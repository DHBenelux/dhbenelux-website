# Digital Humanities BeNeLux

The DH BeNeLux website is a Next.js application for publishing conference history, news, journal volumes, and broader community milestones in one place.

Repository: https://github.com/DHBenelux/dhbenelux-website

This repository currently centers on a **single event-driven content model** in `content/events`, plus generated search data. This README reflects that current structure and the contributor workflow used in this project.

## What the project covers

- **Public site pages** for the homepage, about page, conferences, news, timeline, and search
- **Structured content** for conferences, announcements, journal volumes, milestones, and partnerships
- **Search indexing** generated from site content before production builds
- **Proceedings links** stored directly on conference entries when available

## Tech stack

- **Framework:** Next.js 16
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI primitives:** Radix UI + shadcn/ui-style components
- **Content:** MDX + gray-matter
- **Search:** MiniSearch

## Project structure

```text
.
├── app/                     # App Router pages and route segments
│   ├── about/               # About page
│   ├── api/                 # API routes
│   ├── conferences/         # Conference index and detail pages
│   ├── news/                # News index and detail pages
│   ├── search/              # Search UI
│   ├── timeline/            # Community timeline index and detail pages
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage
├── components/              # Reusable UI and content display components
│   └── mdx/                 # MDX-specific presentation helpers
├── content/
│   └── events/              # Main editorial source for site content
├── lib/                     # Content loading, search, proceedings, utilities
├── public/
│   ├── data/                # Generated search JSON
│   └── ...                  # Static assets
├── scripts/                 # Maintenance and data-generation scripts
├── CONTRIBUTING.md          # Contributor guide for content additions
└── README.md
```

## Content model

Most editorial content lives in **`content/events/`**. Each file is an MDX document with frontmatter that determines how the entry is displayed.

Typical event kinds include:

- `conference`
- `news`
- `journal`
- `milestone`
- `founding`
- `partnership`

The app derives different surfaces from the same source content:

- **`/conferences`** shows conference entries
- **`/news`** shows selected news entries
- **`/timeline`** combines conferences, publications, and milestones
- **`/about`** reuses timeline-related content for the broader community story

## Getting started

### Prerequisites

- Node.js 18+
- pnpm

### Install and run

```bash
pnpm install
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command                   | Purpose                              |
| ------------------------- | ------------------------------------ |
| `pnpm dev`                | Start the local development server   |
| `pnpm build`              | Create a production build            |
| `pnpm start`              | Run the production build locally     |
| `pnpm lint`               | Run ESLint on source and MDX files   |
| `pnpm build:search-index` | Regenerate the search index manually |

## Contributing

Start with **[CONTRIBUTING.md](./CONTRIBUTING.md)**. It is the main guide for adding or editing website content.

### Content contributions

For most editorial updates, you only need to add or edit a file in `content/events/`. The contribution guide covers:

- how to create a new event file on GitHub
- which filename patterns to use
- which frontmatter template matches each content type
- examples for conferences, news posts, journal volumes, and milestones

Important note: a news item only appears on `/news` when its slug is included in `lib/live-news-slugs.json`.

### Code contributions

For code changes:

1. Fork the repository.
2. Create a branch for your change.
3. Install dependencies with `pnpm install`.
4. Make your change and run `pnpm lint`.
5. Open a pull request with a short description of the change and any relevant context.

## Notes for this repository state

- The README now reflects the current **unified `content/events` structure**, rather than older separate content folders.
- Search data is generated into `public/data/search-index.json`.
- Proceedings are linked directly from conference event frontmatter with `zenodoUrl` or `zenodoCommunity`; search also includes proceedings community links.
