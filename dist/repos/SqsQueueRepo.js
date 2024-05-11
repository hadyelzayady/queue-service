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
const classes_1 = require("@src/other/classes");
const SqsQueue_1 = __importDefault(require("@src/models/SqsQueue"));
const SqsQueueModel = SqsQueue_1.default.SqsQueueModel;
function getOne(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const sqsQueue = yield SqsQueueModel.findOne({ name });
        return sqsQueue;
    });
}
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const queues = yield SqsQueueModel.find();
        return queues;
    });
}
function add(sqsQueue) {
    return __awaiter(this, void 0, void 0, function* () {
        yield SqsQueueModel.create(sqsQueue);
        return;
    });
}
function update(sqsQueue) {
    return __awaiter(this, void 0, void 0, function* () {
        yield SqsQueueModel.updateOne({ sqsQueue });
        return;
    });
}
function delete_(id) {
    return __awaiter(this, void 0, void 0, function* () {
        SqsQueueModel.deleteOne({ id });
    });
}
function exists(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield SqsQueueModel.exists({ id });
        return result !== null;
    });
}
function getQueueBatchSize(queueId) {
    return __awaiter(this, void 0, void 0, function* () {
        const batchSize = yield SqsQueueModel.findById(queueId, ["batchSize"]);
        if (!batchSize) {
            throw new classes_1.ResournceNotFoundError(`Queue ${queueId} not found`);
        }
        return batchSize.batchSize;
    });
}
exports.default = {
    getOne,
    getAll,
    add,
    update,
    delete: delete_,
    exists,
    getQueueBatchSize,
};
