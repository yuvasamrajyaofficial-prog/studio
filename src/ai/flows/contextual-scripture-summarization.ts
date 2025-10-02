'use server';
/**
 * @fileOverview Summarizes a scripture based on the selected era and category, providing contextual information about potential biases.
 *
 * - summarizeScripture - A function that handles the scripture summarization process.
 */

import {ai} from '@/ai/genkit';
import {
  SummarizeScriptureInputSchema,
  SummarizeScriptureOutputSchema,
  type SummarizeScriptureInput,
  type SummarizeScriptureOutput,
} from '@/ai/schemas';

export async function summarizeScripture(
  input: SummarizeScriptureInput
): Promise<SummarizeScriptureOutput> {
  return summarizeScriptureFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeScripturePrompt',
  input: {schema: SummarizeScriptureInputSchema},
  output: {schema: SummarizeScriptureOutputSchema},
  prompt: `You are an expert in ancient scriptures. Your task is to provide a concise summary of the provided scripture content, tailored to the selected era and category. Additionally, provide a thoughtful analysis of potential biases relevant to the content, era, and category.

If the provided content seems unrelated or nonsensical for the given category and era, state that you cannot provide a summary for the given input.

Scripture Content: {{{scriptureContent}}}
Era: {{{era}}}
Category: {{{category}}}

Follow this structure precisely:
Summary: [Your summary here]
Bias Context: [Your bias context here]`,
});

const summarizeScriptureFlow = ai.defineFlow(
  {
    name: 'summarizeScriptureFlow',
    inputSchema: SummarizeScriptureInputSchema,
    outputSchema: SummarizeScriptureOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('AI failed to generate a response.');
    }
    return output;
  }
);
