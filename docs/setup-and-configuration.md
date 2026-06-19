# Setup And Configuration

## Requirements

- Node.js compatible with Next.js 15.
- npm.
- A Firebase project if blog submissions and admin moderation are needed.

## Install

```bash
npm install
```

## Development

```bash
npm run dev
```

Next.js prints the local server URL. It is usually `http://localhost:3000`.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm run build` | Create a production build. |
| `npm run start` | Start the production server after building. |
| `npm run lint` | Run ESLint across the project. |
| `npm run typecheck` | Run TypeScript with `tsc --noEmit`. |

## Environment Variables

Create a local environment file such as `.env.local` and add:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

`NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` is optional and enables Firebase Analytics in supported browsers.

`NEXT_PUBLIC_APP_URL` is used when Firebase sends email sign-in links. In production, set it to the deployed origin, for example:

```bash
NEXT_PUBLIC_APP_URL=https://example.com
```

## Firebase Setup

1. Create or open a Firebase project.
2. Add a web app and copy its client configuration values into the `NEXT_PUBLIC_FIREBASE_*` variables.
3. Enable Firestore.
4. Enable Firebase Authentication.
5. Enable email-link sign-in in Authentication.
6. Add local and production domains to Firebase Authentication authorized domains.
7. Deploy or paste the rules from `firestore.rules`.
8. Sign in once through `/stories/write`.
9. Create the first admin document manually, following `ADMIN_SETUP.md`.

## Firestore Rules

The project includes `firestore.rules`. These rules define:

- Users can create and read/update their own profile.
- Signed-in users can create pending blog posts.
- Authors can edit their own pending posts under strict field constraints.
- Approved blog posts are publicly readable.
- Admins can read all relevant content and moderate posts.
- Admin documents cannot be created, updated, or deleted from the client.

Deploying rules depends on your Firebase tooling. If using the Firebase CLI, the common flow is:

```bash
firebase deploy --only firestore:rules
```

## Local Firebase Behavior

When Firebase variables are missing:

- Static portfolio pages can still render.
- Firebase services return `null` or throw clear configuration errors.
- Blog submission, signed-in story lists, and admin moderation are unavailable.

## Production Build

Before deploying:

```bash
npm run lint
npm run typecheck
npm run build
```

Fix all errors before release. A successful build confirms that routes, imports, and TypeScript compile under production settings.

## Deployment Checklist

- Environment variables are configured in the hosting provider.
- `NEXT_PUBLIC_APP_URL` matches the deployed site.
- Firebase email-link sign-in is enabled.
- Firebase authorized domains include the deployed domain.
- Firestore rules are deployed.
- The first admin document exists at `admins/{userId}`.
- `npm run build` passes.
- Public assets referenced in code exist in `public/images/`.

## Common Problems

### Email Sign-In Link Opens The Wrong URL

Check `NEXT_PUBLIC_APP_URL`. It must be the same origin where the app is running.

### Firebase Says Domain Is Unauthorized

Add the local or production domain in Firebase Console under Authentication authorized domains.

### Blog List Or Admin Query Fails With An Index Error

Open the index creation link from the Firebase error message and create the suggested index.

### Blog Features Say Firebase Is Not Configured

Confirm that every `NEXT_PUBLIC_FIREBASE_*` variable is set and restart the dev server.
