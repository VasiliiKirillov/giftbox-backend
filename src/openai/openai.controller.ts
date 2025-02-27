import { Controller, Post, Body } from '@nestjs/common';
import { OpenAIService } from './openai.service';

@Controller('openai')
export class OpenAIController {
  constructor(private readonly openaiService: OpenAIService) {}

  @Post('chat')
  async generateResponse(@Body('message') message: string) {
    try {
      const response = await this.openaiService.generateChatCompletion(message);
      return { success: true, response };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
} 