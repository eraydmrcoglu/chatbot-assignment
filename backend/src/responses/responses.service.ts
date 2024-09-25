import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Response, ResponseDocument } from './schemas/response.schema';

@Injectable()
export class ResponsesService {
  constructor(
    @InjectModel(Response.name) private responseModel: Model<ResponseDocument>,
  ) {}

  async createSession(userId: string): Promise<Response> {
    const newSession = new this.responseModel({
      userId,
      sessionStart: new Date(),
      currentQuestionIndex: 0,
      answers: [],
    });
    return newSession.save();
  }

  // Save answers
  async saveResponses(
    userId: string,
    answers: { question: string; answer: string }[],
    currentQuestionIndex: number,
  ): Promise<Response> {
    const sessionEndTime = currentQuestionIndex === 10 ? new Date() : null;
    return this.responseModel
      .findOneAndUpdate(
        { userId },
        { answers, currentQuestionIndex, sessionEnd: sessionEndTime },
        { new: true, upsert: true },
      )
      .exec();
  }

  async findAll(): Promise<Response[]> {
    return this.responseModel.find().exec();
  }
}
