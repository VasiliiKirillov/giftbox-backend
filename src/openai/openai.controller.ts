import { Controller, Post, Body } from '@nestjs/common';
import { OpenAIService } from './openai.service';

@Controller('openai')
export class OpenAIController {
  constructor(private readonly openaiService: OpenAIService) {}

  @Post('chat')
  async generateResponse(@Body('message') message: string) {
    try {
      const response = await this.openaiService.generateChatCompletion(message);
      if (!response) {
        return { success: false, error: 'No response from OpenAI' };
      }
      const processedResponse = await this.openaiService.processResponse(response);
      return { success: true, response: processedResponse };
    } catch (error: unknown) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      };
    }
  }
}
