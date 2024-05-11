"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatusCodes_1 = __importDefault(require("@src/constants/HttpStatusCodes"));
const MessageQueueService_1 = __importDefault(require("@src/services/MessageQueueService"));
const SqsMessageMapper_1 = __importDefault(require("@src/mappers/SqsMessageMapper"));
function inQueueMessage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const inQueuMessageRequest = req.body;
        console.log('what body', req.body);
        const result = yield MessageQueueService_1.default.inQueueMessage(inQueuMessageRequest);
        const resource = SqsMessageMapper_1.default.toResource(result);
        return res.status(HttpStatusCodes_1.default.OK).json(resource);
    });
}
function deQueueMessage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const deQueuMessageRequest = req.body;
        const result = yield MessageQueueService_1.default.deQueueMessage(deQueuMessageRequest.queueId);
        if (!result) {
            return res.status(HttpStatusCodes_1.default.OK).end();
        }
        const resources = result.map(SqsMessageMapper_1.default.toResource);
        return res.status(HttpStatusCodes_1.default.OK).json(resources);
    });
}
function deleteMessage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const messageId = req.params.messageId;
        yield MessageQueueService_1.default.delete(messageId);
        return res.status(HttpStatusCodes_1.default.OK).json();
    });
}
function messagesHandledSuccessfully(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("handler");
        const queueId = req.params.queueId;
        yield MessageQueueService_1.default.messagesHandledSuccessfully(queueId);
        return res.status(HttpStatusCodes_1.default.OK).json();
    });
}
exports.default = {
    inQueueMessage,
    deQueueMessage,
    deleteMessage,
    messagesHandledSuccessfully,
};
