# AI Agent Architecture (The "Brain")

## 1. The Orchestrator

A central Node.js service that routes user requests to the appropriate AI sub-agent.

## 2. Sub-Agents

- **The Guru Agent:**
  - **Role:** Empathetic conversation and spiritual guidance.
  - **Tools:** RAG (Scripture DB), Sentiment Analysis.
- **The Decoder Agent:**
  - **Role:** Dream interpretation and psychological mapping.
  - **Tools:** Swapna Shastra Knowledge Base, Jungian Archetype Map.
- **The Matchmaker Agent:**
  - **Role:** Analyzing Soul IDs for compatibility.
  - **Tools:** Ashta Kuta Logic, Personality Vector Matching.

## 3. RAG (Retrieval-Augmented Generation)

- **Vector Database:** Pinecone or Google Vertex AI Search.
- **Embeddings:** Google Multimodal Embeddings (for text and audio).
- **Knowledge Base:** Digitized scriptures, commentaries, and psychological frameworks.

## 4. Memory System

- **Short-Term:** Conversation context (last 10-20 turns).
- **Long-Term:** User's spiritual progress, past dreams, and recurring themes (stored in Firestore).

## 5. Safety Layer

- A dedicated "Guardrail" agent that scans every input/output for crisis triggers or ethical violations.
