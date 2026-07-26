'use server';

import { summarizeScripture } from '@/ai/flows/contextual-scripture-summarization';
import { translateText } from '@/ai/flows/translate-text-flow';
import { emotionScriptureSearch, type EmotionSearchInput } from '@/ai/flows/emotion-scripture-search';
import { generateSpeech, type GenerateSpeechInput } from '@/ai/flows/tts-flow';
import {
  SummarizeScriptureInputSchema,
  TranslateTextInputSchema,
  type SummarizeScriptureInput,
  type TranslateTextInput,
} from '@/ai/schemas';
import { z } from 'zod';

export async function getScriptureSummaryAction(
  input: SummarizeScriptureInput
) {
  try {
    // Validate input against the Zod schema to ensure type safety and prevent injection.
    const validatedInput = SummarizeScriptureInputSchema.parse(input);

    // RAG-Lite: Inject context if on a chapter page
    if (validatedInput.pageContext?.path?.includes('/chapter/')) {
      const { MOCK_CHAPTER } = await import('@/lib/mock-data');
      const chapterText = MOCK_CHAPTER.verses.map(v => 
        `Verse ${v.number}: ${v.translations[0].text} (${v.meaning || ''})`
      ).join('\n');
      
      validatedInput.scriptureContent = `Context from current chapter (${MOCK_CHAPTER.title}):\n${chapterText}\n\nUser Query: ${validatedInput.scriptureContent}`;
    }

    const result = await summarizeScripture(validatedInput);

    // Ensure the AI returns a valid, non-empty result.
    if (!result || !result.summary || !result.biasContext) {
      return {
        error: 'The AI failed to generate a valid summary. Please try again.',
        summary: null,
        biasContext: null,
      };
    }

    return { error: null, summary: result.summary, biasContext: result.biasContext };
  } catch (error) {
    console.error('Error in getScriptureSummaryAction:', error);

    // Handle validation errors specifically.
    if (error instanceof z.ZodError) {
      return {
        error: 'Invalid input provided. Please refresh and try again.',
        summary: null,
        biasContext: null,
      };
    }

    // Return a generic error message for all other cases to avoid leaking implementation details.
    return {
      error: 'An unexpected error occurred while generating the summary.',
      summary: null,
      biasContext: null,
    };
  }
}

export async function translateTextAction(input: TranslateTextInput) {
  try {
    const validatedInput = TranslateTextInputSchema.parse(input);
    const result = await translateText(validatedInput);

    if (!result || !result.translatedText) {
      return {
        error: 'The AI failed to generate a valid translation.',
        translatedText: null,
      };
    }

    return { error: null, translatedText: result.translatedText };
  } catch (error) {
    console.error('Error in translateTextAction:', error);

    if (error instanceof z.ZodError) {
      return {
        error: 'Invalid input provided for translation.',
        translatedText: null,
      };
    }

    return {
      error: 'An unexpected error occurred while translating the text.',
      translatedText: null,
    };
  }
}

export async function emotionSearchAction(query: string) {
  try {
    if (!query || query.trim().length === 0) {
      return { error: 'Please enter a feeling or situation.', data: null };
    }
    const input: EmotionSearchInput = { query: query.trim() };
    const result = await emotionScriptureSearch(input);
    return { error: null, data: result };
  } catch (error) {
    console.error('Error in emotionSearchAction:', error);
    return {
      error: 'Unable to search scriptures right now. Please try again.',
      data: null,
    };
  }
}

export async function generateVerseAudioAction(text: string) {
  try {
    if (!text || text.trim().length === 0) {
      return { error: 'No text provided for narration.', audio: null };
    }
    // Limit text length to avoid excessive API usage
    const truncated = text.trim().slice(0, 1000);
    const input: GenerateSpeechInput = { text: truncated, voice: 'Algenib' };
    const result = await generateSpeech(input);
    return { error: null, audio: result.audio };
  } catch (error) {
    console.error('Error in generateVerseAudioAction:', error);
    return {
      error: 'Unable to generate audio narration right now.',
      audio: null,
    };
  }
}
