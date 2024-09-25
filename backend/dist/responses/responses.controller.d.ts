import { ResponsesService } from './responses.service';
import { CreateResponseDto } from './dto/create-response.dto';
export declare class ResponsesController {
    private readonly responsesService;
    constructor(responsesService: ResponsesService);
    startSession(body: {
        userId: string;
    }): Promise<{
        message: string;
    }>;
    create(createResponseDto: CreateResponseDto): Promise<import("./schemas/response.schema").Response>;
    findAll(): Promise<import("./schemas/response.schema").Response[]>;
    getQuestions(): {
        questions: string[];
    };
}
