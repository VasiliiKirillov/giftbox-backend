import { Injectable } from '@nestjs/common';
import OpenAI, { ClientOptions } from 'openai';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';
import { transactionPrompt } from './prompts/transaction.prompt';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { StorageService } from '../storage/storage.service';
import { AccountingRecordService } from '../accounting-record/accounting-record.service';

// Define the transaction schema
const Transaction = z.object({
  record: z.string().optional(),
  amount: z.number().optional(),
  type: z.union([z.literal('expense'), z.literal('income')]).optional(),
  technicalMessage: z.string(),
  report: z.string(),
  transactionMonth: z.number(),
  transactionYear: z.number(),
  storage: z.string(),
});

type Transaction = z.infer<typeof Transaction> | null;

@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor(
    private readonly accountingRecordService: AccountingRecordService,
    private readonly storageService: StorageService,
  ) {
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
      // Get all storages
      const storages = await this.storageService.findAll();
      const storageNames = storages.map((storage) => storage.name).join(',');
      const defaultStorage = storages.find((storage) => storage.isDefault)?.name || '';

      // Get current date
      const now = new Date();
      const currentMonth = now.getMonth() + 1; // getMonth() returns 0-11
      const currentYear = now.getFullYear();

      const completion = await this.openai.beta.chat.completions.parse({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: transactionPrompt(currentMonth, currentYear, storageNames, defaultStorage),
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

  async processResponse(response: Transaction) {
    if (!response) {
      throw new Error('Invalid response from OpenAI');
    }

    const storage = await this.storageService.findByName(response.storage);
    if (!storage) {
      throw new Error(`Storage ${response.storage} not found`);
    }

    if (!response.amount || !response.type || !response.storage || !response.record) {
      throw new Error('No data in response from OpenAI');
    }

    const accountingRecord = await this.accountingRecordService.create({
      storageId: storage.id,
      amount: response.amount,
      type: response.type?.toUpperCase(),
      description: response.record,
      date: new Date(response.transactionYear, response.transactionMonth),
    });

    if (!accountingRecord) {
      throw new Error('Failed to create accounting record');
    }

    return { ...response, accountingRecordId: accountingRecord.id };
  }
}
