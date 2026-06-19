import { FirebaseError } from "firebase/app";

export function getFirebaseAuthErrorMessage(error: unknown) {
  if (error instanceof FirebaseError) {
    if (error.code === "auth/configuration-not-found") {
      return "Firebase Authentication is not enabled for this project yet. In Firebase Console, open Authentication > Sign-in method, enable Email/Password, enable Email link passwordless sign-in, save, and make sure localhost plus your deployed domain are authorized.";
    }

    if (error.code === "auth/operation-not-allowed") {
      return "Email sign-in is not enabled in Firebase Authentication. Enable Email/Password and Email link passwordless sign-in in Firebase Console, then try again.";
    }

    if (error.code === "auth/unauthorized-domain") {
      return "This domain is not authorized in Firebase Authentication. Add localhost and your deployed domain under Authentication > Settings > Authorized domains.";
    }

    if (error.code === "auth/invalid-email") {
      return "Please enter a valid email address.";
    }
  }

  return error instanceof Error ? error.message : "Could not complete Firebase sign-in.";
}
