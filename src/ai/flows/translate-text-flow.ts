'use server';
/**
 * @fileOverview Translates text from a source language to a target language.
 *
 * - translateText - A function that handles the text translation process.
 */

import { ai } from '@/ai/genkit';
import {
  TranslateTextInputSchema,
  TranslateTextOutputSchema,
  type TranslateTextInput,
  type TranslateTextOutput,
} from '@/ai/schemas';

export async function translateText(
  input: TranslateTextInput
): Promise<TranslateTextOutput> {
  return translateTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translateTextPrompt',
  input: { schema: TranslateTextInputSchema },
  output: { schema: TranslateTextOutputSchema },
  prompt: `Translate the following text from {{sourceLang}} to {{targetLang}}.

Input Text:
{{{text}}}

Only return the translated text, with no additional commentary or explanations.`,
});

const translateTextFlow = ai.defineFlow(
  {
    name: 'translateTextFlow',
    inputSchema: TranslateTextInputSchema,
    outputSchema: TranslateTextOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('AI failed to generate a translation.');
    }
    return output;
  }
);
