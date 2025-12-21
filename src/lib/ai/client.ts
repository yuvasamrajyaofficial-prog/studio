import { getAISettings, Provider } from './settings-storage';

export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface StreamCallback {
  onToken: (token: string) => void;
  onComplete: () => void;
  onError: (error: string) => void;
}

/**
 * Main AI client that routes to correct provider
 */
export async function generateAIResponse(
  userId: string,
  messages: AIMessage[],
  callbacks: StreamCallback
): Promise<void> {
  try {
    // Get user's AI settings
    const settings = await getAISettings(userId);
    
    if (!settings || !settings.apiKey) {
      callbacks.onError('No API key configured. Please set up your AI provider in settings.');
      return;
    }
    
    if (!settings.isValid) {
      callbacks.onError('Your API key is invalid. Please update it in settings.');
      return;
    }
    
    // Route to correct provider
    switch (settings.provider) {
      case 'gemini':
        await generateWithGemini(settings.apiKey, messages, callbacks);
        break;
      case 'openai':
        await generateWithOpenAI(settings.apiKey, messages, callbacks);
        break;
      case 'claude':
        await generateWithClaude(settings.apiKey, messages, callbacks);
        break;
      default:
        callbacks.onError('Unknown AI provider');
    }
  } catch (error: any) {
    console.error('AI generation error:', error);
    callbacks.onError(error.message || 'Failed to generate response');
  }
}

/**
 * Generate response using Gemini
 */
async function generateWithGemini(
  apiKey: string,
  messages: AIMessage[],
  callbacks: StreamCallback
): Promise<void> {
  try {
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    // Convert messages to Gemini format
    const history = messages.slice(0, -1).map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));
    
    const lastMessage = messages[messages.length - 1].content;
    
    const chat = model.startChat({ history });
    const result = await chat.sendMessageStream(lastMessage);
    
    // Stream response
    for await (const chunk of result.stream) {
      const text = chunk.text();
      callbacks.onToken(text);
    }
    
    callbacks.onComplete();
  } catch (error: any) {
    console.error('Gemini error:', error);
    callbacks.onError(error.message || 'Gemini API error');
  }
}

/**
 * Generate response using OpenAI
 */
async function generateWithOpenAI(
  apiKey: string,
  messages: AIMessage[],
  callbacks: StreamCallback
): Promise<void> {
  try {
    const OpenAI = (await import('openai')).default;
    const openai = new OpenAI({ 
      apiKey, 
      dangerouslyAllowBrowser: true // For client-side usage
    });
    
    const stream = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: messages.map(m => ({ role: m.role, content: m.content })),
      stream: true,
    });
    
    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content || '';
      if (text) {
        callbacks.onToken(text);
      }
    }
    
    callbacks.onComplete();
  } catch (error: any) {
    console.error('OpenAI error:', error);
    callbacks.onError(error.message || 'OpenAI API error');
  }
}

/**
 * Generate response using Claude
 */
async function generateWithClaude(
  apiKey: string,
  messages: AIMessage[],
  callbacks: StreamCallback
): Promise<void> {
  try {
    const Anthropic = (await import('@anthropic-ai/sdk')).default;
    const client = new Anthropic({ 
      apiKey,
      dangerouslyAllowBrowser: true // For client-side usage - NOT recommended for production
    });
    
    const stream = await client.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1024,
      messages: messages
        .filter(m => m.role !== 'system')
        .map(m => ({ role: m.role, content: m.content })),
      stream: true,
    });
    
    for await (const event of stream) {
      if (event.type === 'content_block_delta' && 'delta' in event && 'text' in event.delta) {
        callbacks.onToken(event.delta.text);
      }
    }
    
    callbacks.onComplete();
  } catch (error: any) {
    console.error('Claude error:', error);
    callbacks.onError(error.message || 'Claude API error');
  }
}
