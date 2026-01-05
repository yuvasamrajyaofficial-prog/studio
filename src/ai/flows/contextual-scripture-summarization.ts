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
  prompt: `You are an expert in ancient scriptures and spiritual wisdom. Your task is to provide a concise summary or answer based on the provided input, tailored to the selected era and category.

User Context:
{{#if userContext.name}}Name: {{userContext.name}}{{/if}}
{{#if userContext.soulId}}Soul ID: {{userContext.soulId}}{{/if}}
{{#if userContext.interests}}Interests: {{userContext.interests}}{{/if}}

Page Context:
{{#if pageContext.path}}Current Page: {{pageContext.path}}{{/if}}
{{#if pageContext.title}}Page Title: {{pageContext.title}}{{/if}}

Scripture Content / User Query: {{{scriptureContent}}}
Era: {{{era}}}
Category: {{{category}}}

Instructions:
1. Provide a concise summary or answer to the user's query.
2. If the user has a Soul ID or interests, try to personalize the answer slightly to resonate with their path (e.g., if they like Yoga, mention relevant yogic concepts).
3. If the query is about the current page context, use that information to be more specific.
4. Provide a thoughtful analysis of potential biases relevant to the content, era, and category.
5. If the provided content seems unrelated or nonsensical for the given category and era, state that you cannot provide a summary for the given input.

Follow this structure precisely:
Summary: [Your summary/answer here]
Bias Context: [Your bias analysis here]`,
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
