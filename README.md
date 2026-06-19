# Kipkoech Benedict Portfolio

A story-driven portfolio for Kipkoech Benedict, a Nairobi-based full-stack software engineer. The site presents profile information, project case studies, skills, experience, contact links, and a short-stories section with Firebase-backed community submissions and admin moderation.

## What Is Inside

- Public portfolio pages built with Next.js App Router.
- Reusable React components for layout, motion, cards, buttons, and page sections.
- Portfolio content stored as typed TypeScript data in `src/data`.
- A 3D hero scene powered by React Three Fiber and Drei, with a reduced-motion fallback path.
- A Firebase Auth and Firestore blog workflow for short story submissions.
- Hidden admin pages for approving, rejecting, and deleting submitted stories.
- Firestore security rules for users, admins, and blog posts.

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- Firebase Auth and Firestore
- Framer Motion
- Three.js, `@react-three/fiber`, and `@react-three/drei`
- ESLint

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL printed by Next.js, usually `http://localhost:3000`.

Run quality checks:

```bash
npm run lint
npm run test
npm run typecheck
npm run build
```

## Environment Variables

Firebase features require these browser environment variables:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
APP_URL=
```

The portfolio pages can render without Firebase configuration, but blog submission, user story lists, and admin moderation require it. Firebase web config values are intentionally available to browser code; protect the project with Firebase Auth authorized domains, Firestore rules, and Google Cloud API key restrictions. `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` is optional and enables Firebase Analytics in supported browsers. `APP_URL` is server-only and is used for absolute server-rendered links.

## Main Routes

| Route | Purpose |
| --- | --- |
| `/` | Home page with hero, intro, journey, projects, skills, blog preview, and contact CTA. |
| `/about` | Biography, CV link, education, and experience timeline. |
| `/projects` | Project case studies from `src/data/projects.ts`. |
| `/stories` | Permanent stories plus approved Firestore submissions. |
| `/stories/story/[storyId]` | Single approved story page, using permanent story slugs or Firestore document IDs. |
| `/stories/write` | Passwordless email sign-in and short story submission flow. |
| `/stories/my-stories` | Signed-in user view of their submitted stories. |
| `/contact` | Contact information, social links, and email-based contact form. |
| `/admin` | Hidden admin landing page. |
| `/admin/stories` | Admin moderation view for pending, approved, and rejected stories. |

## Documentation

Detailed repository documentation lives in `docs/`:

- [Documentation index](docs/README.md)
- [Architecture](docs/architecture.md)
- [Setup and configuration](docs/setup-and-configuration.md)
- [Content guide](docs/content-guide.md)
- [Firebase and admin guide](docs/firebase-and-admin.md)

There is also a focused first-admin checklist in [docs/ADMIN_SETUP.md](docs/ADMIN_SETUP.md).

## Repository Layout

```text
app/                 Next.js App Router pages and global layout
src/components/      Shared UI plus feature components for home, blog, admin, about, contact, and projects
src/config/          Runtime configuration such as Firebase initialization
src/data/            Typed portfolio, skills, timeline, project, and permanent story data
src/hooks/           Reusable client-side state and workflow hooks
src/lib/             Site metadata, motion presets, and URL helpers
src/services/        Firebase-backed auth, blog, admin, analytics, and pure domain helpers
src/types/           Shared TypeScript domain types
tests/               Vitest coverage for services, utilities, and content integrity
public/images/       Public images and PDFs used by the site
images/              Source image/PDF copies
docs/                Repository documentation
firestore.rules      Firestore access rules for blog and admin workflows
```

## Content Editing

Most public portfolio content is edited in these files:

- Profile, contact, CV, and social links: `src/lib/site.ts`
- Projects: `src/data/projects.ts`
- Skills: `src/data/skills.ts`
- Timeline: `src/data/timeline.ts`
- Permanent stories: `src/data/stories.ts`
- Page copy and layout: files under `app/` and `src/components/`

Images referenced from the app should be available under `public/images/`.

## Blog and Admin Model

Visitors submit stories through `/stories/write` after Firebase email-link sign-in. New stories are written to `blogPosts` with `status: "pending"`. Approved stories appear on `/stories`; rejected stories remain hidden from public readers.

Admin access is controlled by a Firestore document at `admins/{userId}` with a role of `owner` or `admin`. Admin routes are intentionally not linked from the public navbar.

## Deployment Notes

1. Configure the Firebase environment variables in the hosting provider.
2. Set `APP_URL` to the deployed site origin for server-rendered absolute links.
3. Deploy the Firestore rules in `firestore.rules`.
4. Enable Firebase email-link sign-in and authorize the local and production domains.
5. Run `npm run build` before release.

## License

This is a personal portfolio project. Add a license file before reusing or distributing the code outside its intended portfolio context.
