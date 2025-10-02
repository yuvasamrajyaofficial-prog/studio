'use server';

import { summarizeScripture, type SummarizeScriptureInput } from "@/ai/flows/contextual-scripture-summarization";

export async function getScriptureSummaryAction(input: SummarizeScriptureInput) {
  try {
    const result = await summarizeScripture(input);
    if (!result) {
        return { error: 'Failed to get summary from AI.', summary: null, biasContext: null };
    }
    return { error: null, summary: result.summary, biasContext: result.biasContext };
  } catch (error) {
    console.error("Error in getScriptureSummaryAction:", error);
    return { error: 'An unexpected error occurred.', summary: null, biasContext: null };
  }
}
