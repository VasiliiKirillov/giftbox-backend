import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';
import { transactionPrompt } from './prompts/transaction.prompt';

// Define the transaction schema
const Transaction = z.object({
  category: z.string(),
  amount: z.number(),
  type: z.union([z.literal("expense"), z.literal("income")]),
  message: z.string(),
});

type Transaction = z.infer<typeof Transaction> | null;

@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateChatCompletion(userMessage: string): Promise<Transaction> {
    try {
      const completion = await this.openai.beta.chat.completions.parse({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: transactionPrompt
          },
          { role: "user", content: userMessage }
        ],
        response_format: zodResponseFormat(Transaction, "transaction"),
      });

      return completion.choices[0].message.parsed;
    } catch (error) {
      console.error('Error calling OpenAI:', error);
      throw error;
    }
  }
}
