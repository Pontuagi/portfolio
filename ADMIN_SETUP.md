# Admin Setup

The admin pages use Firebase Auth plus an `admins/{userId}` Firestore document.

## Add the first admin manually

1. Sign in once using the email-link flow at `/stories/write`.
2. Open Firebase Authentication in the Firebase Console.
3. Copy the signed-in user's Firebase Auth user ID.
4. Open Firestore and create a document at `admins/{userId}`.
5. Set these fields:

```text
email: "your-email@example.com"
role: "owner"
createdAt: server timestamp
```

After that user signs in, `/admin` and `/admin/stories` will be available.

The public navbar intentionally does not link to admin routes.
