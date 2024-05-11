"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SqsMessageStatus_1 = require("@src/constants/SqsMessageStatus");
const mongoose_1 = require("mongoose");
function InQueueRequestToModel(message) {
    return {
        queueId: new mongoose_1.Types.ObjectId(message.queueId),
        body: message.body,
        id: '',
        status: SqsMessageStatus_1.SqsMessageStatusEnum.IN_QUEUE
    };
}
function toResource(message) {
    var _a;
    return {
        id: (_a = message._id) !== null && _a !== void 0 ? _a : '',
        body: message.body,
        status: message.status
    };
}
exports.default = {
    InQueueRequestToModel,
    toResource
};
