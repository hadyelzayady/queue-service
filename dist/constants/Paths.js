"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    Base: "/api",
    Queues: {
        Base: "/queues",
        Get: "/all",
        Add: "/add",
        Update: "/update",
        Delete: "/delete/:id",
        messages: "/:queueId/messages",
    },
    Messages: {
        Base: "/messages",
        messagesHandedSuccessfully: "/:queueId/handledSuccessfully",
        InQueue: "/produce",
        DeQueue: "/consume",
        Delete: "/:messageId/delete",
    },
};
