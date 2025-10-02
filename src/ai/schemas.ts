import { z } from 'zod';

export const SummarizeScriptureInputSchema = z.object({
  scriptureContent: z
    .string()
    .min(1, { message: 'Scripture content cannot be empty.' })
    .describe('The content of the scripture to be summarized.'),
  era: z
    .string()
    .min(1, { message: 'Era cannot be empty.' })
    .describe('The historical era of the scripture.'),
  category: z
    .string()
    .min(1, { message: 'Category cannot be empty.' })
    .describe('The category of the scripture.'),
});
export type SummarizeScriptureInput = z.infer<
  typeof SummarizeScriptureInputSchema
>;

export const SummarizeScriptureOutputSchema = z.object({
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
