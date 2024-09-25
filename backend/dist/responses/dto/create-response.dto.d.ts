export declare class CreateResponseDto {
    userId: string;
    answers: {
        question: string;
        answer: string;
    }[];
    currentQuestionIndex: number;
}
