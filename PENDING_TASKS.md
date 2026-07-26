# Malola Platform - Pending Tasks & Roadmap

This document outlines completed and pending features, database connections, and system enhancements across the Malola platform.

---

## Completed Tasks (Phases 1 - 3)

- [x] **Admin Blog CMS (`/admin/cms/blogs`)**: Connected to live Firestore `blogs` collection with search and deletion.
- [x] **Daily Wisdom Scheduler (`/admin/cms/wisdom`)**: Live Firestore CRUD actions and scheduler UI.
- [x] **User Management Dashboard (`/admin/users`)**: Connected to Firestore `users` collection with role switching and account status controls.
- [x] **Community Moderation (`/admin/community`)**: Report queue management with dismiss and delete actions.
- [x] **Soul ID Engine (`soul-id-calculator.ts`)**: Deterministic Vedic calculation engine (Rashi, Nakshatra, Lagna, Guna, Dosha).
- [x] **Daily Wisdom User Widget (`src/components/home/daily-wisdom.tsx`)**: Dynamic user dashboard widget with Sadhana completion toggle.
- [x] **Community Post Actions (`src/lib/community/actions.ts`)**: Unlike toggle and `reportPost` moderation action.
- [x] **System Settings (`/admin/settings`)**: Persisted global maintenance, registration, and AI flags in Firestore `system_config/global`.
- [x] **Firestore Security Rules (`firestore.rules`)**: Enforced rules for `blogs`, `wisdom`, `reports`, `system_config`, and sub-collections.
- [x] **Password Reset Email (`/forgot-password`)**: Connected Firebase Auth `sendPasswordResetEmail()` in `AuthContext`.
- [x] **Karma Engine (`src/lib/karma.ts`)**: Reward engine to update user karma scores in Firestore.

---

## Phase 4 Pending Roadmap

### 1. Scriptures Management (`/admin/cms/scriptures`)

- [ ] **Dynamic Count Recalculation**: Automatically update `totalChapters` and `totalVerses` on scripture documents in Firestore when sub-collections change.
- [ ] **Category & Tradition Filters**: Interactive dropdown filters on `/admin/cms/scriptures/page.tsx`.

### 2. Cosmic & Panchang Experience (`/cosmos`)

- [ ] **Real-time Panchang Calculator**: Compute Tithi, Nakshatra, Yoga, Karana, and Rahu Kalam dynamically based on current date & geo-location.

### 3. AI Guide Voice Capabilities (`/ai-guide`)

- [ ] **Voice Input (STT)**: Speech recognition for hands-free voice input.
- [ ] **Audio Output (TTS)**: Text-to-speech synthesis for spoken AI responses.
