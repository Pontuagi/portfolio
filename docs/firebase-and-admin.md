# Firebase And Admin Guide

## Purpose

Firebase powers the dynamic short-stories workflow:

- Passwordless email sign-in.
- User profile storage.
- Story submission.
- Story moderation.
- Public reading of approved submissions.

The static portfolio pages do not require Firebase.

## Firebase Initialization

Firebase setup lives in `src/lib/firebase.ts`.

The app reads:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
```

If the required values exist, Firebase Auth and Firestore clients are initialized. If any required value is missing, `auth` and `db` are `null`. `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` is optional and is used only for Firebase Analytics in supported browsers.

`requireFirebase()` throws an explicit error when a Firebase-dependent action is used without configuration.

## Authentication Flow

Authentication helpers live in `src/lib/auth.ts`.

Main functions:

- `sendBlogSignInLink(name, email)`: validates name/email, sends a Firebase email sign-in link, and stores pending identity in local storage.
- `completeBlogEmailSignIn(email, name, url)`: completes the Firebase email-link sign-in, updates the Firebase Auth display name, and upserts the Firestore user profile.
- `subscribeToAuth(callback)`: listens to Firebase Auth state.
- `getCurrentBlogUser()`: returns the current Firebase user.
- `signOutBlogUser()`: signs out the current user.
- `getUserProfile(userId)`: reads `users/{userId}`.

`NEXT_PUBLIC_APP_URL` controls the return URL used in email sign-in links. The target route is `/stories/write`.

## Firestore Collections

### `users/{userId}`

Created or updated when a user completes email-link sign-in.

Fields:

- `name`
- `email`
- `createdAt`
- `updatedAt`

### `admins/{userId}`

Created manually in Firebase Console. This collection controls access to admin pages and moderation actions.

Fields:

- `email`
- `role`: `owner` or `admin`
- `createdAt`

The client cannot create, update, or delete admin documents according to `firestore.rules`.

### `blogPosts/{postId}`

Created when a signed-in user submits a story.

Fields:

- `title`
- `content`
- `preview`
- `wordCount`
- `authorId`
- `authorName`
- `authorEmail`
- `status`: `pending`, `approved`, or `rejected`
- `createdAt`
- `updatedAt`
- `publishedAt`

Optional field:

- `slug`, used only when present. Permanent stories use slugs from local data.

## Story Lifecycle

1. Visitor signs in with email link from `/stories/write`.
2. The app creates or updates a `users/{userId}` document.
3. Visitor submits a title and story content.
4. `createBlogPost` validates the story:
   - title is required.
   - title must be 80 characters or fewer.
   - content is required.
   - content must be 500 words or fewer.
5. The story is saved to `blogPosts` with `status: "pending"`.
6. Admin reviews it in `/admin/stories`.
7. Admin approves, rejects, or deletes it.
8. Approved stories become public on `/stories` and `/stories/story/[storyId]`.

## Admin Workflow

The first admin must be created manually:

1. Sign in once through `/stories/write`.
2. Open Firebase Authentication.
3. Copy the user's Firebase Auth user ID.
4. Open Firestore.
5. Create `admins/{userId}`.
6. Add:

```text
email: "your-email@example.com"
role: "owner"
createdAt: server timestamp
```

After this, `/admin` and `/admin/stories` are available to that signed-in user.

`ADMIN_SETUP.md` contains the short checklist version of this process.

## Admin Service

Admin operations live in `src/lib/adminService.ts`.

Main functions:

- `getAdminProfile(userId)`: reads and validates the user's admin document.
- `getAdminBlogPosts(status)`: loads up to 100 posts by moderation status and sorts newest first.
- `approveBlogPost(postId)`: sets status to approved and writes `publishedAt`.
- `rejectBlogPost(postId)`: sets status to rejected.
- `deleteBlogPost(postId)`: deletes the post.

## Blog Service

Blog operations live in `src/lib/blogService.ts`.

Main functions:

- `countWords(value)`: counts words for validation.
- `createPreview(content)`: generates a preview from the first 34 words.
- `createBlogPost(input)`: validates and creates a pending Firestore story.
- `getApprovedBlogPosts(authorName?)`: loads approved Firestore stories, optionally filtered by author name on the client.
- `getApprovedBlogPostByStoryId(storyId)`: finds a permanent story by slug/id or an approved Firestore story by document ID.
- `getUserBlogPosts(authorId)`: loads a signed-in user's stories.

## Security Rules Summary

Rules live in `firestore.rules`.

Important behavior:

- Public users can read only approved blog posts.
- Signed-in authors can read their own posts.
- Admins can read posts and user profiles.
- Signed-in users can create pending posts only for themselves.
- Authors can update only their own pending posts and only specific fields.
- Admins can approve or reject posts by changing moderation fields.
- Only admins can delete blog posts.
- Admin documents are read-only to admins and cannot be changed by the client.

## Keeping Rules And Code In Sync

When changing these values in code, update `firestore.rules` too:

- Story title length.
- Story word count limit.
- Allowed blog statuses.
- Required `blogPosts` fields.
- Fields authors are allowed to edit.
- Fields admins are allowed to update.

## Query Notes

Firestore queries currently include:

- Approved posts ordered by `publishedAt` descending.
- User posts filtered by `authorId` and ordered by `createdAt` descending.
- Admin posts filtered by `status`.
- Single approved post lookup by document ID.

Firebase may ask for composite indexes as these queries evolve. If an index error appears, use the link in the Firebase error message to create the suggested index.

## Troubleshooting

### Admin Page Says Access Is Missing

Confirm:

- The user is signed in.
- `admins/{userId}` exists.
- `role` is exactly `owner` or `admin`.
- Firebase environment variables are configured.

### Story Submission Fails

Confirm:

- User is signed in through the email-link flow.
- Title is present and within 80 characters.
- Content is present and within 500 words.
- Firestore rules match the app's validation limits.

### Sign-In Link Says `auth/configuration-not-found`

Enable Firebase Authentication for the project:

1. Open Firebase Console.
2. Go to Authentication > Sign-in method.
3. Enable Email/Password.
4. Enable Email link passwordless sign-in.
5. Save.
6. Go to Authentication > Settings > Authorized domains.
7. Add `localhost` for local development and add the production domain before deployment.

### Approved Story Does Not Appear

Confirm:

- `status` is `approved`.
- `publishedAt` is a timestamp.
- Firestore indexes are available for the approved-post query.
- The app has been refreshed after moderation.
