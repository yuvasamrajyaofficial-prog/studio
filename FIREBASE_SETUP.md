# Environment Variables Template for MALOLA

## Firebase Configuration

Copy this file to `.env.local` and fill in your Firebase credentials

```env
# Firebase Config
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## How to Get Firebase Credentials

1. Go to https://console.firebase.google.com/
2. Sign in with: yuvasamrajyaofficial@gmail.com
3. Create a new project or select existing project
4. Go to Project Settings (⚙️ icon)
5. Scroll to "Your apps" section
6. Click "</>" (Web app)
7. Register app with name "MALOLA"
8. Copy the firebaseConfig values

## After Creating .env.local

1. Copy this template
2. Create `.env.local` in the root directory
3. Replace all placeholder values with actual Firebase credentials
4. Save the file
5. Restart dev server: `npm run dev`
