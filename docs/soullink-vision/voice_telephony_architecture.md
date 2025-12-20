# Voice & Telephony Architecture

## 1. The Vapi Pipeline

- **User Device:** Captures audio via WebRTC.
- **Vapi Server:** Orchestrates the STT -> LLM -> TTS loop.
- **Latency Target:** < 500ms for a "human-like" feel.

## 2. Latency Handling Strategies

- **Streaming STT:** Deepgram streams text to the LLM as the user speaks.
- **Token Streaming:** Gemini streams response tokens directly to the TTS engine.
- **Pre-fetching:** Predicting the next likely response and pre-generating audio.
- **Filler Audio:** Subtle "thinking" sounds (breathing, "hmm") if latency exceeds 800ms.

## 3. Telephony Integration (Enterprise)

- **Twilio/Vonage:** For "Call the Guru" features (B2B wellness lines).
- **SIP Trunking:** Connecting Soullink to corporate phone systems.

## 4. Audio Quality

- **Noise Suppression:** AI-powered background noise removal.
- **Echo Cancellation:** Ensuring clear two-way communication.
