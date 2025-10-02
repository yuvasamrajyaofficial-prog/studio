'use server';
/**
 * @fileOverview Summarizes a scripture based on the selected era and category, providing contextual information about potential biases.
 *
 * - summarizeScripture - A function that handles the scripture summarization process.
 * - SummarizeScriptureInput - The input type for the summarizeScripture function.
 * - SummarizeScriptureOutput - The return type for the summarizeScripture function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeScriptureInputSchema = z.object({
  scriptureContent: z
    .string()
    .describe('The content of the scripture to be summarized.'),
  era: z.string().describe('The historical era of the scripture.'),
  category: z.string().describe('The category of the scripture.'),
});
export type SummarizeScriptureInput = z.infer<
  typeof SummarizeScriptureInputSchema
>;

const SummarizeScriptureOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the scripture.'),
  biasContext: z
    .string()
    .describe(
      'Information about potential biases relevant to the scripture content, era, and category.'
    ),
});
export type SummarizeScriptureOutput = z.infer<
  typeof SummarizeScriptureOutputSchema
>;

export async function summarizeScripture(
  input: SummarizeScriptureInput
): Promise<SummarizeScriptureOutput> {
  return summarizeScriptureFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeScripturePrompt',
  input: {schema: SummarizeScriptureInputSchema},
  output: {schema: SummarizeScriptureOutputSchema},
  prompt: `You are an expert in ancient scriptures. Provide a concise summary of the scripture tailored to the selected era and category. Also, provide information about potential biases relevant to the content, era, and category.\n\nScripture Content: {{{scriptureContent}}}\nEra: {{{era}}}\nCategory: {{{category}}}\n\nSummary:\nBias Context:`,
});

const summarizeScriptureFlow = ai.defineFlow(
  {
    name: 'summarizeScriptureFlow',
    inputSchema: SummarizeScriptureInputSchema,
    outputSchema: SummarizeScriptureOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
