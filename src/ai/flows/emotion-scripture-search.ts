'use server';

/**
 * @fileOverview Emotion-based scripture search flow.
 * Takes a free-text emotional query and returns relevant scripture passages.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const EmotionSearchInputSchema = z.object({
  query: z.string().min(1).max(500).describe('The emotional query or feeling expressed by the user.'),
});
export type EmotionSearchInput = z.infer<typeof EmotionSearchInputSchema>;

const ScriptureResultSchema = z.object({
  title: z.string().describe('The title of the scripture.'),
  tradition: z.string().describe('The tradition or culture (e.g. Vedic, Stoic, Buddhist, Islamic).'),
  verse: z.string().describe('A relevant verse or passage from the scripture.'),
  verseRef: z.string().describe('The verse reference (e.g. Bhagavad Gita 2.47, Psalms 23:4).'),
  reason: z.string().describe('Why this passage is relevant to the user emotional state.'),
  yuga: z.string().describe('The Yuga era this scripture belongs to (satya, treta, dwapara, kali).'),
});

export const EmotionSearchOutputSchema = z.object({
  results: z.array(ScriptureResultSchema).min(1).max(5),
  emotionSummary: z.string().describe('A brief empathetic summary acknowledging the users emotional state.'),
});
export type EmotionSearchOutput = z.infer<typeof EmotionSearchOutputSchema>;

export async function emotionScriptureSearch(input: EmotionSearchInput): Promise<EmotionSearchOutput> {
  return emotionScriptureSearchFlow(input);
}

const emotionScriptureSearchFlow = ai.defineFlow(
  {
    name: 'emotionScriptureSearchFlow',
    inputSchema: EmotionSearchInputSchema,
    outputSchema: EmotionSearchOutputSchema,
  },
  async (input) => {
    const { output } = await ai.generate({
      model: 'googleai/gemini-2.0-flash',
      prompt: `You are MALOLA — a wise, compassionate guide drawing from 5,000 years of universal wisdom across all human civilizations.

A seeker has come to you with this feeling or situation:
"${input.query}"

Your task:
1. Acknowledge their emotional state with empathy (2-3 sentences).
2. Search your vast knowledge of world scriptures — Vedic, Buddhist, Stoic, Taoist, Biblical, Quranic, Indigenous, and more — and find 3 to 5 passages that speak directly to this emotion.
3. For each passage, provide: the scripture title, tradition, a powerful verse/passage (translated to English), the verse reference, why it is relevant to this feeling, and which Yuga era it belongs to.

Focus on passages that are healing, illuminating, and genuinely relevant — not generic platitudes.
Return diverse traditions when possible.

Return your response as JSON matching this exact structure:
{
  "emotionSummary": "...",
  "results": [
    {
      "title": "...",
      "tradition": "...",
      "verse": "...",
      "verseRef": "...",
      "reason": "...",
      "yuga": "kali|satya|treta|dwapara"
    }
  ]
}`,
      output: {
        schema: EmotionSearchOutputSchema,
        format: 'json',
      },
    });

    if (!output) {
      throw new Error('Emotion search flow returned no output.');
    }

    return output;
  }
);
