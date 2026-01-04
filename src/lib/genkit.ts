import { gemini15Flash, googleAI } from '@genkit-ai/googleai';
import { genkit } from 'genkit';

// Configure a Genkit instance
export const ai = genkit({
  plugins: [googleAI()],
  model: gemini15Flash, // set default model
});

// Define a simple flow
export const helloFlow = ai.defineFlow('helloFlow', async (name) => {
  // make a generation request
  const { text } = await ai.generate(`Hello Gemini, my name is ${name}`);
  console.log(text);
  return text;
});
