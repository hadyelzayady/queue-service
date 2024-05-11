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
const SqsQueueService_1 = __importDefault(require("@src/services/SqsQueueService"));
const MessageQueueService_1 = __importDefault(require("@src/services/MessageQueueService"));
const SqsMessageMapper_1 = __importDefault(require("@src/mappers/SqsMessageMapper"));
const SqsMapper_1 = __importDefault(require("@src/mappers/SqsMapper"));
function getAll(_, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const sqsQueues = yield SqsQueueService_1.default.getAll();
        return res
            .status(HttpStatusCodes_1.default.OK)
            .json(sqsQueues.map(SqsMapper_1.default.toResource));
    });
}
function add(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const sqsQueue = req.body;
        yield SqsQueueService_1.default.addOne(sqsQueue);
        return res.status(HttpStatusCodes_1.default.CREATED).end();
    });
}
function update(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const sqsQueue = req.body;
        yield SqsQueueService_1.default.updateOne(sqsQueue);
        return res.status(HttpStatusCodes_1.default.OK).end();
    });
}
function delete_(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = +req.params.id;
        yield SqsQueueService_1.default.delete(id);
        return res.status(HttpStatusCodes_1.default.OK).end();
    });
}
function getQueueMessages(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("GET messages***************8");
        const queueId = req.params.queueId;
        const messages = yield MessageQueueService_1.default.getAllByQueueId(queueId);
        return res
            .status(HttpStatusCodes_1.default.OK)
            .json(messages.map(SqsMessageMapper_1.default.toResource));
    });
}
exports.default = {
    getAll,
    add,
    update,
    delete: delete_,
    getQueueMessages,
};
