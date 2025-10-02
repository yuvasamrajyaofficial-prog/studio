'use server';

import { summarizeScripture } from '@/ai/flows/contextual-scripture-summarization';
import {
  SummarizeScriptureInputSchema,
  type SummarizeScriptureInput,
} from '@/ai/schemas';
import { z } from 'zod';

export async function getScriptureSummaryAction(
  input: SummarizeScriptureInput
) {
  try {
    // Validate input against the Zod schema to ensure type safety and prevent injection.
    const validatedInput = SummarizeScriptureInputSchema.parse(input);

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
