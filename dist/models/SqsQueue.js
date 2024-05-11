"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const INVALID_CONSTRUCTOR_PARAM = `nameOrObj arg must a string or an object with the appropriate sqsQueue keys.`;
function new_(name, id) {
    return {
        id: id !== null && id !== void 0 ? id : -1,
        name: name !== null && name !== void 0 ? name : "",
        batchSize: undefined,
    };
}
function from(param) {
    if (!isSqsQueue(param)) {
        throw new Error(INVALID_CONSTRUCTOR_PARAM);
    }
    const p = param;
    return new_(p.name, p.id);
}
function isSqsQueue(arg) {
    return !!arg && typeof arg === "object" && "id" in arg && "name" in arg;
}
function isSqsQueueAdd(arg) {
    return !!arg && typeof arg === "object" && "name" in arg;
}
function isSqsQueueUpdate(arg) {
    return isSqsQueueAdd(arg);
}
const dataSchema = new mongoose_1.default.Schema({
    id: {
        type: Number,
    },
    name: {
        required: true,
        type: String,
    },
    batchSize: {
        required: true,
        type: Number,
        default: 10,
    },
});
const SqsQueueModel = mongoose_1.default.model("SqsQueue", dataSchema);
exports.default = {
    new: new_,
    from,
    isSqsQueue,
    isSqsQueueAdd,
    isSqsQueueUpdate,
    SqsQueueModel,
};
