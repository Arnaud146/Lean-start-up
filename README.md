# Handy’s PWA with Firebase

Project setup with Firebase Auth, Firestore, and Cloud Messaging.

## Setup

1. Install Firebase tools:
   ```
   npm install -g firebase-tools
   firebase login
   ```
2. Configure `.firebaserc` with your project ID.
3. In `frontend/`, create `.env.local`:
   ```
   REACT_APP_FIREBASE_API_KEY=...
   REACT_APP_FIREBASE_AUTH_DOMAIN=...
   REACT_APP_FIREBASE_PROJECT_ID=...
   REACT_APP_FIREBASE_STORAGE_BUCKET=...
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
   REACT_APP_FIREBASE_APP_ID=...
   REACT_APP_VAPID_KEY=...
   ```
4. Deploy functions and hosting:
   ```
   firebase deploy --only functions,hosting
   ```
