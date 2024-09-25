import { Model } from 'mongoose';
import { Response, ResponseDocument } from './schemas/response.schema';
export declare class ResponsesService {
    private responseModel;
    constructor(responseModel: Model<ResponseDocument>);
    createSession(userId: string): Promise<Response>;
    saveResponses(userId: string, answers: {
        question: string;
        answer: string;
    }[], currentQuestionIndex: number): Promise<Response>;
    findAll(): Promise<Response[]>;
}
