# Modern Portfolio with Blog Plan

This document outlines the plan for creating a new, modern portfolio with a blog section that allows users to upload short stories.

## 1. Technology Stack

*   **Frontend:** Next.js (a React framework)
*   **Styling:** TailwindCSS
*   **Backend & Database:** Firebase

## 2. Frontend (Next.js)

Using Next.js will provide benefits like server-side rendering (SSR) and static site generation (SSG), which are great for SEO and performance.

### Key Pages and Components:

*   **Homepage:** A modern, visually appealing page to showcase your skills, experience, and projects (similar to your current portfolio, but with an updated design).
*   **Blog:**
    *   A page to display a list of all the short stories submitted by users.
    *   Each story will be a card with a title, author, and a short snippet.
*   **Story Page:**
    *   A dedicated page to display the full content of a single story.
    *   Will include a comment section for readers to leave feedback.
*   **Submit Story Form:**
    *   A protected route for authenticated users to submit their stories.
    *   The form will have fields for a title and the story content.
    *   It will include a word count validation to ensure the story is less than 1700 words.
*   **Login/Signup Page:** A page for users to create an account or log in.

## 3. Backend (Firebase)

Firebase will be used for all backend services.

### Firebase Services:

*   **Firebase Authentication:**
    *   To handle user registration and login (using email/password, Google, or other social providers).
*   **Firestore:**
    *   A NoSQL database to store the short stories and user information.
    *   We will have two main collections: `users` and `stories`.
    *   **`stories` collection schema:**
        *   `title` (string)
        *   `content` (string)
        *   `authorId` (string, referencing the user's ID)
        *   `authorName` (string)
        *   `createdAt` (timestamp)
*   **Firebase Storage:**
    *   To store any images that users might want to upload with their stories (optional feature).
*   **Firebase Hosting:**
    *   To easily deploy and host the Next.js application.

## 4. Development Roadmap

1.  **Setup Firebase:** Create a new Firebase project and set up Authentication, Firestore, and Hosting.
2.  **Initialize Next.js App:** Create a new Next.js application and configure it with TailwindCSS.
3.  **Implement Authentication:** Create the login/signup pages and connect them to Firebase Authentication.
4.  **Build the Blog:**
    *   Create the story submission form.
    *   Implement the logic to save stories to Firestore.
    *   Create the pages to display the list of stories and individual stories.
5.  **Design the Portfolio:** Create the homepage and other portfolio-related pages with a modern design.
6.  **Deploy:** Deploy the application to Firebase Hosting.

This plan provides a solid foundation for building your new portfolio. We can start by setting up the project structure and then move on to implementing the features one by one.
