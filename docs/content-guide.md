# Content Guide

## Content Ownership

Most portfolio content is code-backed. Update the TypeScript data modules, then run type checking and build commands to catch shape errors.

## Site Metadata And Contact Details

Edit `src/lib/site.ts` for:

- Site owner name.
- Professional role.
- Email.
- Phone number and `tel:` link.
- Location.
- CV path.
- Social links.

The `site` object is used across the hero, contact page, navbar branding, footer, and CV button.

## Projects

Edit `src/data/projects.ts`.

Each project follows the `Project` type:

```ts
{
  slug: string;
  title: string;
  category: string;
  summary: string;
  image: string;
  link?: {
    label: string;
    href: string;
  };
  problem: string;
  solution: string;
  technologies: readonly string[];
  impact: string;
}
```

Project images should be stored in `public/images/` and referenced with paths like:

```ts
image: "/images/project-image.png"
```

Projects appear on:

- The home page featured projects section.
- `/projects` as detailed case studies.

## Skills

Edit `src/data/skills.ts`.

Skill groups follow:

```ts
{
  title: string;
  description: string;
  skills: readonly string[];
}
```

Skills appear in the home page skills section.

## Timeline

Edit `src/data/timeline.ts`.

Timeline entries follow:

```ts
{
  title: string;
  organization: string;
  period: string;
  type: "education" | "experience";
  description: string;
  highlights?: readonly string[];
}
```

Timeline entries appear on:

- The home page journey section.
- The about page, grouped by `education` and `experience`.

## Permanent Stories

Edit `src/data/stories.ts` for bundled stories that should ship with the site.

Permanent story inputs include:

- `id`
- `slug`
- `title`
- `category`
- `content`

The module converts permanent stories into:

- `permanentBlogPosts`, used by the blog service.
- `stories`, used by preview-style components.

Permanent stories are always treated as approved. They can be opened by slug through `/stories/story/[storyId]`.

## Community Stories

Community stories are not edited in code. They are submitted through `/stories/write`, stored in Firestore, and moderated in `/admin/stories`.

Story limits are defined in `src/lib/blogService.ts`:

- `maxStoryWords = 500`
- `maxStoryTitleLength = 80`

If these limits change in code, also update `firestore.rules` so client validation and database validation stay aligned.

## Images And PDFs

Public assets used by the app should live in `public/images/`.

The repository also contains an `images/` directory with matching source copies. The app itself references `/images/...`, which resolves to files under `public/images/`.

When replacing an image:

1. Add the new file to `public/images/`.
2. Update the reference in the relevant data or component file.
3. Keep filenames URL-safe when possible.
4. Run `npm run build` to catch missing asset references in Next image usage.

## Navigation

Public navigation links live in `src/components/layout/Navbar.tsx`.

Current public links:

- Home
- About
- Projects
- Short Stories
- Contact

Admin routes are intentionally omitted from the navbar.

## Page Copy

Page-level headings and descriptions are usually in the `PageHeader` calls inside `app/*/page.tsx`.

Home page section copy is split across components in `src/components/home/`.

## Adding A New Public Page

1. Create a new route under `app/`, for example `app/services/page.tsx`.
2. Compose the page with existing UI components such as `PageHeader` and `Section`.
3. Add data to `src/data/` if the page needs reusable structured content.
4. Add a navbar link in `src/components/layout/Navbar.tsx` if the page should be public navigation.
5. Run lint, typecheck, and build.

## Editing Checklist

- Content is updated in the correct data file or component.
- Images exist under `public/images/`.
- TypeScript object shapes match `src/types/portfolio.ts`.
- Blog limits in code and Firestore rules remain consistent.
- `npm run lint`, `npm run typecheck`, and `npm run build` pass.
