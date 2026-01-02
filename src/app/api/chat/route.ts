import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { getAISettings } from '@/lib/ai/settings-storage';
import { createSystemMessage } from '@/lib/ai/spiritual-context';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages, userId } = await req.json();

    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Get user's AI settings
    const settings = await getAISettings(userId);
    
    if (!settings || !settings.apiKey) {
      return new Response(JSON.stringify({ error: 'No API key configured. Please set up your AI provider in settings.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    if (!settings.isValid) {
      return new Response(JSON.stringify({ error: 'Your API key is invalid. Please update it in settings.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Get spiritual context
    const systemMessage = await createSystemMessage(userId);

    // Select model based on provider
    let model;
    switch (settings.provider) {
      case 'gemini':
        model = google('gemini-1.5-flash', {
          apiKey: settings.apiKey,
        });
        break;
      case 'openai':
        model = openai('gpt-4', {
          apiKey: settings.apiKey,
        });
        break;
      case 'claude':
        model = anthropic('claude-3-5-sonnet-20241022', {
          apiKey: settings.apiKey,
        });
        break;
      default:
        return new Response(JSON.stringify({ error: 'Unknown AI provider' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
    }

    // Stream the response using Vercel AI SDK
    const result = streamText({
      model,
      system: systemMessage.content,
      messages,
      temperature: 0.7,
      maxTokens: 2048,
    });

    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error('Chat API error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Failed to generate response' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
