# API Architecture & Monetization

## 1. Internal API (The Core)

- **REST/GraphQL:** For app-to-backend communication.
- **WebSocket:** For real-time features (Soul Circles, 3D Sync).

## 2. External API (Vedic AI API)

- **Monetization:** Tiered subscription for other developers.
- **Endpoints:**
  - `/get-shloka-context`: Returns relevant wisdom for a given mood/situation.
  - `/decode-dream`: Access to the Swapna Shastra engine.
  - `/soul-compatibility`: Compatibility check for 3rd party apps.

## 3. Monetization Strategy

1.  **Freemium:** Basic library and limited Guru chats.
2.  **Premium (Soul Pro):** Unlimited Guru, Dream Decoder, AR Temple, and high-quality Binaural audio.
3.  **Enterprise:** B2B dashboard and team analytics.
4.  **API Licensing:** For other wellness and astrology apps.

## 4. Key Management

- **Google Cloud API Gateway:** For rate limiting, logging, and security.
- **Stripe Integration:** For seamless subscription management.
