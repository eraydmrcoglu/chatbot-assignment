"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponsesController = void 0;
const common_1 = require("@nestjs/common");
const responses_service_1 = require("./responses.service");
const create_response_dto_1 = require("./dto/create-response.dto");
const common_2 = require("@nestjs/common");
let ResponsesController = class ResponsesController {
    constructor(responsesService) {
        this.responsesService = responsesService;
    }
    async startSession(body) {
        await this.responsesService.createSession(body.userId);
        return { message: `Session started for user ${body.userId}` };
    }
    async create(createResponseDto) {
        return this.responsesService.saveResponses(createResponseDto.userId, createResponseDto.answers, createResponseDto.currentQuestionIndex);
    }
    async findAll() {
        return this.responsesService.findAll();
    }
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
};
exports.ResponsesController = ResponsesController;
__decorate([
    (0, common_1.Post)('start'),
    __param(0, (0, common_1.Body)(new common_2.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ResponsesController.prototype, "startSession", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new common_2.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_response_dto_1.CreateResponseDto]),
    __metadata("design:returntype", Promise)
], ResponsesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ResponsesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('questions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ResponsesController.prototype, "getQuestions", null);
exports.ResponsesController = ResponsesController = __decorate([
    (0, common_1.Controller)('responses'),
    __metadata("design:paramtypes", [responses_service_1.ResponsesService])
], ResponsesController);
//# sourceMappingURL=responses.controller.js.map