
'use server';
/**
 * @fileOverview A Text-to-Speech (TTS) flow that converts text into audible speech.
 *
 * - generateSpeech - A function that handles the speech generation process.
 * - GenerateSpeechInputSchema - The input type for the generateSpeech function.
 * - GenerateSpeechOutputSchema - The return type for the generateSpeech function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import wav from 'wav';

// List of pre-built voices available in the Gemini TTS model.
// See: https://cloud.google.com/vertex-ai/generative-ai/docs/text-to-speech/voices
const PREBUILT_VOICES = [
  'gemini-1.0-pro-001',
  'gemini-1.5-flash-001',
  'gemini-1.5-pro-001',
  'Achernar',
  'Algenib',
  'Algieba',
  'Alphard',
  'Regor',
  'Antares',
  'Canopus',
  'Capella',
  'Deneb',
  'Elara',
  'Hadar',
  'Kalliope',
  'Leda',
  'Metis',
  'Mintaka',
  'Nunki',
  'Pandia',
  'Pollux',
  'Procyon',
  'Rigel',
  'Saiph',
  'Spica',
  'Thebe',
  'Zosma',
] as const;

export const GenerateSpeechInputSchema = z.object({
  text: z.string().min(1).describe('The text to be converted to speech.'),
  voice: z.enum(PREBUILT_VOICES).default('Algenib').describe('The voice to use for the speech.'),
});
export type GenerateSpeechInput = z.infer<typeof GenerateSpeechInputSchema>;

export const GenerateSpeechOutputSchema = z.object({
  audio: z.string().describe("The generated audio as a base64 encoded data URI in WAV format. Expected format: 'data:audio/wav;base64,<encoded_data>'."),
});
export type GenerateSpeechOutput = z.infer<typeof GenerateSpeechOutputSchema>;

/**
 * Converts text into speech using a Genkit flow.
 * @param input The input containing the text and desired voice.
 * @returns A promise that resolves to the generated audio data.
 */
export async function generateSpeech(input: GenerateSpeechInput): Promise<GenerateSpeechOutput> {
  return generateSpeechFlow(input);
}

const generateSpeechFlow = ai.defineFlow(
  {
    name: 'generateSpeechFlow',
    inputSchema: GenerateSpeechInputSchema,
    outputSchema: GenerateSpeechOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: input.voice },
          },
        },
      },
      prompt: input.text,
    });

    if (!media) {
      throw new Error('TTS model did not return any media.');
    }

    // The audio is returned as a base64 string in PCM format. We need to convert it to WAV.
    const pcmAudioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    
    const wavAudioBase64 = await toWav(pcmAudioBuffer);

    return {
      audio: `data:audio/wav;base64,${wavAudioBase64}`,
    };
  }
);

/**
 * Converts raw PCM audio data into a WAV format buffer.
 * @param pcmData The raw PCM audio data.
 * @param channels Number of audio channels.
 * @param sampleRate The sample rate of the audio.
 * @param sampleWidth The sample width (bytes per sample).
 * @returns A promise that resolves to the base64 encoded WAV audio.
 */
async function toWav(
  pcmData: Buffer,
  channels: number = 1,
  sampleRate: number = 24000,
  sampleWidth: number = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate,
      bitDepth: sampleWidth * 8,
    });

    const buffers: any[] = [];
    writer.on('error', reject);
    writer.on('data', (chunk) => {
      buffers.push(chunk);
    });
    writer.on('end', () => {
      resolve(Buffer.concat(buffers).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}
