# Malola Platform - Pending Tasks & Roadmap

This document outlines all pending features, database connections, and system enhancements across the Malola platform.

---

## 1. Admin Panel & Content Management System (`/admin/*`)

### Scriptures Management (`/admin/cms/scriptures`)

- [ ] **Dynamic Chapter/Verse Count Recalculation**: Automatically update `totalChapters` and `verses` counts on scripture documents in Firestore when chapters/verses are added or deleted.
- [ ] **Category & Tradition Filters**: Wire interactive dropdown filters on the scripture list page.

### Blog & Article CMS (`/admin/cms/blogs`)

- [ ] **Firestore Database Integration**: Replace static `MOCK_BLOGS` array on `/admin/cms/blogs/page.tsx` with live query via `getBlogs()`.
- [ ] **Delete & Status Actions**: Wire interactive delete button and draft/publish toggle to Firestore actions.

### Daily Wisdom Scheduler (`/admin/cms/wisdom`)

- [ ] **Firestore Model & Actions**: Create `wisdom` Firestore collection and backend server actions (`getWisdom()`, `createWisdom()`, `deleteWisdom()`).
- [ ] **Scheduler Form UI**: Build creation modal/form for quotes, sadhanas, and shlokas with date pickers.
- [ ] **Public View Integration**: Display scheduled daily wisdom on user dashboard and homepage.

### User Management (`/admin/users`)

- [ ] **Firestore User Fetching**: Replace `MOCK_USERS` array on `/admin/users/page.tsx` with live query to `users` collection.
- [ ] **Role Management**: Modal/action to change user roles (User, Moderator, Admin).
- [ ] **User Suspension**: Action to suspend/ban user accounts with status updates in Firestore.
- [ ] **Notification Dispatch**: Wire direct email or in-app message trigger to individual users.

### Community Moderation (`/admin/community`)

- [ ] **Report Queue**: Fetch reported posts and comments from Firestore for moderation review.
- [ ] **Moderation Actions**: Approve posts, dismiss reports, or delete reported content.
- [ ] **Audit Log & Banned Users**: Build view for moderation log history and list of banned accounts.

### AI Control Center (`/admin/ai`)

- [ ] **Live Metrics**: Wire token usage, costs, and API latency charts to Firebase Analytics/logging.
- [ ] **Model Selection**: Interface to dynamically switch AI model providers (Gemini, OpenAI, Anthropic).
- [ ] **Global AI Kill Switch**: Implement a global Firestore feature flag to immediately pause AI features if needed.

### System Settings (`/admin/settings`)

- [ ] **Global Configuration Persistence**: Bind Maintenance Mode toggle, User Registration toggle, and session timeout to a global `system_config` document in Firestore.

---

## 2. User-Facing Application & UI (`/app/*`)

### Soul ID Engine (`/soul-id`)

- [ ] **Vedic Astrological Calculator**: Build logic to calculate Rashi, Nakshatra, Guna, and Dosha based on birth date, time, and location.
- [ ] **Profile Persistence**: Save calculated Soul ID directly to the user's Firestore profile.

### Cosmic & Panchang Experience (`/cosmos`)

- [ ] **Real-time Ephemeris Calculations**: Integrate live planetary positions (Tithi, Nakshatra, Yoga, Karana, Rahu Kalam) based on geo-location.
- [ ] **Shloka Audio Player**: Audio playback for cosmic shlokas matching active lunar phases.

### Soul Circles / Community (`/community`)

- [ ] **Full Like Toggle**: Complete `deleteDoc` logic in `likePost()` action for unliking posts.
- [ ] **Report Action**: Add report button on post cards to allow users to flag inappropriate content.
- [ ] **Pagination**: Add scroll-based pagination to replace static post limits.

### AI Guide & Voice Assistant (`/ai-guide`)

- [ ] **Voice Input (STT)**: Integrate Web Speech API or ElevenLabs transcription for voice input.
- [ ] **Audio Response (TTS)**: Synthesize AI text output into spoken audio using ElevenLabs or browser synthesis.
- [ ] **Session Management**: Add delete and rename chat session actions in the sidebar.

### User Profile & Settings (`/profile`, `/settings`)

- [ ] **Avatar Storage**: File upload handler to update user profile picture in Firebase Storage.
- [ ] **Activity Analytics**: Fetch user's actual meditation history, scripture reading history, and earned karma.
- [ ] **Onboarding Completion**: Save spiritual goals directly to profile upon completing onboarding.
- [ ] **Password Reset**: Wire `sendPasswordResetEmail()` on `/forgot-password`.

---

## 3. Backend, Data & Security

### Security Rules (`firestore.rules`)

- [ ] **Blogs Collection**: Enforce read/write security rules for the `blogs` collection.
- [ ] **Sub-collections**: Enforce security rules on `scriptures/{id}/chapters/{id}/verses` and `posts/{id}/comments`.
- [ ] **User Media Storage Rules**: Add rules for avatar uploads (`users/{userId}/avatar`) and community media.

### Karma & Reward Engine

- [ ] **Automated Triggers**: Automatically award karma points to users upon sadhana completion, chapter reading, and community participation.
