# Documentation Index

This directory explains how the portfolio is organized, configured, updated, and operated.

## Guides

- [Architecture](architecture.md): application structure, route map, component organization, data flow, and styling conventions.
- [Setup and configuration](setup-and-configuration.md): local development, scripts, environment variables, Firebase setup, and deployment checklist.
- [Content guide](content-guide.md): how to update profile details, projects, skills, timeline entries, stories, assets, navigation, and page copy.
- [Firebase and admin guide](firebase-and-admin.md): Auth, Firestore collections, story lifecycle, admin roles, security rules, and operational notes.

## Fast Path For New Contributors

1. Install dependencies with `npm install`.
2. Run the app with `npm run dev`.
3. Read `src/lib/site.ts` for owner/contact metadata.
4. Read `src/data/projects.ts`, `src/data/skills.ts`, `src/data/timeline.ts`, and `src/data/stories.ts` for editable portfolio content.
5. Read `src/lib/firebase.ts`, `src/lib/auth.ts`, `src/lib/blogService.ts`, and `src/lib/adminService.ts` before changing blog or admin behavior.
6. Run `npm run lint`, `npm run typecheck`, and `npm run build` before shipping.

## Current Application Summary

The project is a Next.js App Router portfolio with a public marketing/profile experience and a Firebase-backed short story workflow. Static portfolio data is stored in TypeScript modules, while community story submissions live in Firestore and move through a pending, approved, or rejected moderation lifecycle.
