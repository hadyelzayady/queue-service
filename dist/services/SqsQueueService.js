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
exports.SQSQUEUE_NOT_FOUND_ERR = void 0;
const SqsQueueRepo_1 = __importDefault(require("@src/repos/SqsQueueRepo"));
const classes_1 = require("@src/other/classes");
const HttpStatusCodes_1 = __importDefault(require("@src/constants/HttpStatusCodes"));
exports.SQSQUEUE_NOT_FOUND_ERR = 'sqsQueue not found';
function getAll() {
    return SqsQueueRepo_1.default.getAll();
}
function addOne(sqsQueue) {
    return SqsQueueRepo_1.default.add(sqsQueue);
}
function updateOne(sqsQueue) {
    return __awaiter(this, void 0, void 0, function* () {
        const persists = yield SqsQueueRepo_1.default.exists(sqsQueue.id);
        if (!persists) {
            throw new classes_1.RouteError(HttpStatusCodes_1.default.NOT_FOUND, exports.SQSQUEUE_NOT_FOUND_ERR);
        }
        return SqsQueueRepo_1.default.update(sqsQueue);
    });
}
function _delete(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const persists = yield SqsQueueRepo_1.default.exists(id);
        if (!persists) {
            throw new classes_1.RouteError(HttpStatusCodes_1.default.NOT_FOUND, exports.SQSQUEUE_NOT_FOUND_ERR);
        }
        return SqsQueueRepo_1.default.delete(id);
    });
}
exports.default = {
    getAll,
    addOne,
    updateOne,
    delete: _delete
};
