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
const classes_1 = require("@src/other/classes");
const SqsMessageRepo_1 = __importDefault(require("@src/repos/SqsMessageRepo"));
const SqsQueueService_1 = require("./SqsQueueService");
const SqsMessageMapper_1 = __importDefault(require("@src/mappers/SqsMessageMapper"));
const SqsMessageStatus_1 = require("@src/constants/SqsMessageStatus");
const SqsMessageConfig_1 = require("@src/constants/SqsMessageConfig");
const SqsQueueRepo_1 = __importDefault(require("@src/repos/SqsQueueRepo"));
function inQueueMessage(sqsMessage) {
    const inQueueMessage = SqsMessageMapper_1.default.InQueueRequestToModel(sqsMessage);
    inQueueMessage.status = SqsMessageStatus_1.SqsMessageStatusEnum.IN_QUEUE;
    return SqsMessageRepo_1.default.inQueue(inQueueMessage);
}
function deQueueMessage(queueId) {
    return __awaiter(this, void 0, void 0, function* () {
        const batchSize = yield SqsQueueRepo_1.default.getQueueBatchSize(queueId);
        const queueItems = yield SqsMessageRepo_1.default.deQueue(queueId, batchSize);
        if (queueItems.length > 0) {
            setTimeout((queueId, messageIds) => __awaiter(this, void 0, void 0, function* () {
                yield SqsMessageRepo_1.default.updateStatusMany(queueId, messageIds, SqsMessageStatus_1.SqsMessageStatusEnum.IN_QUEUE);
            }), SqsMessageConfig_1.VISIBILITY_TIMEOUT, queueId, queueItems.map((item) => item._id));
        }
        return queueItems;
    });
}
function getAll() {
    return SqsMessageRepo_1.default.getAll();
}
function updateOne(sqsQueue) {
    return __awaiter(this, void 0, void 0, function* () {
        const persists = yield SqsMessageRepo_1.default.exists(sqsQueue.id);
        if (!persists) {
            throw new classes_1.RouteError(HttpStatusCodes_1.default.NOT_FOUND, SqsQueueService_1.SQSQUEUE_NOT_FOUND_ERR);
        }
        return SqsMessageRepo_1.default.update(sqsQueue);
    });
}
function _delete(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const persists = yield SqsMessageRepo_1.default.exists(id);
        if (!persists) {
            throw new classes_1.RouteError(HttpStatusCodes_1.default.NOT_FOUND, SqsQueueService_1.SQSQUEUE_NOT_FOUND_ERR);
        }
        return SqsMessageRepo_1.default.delete(id);
    });
}
function getAllByQueueId(queueId) {
    return __awaiter(this, void 0, void 0, function* () {
        return SqsMessageRepo_1.default.getAllByQueueId(queueId);
    });
}
function messagesHandledSuccessfully(queueId) {
    return __awaiter(this, void 0, void 0, function* () {
        return SqsMessageRepo_1.default.deleteVisible(queueId);
    });
}
exports.default = {
    getAll,
    updateOne,
    delete: _delete,
    inQueueMessage,
    deQueueMessage,
    getAllByQueueId,
    messagesHandledSuccessfully,
};
