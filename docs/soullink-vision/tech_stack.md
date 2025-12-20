# The Full Tech Stack

## 1. Frontend (Cross-Platform)

- **Framework:** **Flutter** (for high-performance 3D rendering and smooth animations across iOS/Android/Web).
- **State Management:** Riverpod or Bloc.
- **3D Engine:** `flutter_gl` or `three_dart` (for the Cosmic Flow Engine).

## 2. Backend & Infrastructure

- **Platform:** **Firebase** (Firestore, Auth, Storage, Cloud Functions).
- **Serverless:** Node.js Cloud Functions for heavy logic and API integrations.
- **Database:** **Firestore** (NoSQL) for user profiles, karma, and social features.

## 3. AI & Voice Intelligence

- **Brain:** **Google Gemini 1.5 Pro** (via Vertex AI) for scripture analysis, chat, and dream decoding.
- **Voice Engine:** **Vapi** (for low-latency, human-like voice conversations).
- **STT/TTS:** Deepgram (Speech-to-Text) and ElevenLabs (Text-to-Speech) via Vapi.
- **Mood Detection:** Hume AI or custom sentiment analysis on Vapi streams.

## 4. Specialized APIs

- **Astrology:** Swiss Ephemeris (via a custom microservice) for precise planetary calculations.
- **Audio:** Custom Binaural Beat generator (Web Audio API / Flutter Audio).
- **AR:** ARCore (Android) and ARKit (iOS) via Flutter plugins.

## 5. DevOps & Security

- **CI/CD:** GitHub Actions.
- **Monitoring:** Firebase Crashlytics & Google Cloud Logging.
- **Security:** JWT for API auth, Firestore Security Rules for data privacy.
