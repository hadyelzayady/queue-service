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
const SqsMessageStatus_1 = require("@src/constants/SqsMessageStatus");
const SqsMessage_1 = __importDefault(require("@src/models/SqsMessage"));
const mongoose_1 = __importDefault(require("mongoose"));
const promises_1 = require("timers/promises");
const SqsQueueMessageModel = SqsMessage_1.default.SqsQueueMessageModel;
function getOne(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const sqsQueue = yield SqsQueueMessageModel.findOne({ name });
        return sqsQueue;
    });
}
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const queues = yield SqsQueueMessageModel.find();
        return queues;
    });
}
function inQueue(sqsQueue) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("create", sqsQueue);
        const result = yield SqsQueueMessageModel.create(sqsQueue);
        return result;
    });
}
function update(sqsQueue) {
    return __awaiter(this, void 0, void 0, function* () {
        yield SqsQueueMessageModel.updateOne({ sqsQueue });
        return;
    });
}
function delete_(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield SqsQueueMessageModel.deleteOne({ _id: id });
    });
}
function exists(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield SqsQueueMessageModel.exists({ _id: id });
        return result !== null;
    });
}
function queueHasInProgressMessages(queueId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield SqsQueueMessageModel.exists({
            queueId,
            status: SqsMessageStatus_1.SqsMessageStatusEnum.IN_PROCESS,
        });
        return result !== null;
    });
}
let x = 0;
function deQueue(queueId, batchSize) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = yield mongoose_1.default.startSession({
            defaultTransactionOptions: {
                maxTimeMS: 15000,
                retryWrites: true,
            },
        });
        session.startTransaction();
        const updatedMessages = yield SqsQueueMessageModel.find({
            queueId,
        }, null, { sort: { createdAt: 1 }, limit: batchSize }).session(session);
        console.log("updatedMessages", updatedMessages, x);
        if (x === 0) {
            x = x + 1;
            yield (0, promises_1.setTimeout)(5000);
        }
        else {
            x = 0;
        }
        if (updatedMessages.some((item) => item.status === SqsMessageStatus_1.SqsMessageStatusEnum.IN_PROCESS)) {
            session.abortTransaction();
            return [];
        }
        try {
            yield SqsQueueMessageModel.updateMany({
                _id: { $in: updatedMessages.map((item) => item._id) },
            }, { $set: { status: SqsMessageStatus_1.SqsMessageStatusEnum.IN_PROCESS } }).session(session);
            console.log("commit");
            const result = yield session.commitTransaction();
            const resultMessages = yield SqsQueueMessageModel.find({
                queueId,
            }, null, { sort: { createdAt: 1 }, limit: batchSize }).session(session);
            console.log("result", result);
            return resultMessages;
        }
        catch (ex) {
            console.log("ex", ex);
            return [];
        }
    });
}
function getAllByQueueId(queueId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield SqsQueueMessageModel.find({ queueId: queueId }, undefined, {
            sort: { createdAt: 1 },
        });
        return result;
    });
}
function updateStatusMany(queueId, messageIds, status) {
    return __awaiter(this, void 0, void 0, function* () {
        yield SqsQueueMessageModel.updateMany({ queueId: queueId, _id: { $in: messageIds } }, { $set: { status: status } });
        return;
    });
}
function deleteVisible(queueId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield SqsQueueMessageModel.deleteMany({
            queueId: queueId,
            status: SqsMessageStatus_1.SqsMessageStatusEnum.IN_PROCESS,
        });
    });
}
exports.default = {
    getOne,
    getAll,
    inQueue,
    update,
    delete: delete_,
    exists,
    queueHasInProgressMessages,
    deQueue,
    getAllByQueueId,
    updateStatusMany,
    deleteVisible,
};
