import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ResponseDocument = Response & Document;

@Schema()
export class Response {
  @Prop({ required: true })
  userId: string;

  @Prop({ type: Array, default: [] })
  answers: { question: string; answer: string }[];

  @Prop({ default: Date.now })
  sessionStart: Date;

  @Prop()
  sessionEnd: Date;

  @Prop({ default: 0 })
  currentQuestionIndex: number;
}

export const ResponseSchema = SchemaFactory.createForClass(Response);
