# Database Schema (Firestore)

## 1. `users` Collection

- `uid`: String (Primary Key)
- `displayName`: String
- `soulID`: Map
  - `astrology`: { lagna, rashi, nakshatra, transits }
  - `psychology`: { gunaBalance, dosha, personalityTraits }
  - `karmicSignature`: Number
- `karmaMeter`: { points, level, glowColor }
- `preferences`: { theme, language, ambientSoundEnabled }
- `createdAt`: Timestamp

## 2. `scriptures` Collection

- `id`: String (Slug)
- `title`: String
- `category`: String (Vedas, Upanishads, etc.)
- `yuga`: String
- `content`: Map (Chapters, Verses, Translations)
- `aiSummary`: String
- `audioURL`: String (Binaural version)

## 3. `soul_circles` Collection

- `id`: String
- `name`: String
- `type`: String (Public/Private/Enterprise)
- `members`: Array of UIDs
- `compatibilityScore`: Number
- `activeSadhana`: Map (Goal, Progress)

## 4. `karmic_logs` Collection (Sub-collection of User)

- `id`: String
- `type`: String (Sadhana, Help, Gifting)
- `points`: Number
- `description`: String
- `timestamp`: Timestamp

## 5. `dreams` Collection (Sub-collection of User)

- `id`: String
- `audioURL`: String
- `transcription`: String
- `interpretation`: { vedic, modern, actionItem }
- `timestamp`: Timestamp
