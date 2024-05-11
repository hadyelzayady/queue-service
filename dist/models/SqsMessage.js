"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const SqsMessageStatus_1 = require("@src/constants/SqsMessageStatus");
const mongoose_1 = __importStar(require("mongoose"));
const INVALID_CONSTRUCTOR_PARAM = "nameOrObj arg must a string or an object with the appropriate sqsQueue keys.";
function new_(queueId, body, id) {
    return {
        id: id !== null && id !== void 0 ? id : "",
        queueId: new mongoose_1.Types.ObjectId(queueId),
        body: body,
        status: SqsMessageStatus_1.SqsMessageStatusEnum.IN_QUEUE,
    };
}
function from(param) {
    if (!isSqsMessage(param)) {
        throw new Error(INVALID_CONSTRUCTOR_PARAM);
    }
    const p = param;
    return new_(p.queueId.toString(), p.body, p.id);
}
function isSqsMessage(arg) {
    return (!!arg &&
        typeof arg === "object" &&
        "queueId" in arg &&
        "id" in arg &&
        "body" in arg);
}
const dataSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
    },
    body: {
        required: true,
        type: String,
    },
    queueId: {
        required: true,
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "SqsQueue",
    },
    status: {
        required: true,
        type: String,
        enum: SqsMessageStatus_1.SqsMessageStatusEnum,
    },
}, { timestamps: true });
const SqsQueueMessageModel = mongoose_1.default.model("SqsQueueMessage", dataSchema);
exports.default = {
    new: new_,
    from,
    isSqsMessage,
    SqsQueueMessageModel,
};
