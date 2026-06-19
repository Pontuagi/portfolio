# Architecture

## Overview

The portfolio is a Next.js App Router application. Public pages are mostly static React components backed by typed local data, while the short-stories feature uses Firebase Auth and Firestore for sign-in, submission storage, and moderation.

At a high level:

- `app/` defines routes, page-level composition, metadata, and the root layout.
- `src/components/` contains reusable UI and feature components.
- `src/config/` contains runtime configuration boundaries.
- `src/data/` contains editable portfolio content.
- `src/hooks/` contains reusable client-side workflow state.
- `src/lib/` contains lightweight site, motion, and link helpers.
- `src/services/` contains Firebase integrations, domain services, and reusable pure helpers.
- `src/types/` defines shared TypeScript types.
- `tests/` contains Vitest coverage for services, utilities, and content integrity.
- `public/images/` stores assets served by Next.js.

## Route Map

| Route | File | Description |
| --- | --- | --- |
| `/` | `app/page.tsx` | Composes the home page from hero, intro, journey, projects, skills, blog preview, and contact sections. |
| `/about` | `app/about/page.tsx` | Displays biography, CV link, education, and experience timeline. |
| `/projects` | `app/projects/page.tsx` | Renders project case studies from `src/data/projects.ts`. |
| `/stories` | `app/stories/page.tsx` | Renders permanent stories and approved Firestore stories through `BlogListClient`. |
| `/stories/story/[storyId]` | `app/stories/story/[storyId]/page.tsx` | Shows one approved permanent or Firestore story. |
| `/stories/write` | `app/stories/write/page.tsx` | Hosts the passwordless sign-in and story submission client. |
| `/stories/my-stories` | `app/stories/my-stories/page.tsx` | Shows the signed-in user's story submissions. |
| `/contact` | `app/contact/page.tsx` | Displays contact details, social links, and a mailto-based form. |
| `/admin` | `app/admin/page.tsx` | Hidden admin landing page. |
| `/admin/stories` | `app/admin/stories/page.tsx` | Story moderation UI for admins. |

## Layout

`app/layout.tsx` provides:

- Global metadata.
- Viewport settings.
- Global CSS import from `app/globals.css`.
- Shared `Navbar` and `Footer` around every page.

The public navbar links to home, about, projects, short stories, and contact. Admin routes are intentionally not exposed in the navbar.

## Component Organization

`src/components/ui/` contains shared building blocks:

- `Button`
- `AnimatedButton`
- `Card`
- `PageHeader`
- `Section`

`src/components/layout/` contains global frame components:

- `Navbar`
- `Footer`

`src/components/home/` contains home page sections:

- `Hero`
- `HeroScene`
- `HeroSceneLoader`
- `Hero3DFallback`
- `Intro`
- `Journey`
- `FeaturedProjects`
- `Skills`
- `BlogPreview`
- `ContactCta`

`src/components/blog/` contains story reading, submission, and signed-in user views:

- `BlogListClient`
- `BlogCard`
- `ExpandableStoryCard`
- `BlogState`
- `WriteStoryClient`
- `MyStoriesClient`
- `ShareStoryButton`

`src/components/admin/` contains admin-only moderation UI:

- `AdminLayout`
- `AdminHomeClient`
- `AdminStoriesClient`
- `AdminStoryCard`
- `AdminStatusFilter`
- `AdminActionButtons`

`src/components/projects/ProjectCaseStudy.tsx` renders the detailed project sections.

`src/components/motion/` wraps Framer Motion patterns used by animated sections and cards.

## Data Model

Shared domain types live in `src/types/portfolio.ts`.

Important types:

- `Project`
- `SkillGroup`
- `TimelineItem`
- `Story`
- `BlogPost`
- `BlogStatus`
- `AdminProfile`
- `UserProfile`

Static portfolio content lives in:

- `src/lib/site.ts`
- `src/data/projects.ts`
- `src/data/skills.ts`
- `src/data/timeline.ts`
- `src/data/stories.ts`

Firestore content uses:

- `users/{userId}` for signed-in story authors.
- `admins/{userId}` for admin authorization.
- `blogPosts/{postId}` for community story submissions.

## Blog Data Flow

1. A visitor opens `/stories/write`.
2. `WriteStoryClient` asks for a name and email.
3. `sendBlogSignInLink` in `src/services/auth/blogAuthService.ts` sends a Firebase email sign-in link.
4. After the link is opened, `completeBlogEmailSignIn` signs the user in and upserts `users/{userId}`.
5. `createBlogPost` in `src/services/blog/blogService.ts` validates title/content and writes a pending `blogPosts` document.
6. Admins review submissions in `/admin/stories`.
7. `approveBlogPost`, `rejectBlogPost`, or `deleteBlogPost` in `src/services/admin/adminService.ts` update Firestore.
8. Approved stories appear on `/stories` and individual story pages.

## Permanent Stories

`src/data/stories.ts` defines permanent approved stories bundled with the site. These are converted into `BlogPost` objects and shown alongside approved Firestore submissions. Permanent stories can be found by either `slug` or `id` in the single-story route.

## Firebase Boundary

`src/config/firebase.ts` initializes Firebase only when every required `NEXT_PUBLIC_FIREBASE_*` value is available. It exports:

- `isFirebaseConfigured`
- `firebaseApp`
- `auth`
- `db`
- `requireFirebase`

Components and services that require Firebase throw helpful errors when Firebase is not configured. Public static portfolio sections do not need Firebase.

Firebase Analytics initializes once in the browser through `src/components/FirebaseAnalytics.tsx` and `src/services/analytics/firebaseAnalytics.ts` when `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` is configured.

The Firebase web config is intentionally public because Firebase Auth and Firestore run in browser components. Server-only values, such as `APP_URL`, must not use the `NEXT_PUBLIC_` prefix.

## Styling

Global styles live in `app/globals.css`. The project uses Tailwind CSS utility classes directly in components, with repeated page structure handled through shared components such as `Section` and `PageHeader`.

The design uses light and dark color variants. The 3D hero scene also adapts its palette based on `prefers-color-scheme`.

## 3D Hero Scene

`src/components/home/HeroScene.tsx` uses:

- `@react-three/fiber` for the canvas and render loop.
- `@react-three/drei` for camera, floating elements, lines, points, and materials.
- `framer-motion` reduced-motion detection to avoid continuous animation when the user prefers reduced motion.

`HeroSceneLoader` dynamically loads the 3D scene and can fall back to `Hero3DFallback`.

## Import Aliases

The app uses the `@/` alias for source imports. Examples:

```ts
import { site } from "@/lib/site";
import { projects } from "@/data/projects";
import { Button } from "@/components/ui/Button";
```

## Operational Risks To Watch

- Blog and admin pages depend on Firebase environment variables.
- Firebase email-link sign-in requires authorized domains for the local and production origins.
- Firestore queries with `where` and `orderBy` may require indexes in Firebase Console.
- Public story reads are restricted to approved posts by Firestore rules.
- Admins must be created manually in Firestore because the client cannot create admin records.
