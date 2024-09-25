import { Controller, Get, Post, Body } from '@nestjs/common';
import { ResponsesService } from './responses.service';
import { CreateResponseDto } from './dto/create-response.dto';
import { ValidationPipe } from '@nestjs/common';

@Controller('responses')
export class ResponsesController {
  constructor(private readonly responsesService: ResponsesService) {}

  @Post('start')
  async startSession(@Body(new ValidationPipe()) body: { userId: string }) {
    await this.responsesService.createSession(body.userId);
    return { message: `Session started for user ${body.userId}` };
  }

  @Post()
  async create(
    @Body(new ValidationPipe()) createResponseDto: CreateResponseDto,
  ) {
    return this.responsesService.saveResponses(
      createResponseDto.userId,
      createResponseDto.answers,
      createResponseDto.currentQuestionIndex,
    );
  }

  @Get()
  async findAll() {
    return this.responsesService.findAll();
  }

  @Get('questions')
  getQuestions() {
    const questions = [
      'What is your favorite breed of cat, and why?',
      'How do you think cats communicate with their owners?',
      'Have you ever owned a cat? If so, what was their name and personality like?',
      'Why do you think cats love to sleep in small, cozy places?',
      'What’s the funniest or strangest behavior you’ve ever seen a cat do?',
      'Do you prefer cats or kittens, and what’s the reason for your preference?',
      'Why do you think cats are known for being independent animals?',
      'How do you think cats manage to land on their feet when they fall?',
      'What’s your favorite fact or myth about cats?',
      'How would you describe the relationship between humans and cats in three words?',
    ];
    return { questions };
  }
}
