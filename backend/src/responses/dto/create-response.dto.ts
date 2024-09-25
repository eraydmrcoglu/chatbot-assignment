import { IsString, IsNotEmpty, IsArray, IsNumber } from 'class-validator';

export class CreateResponseDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsArray()
  @IsNotEmpty()
  answers: { question: string; answer: string }[];

  @IsNumber()
  currentQuestionIndex: number;
}
