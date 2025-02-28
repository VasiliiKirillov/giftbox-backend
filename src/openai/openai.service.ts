import { Injectable } from '@nestjs/common';
import OpenAI, { ClientOptions } from 'openai';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';
import { transactionPrompt } from './prompts/transaction.prompt';
import { HttpsProxyAgent } from 'https-proxy-agent';

// Define the transaction schema
const Transaction = z.object({
  category: z.string().optional(),
  amount: z.number().optional(),
  type: z.union([z.literal('expense'), z.literal('income')]).optional(),
  message: z.string(),
  transactionRealized: z.boolean(),
});

type Transaction = z.infer<typeof Transaction> | null;

@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor() {
    const options: ClientOptions = {
      apiKey: process.env.OPENAI_API_KEY,
    };

    // Only use proxy in development mode
    if (process.env.NODE_ENV === 'development' && process.env.PROXY_URL) {
      const agent = new HttpsProxyAgent(process.env.PROXY_URL);
      options.httpAgent = agent;
    }

    this.openai = new OpenAI(options);
  }

  async generateChatCompletion(userMessage: string): Promise<Transaction> {
    try {
      const completion = await this.openai.beta.chat.completions.parse({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: transactionPrompt,
          },
          { role: 'user', content: userMessage },
        ],
        response_format: zodResponseFormat(Transaction, 'transaction'),
      });

      return completion.choices[0].message.parsed;
    } catch (error) {
      console.error('Error calling OpenAI:', error);
      throw error;
    }
  }
}
