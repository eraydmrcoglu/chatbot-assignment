import { Document } from 'mongoose';
export type ResponseDocument = Response & Document;
export declare class Response {
    userId: string;
    answers: {
        question: string;
        answer: string;
    }[];
    sessionStart: Date;
    sessionEnd: Date;
    currentQuestionIndex: number;
}
export declare const ResponseSchema: import("mongoose").Schema<Response, import("mongoose").Model<Response, any, any, any, Document<unknown, any, Response> & Response & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Response, Document<unknown, {}, import("mongoose").FlatRecord<Response>> & import("mongoose").FlatRecord<Response> & {
    _id: import("mongoose").Types.ObjectId;
}>;
