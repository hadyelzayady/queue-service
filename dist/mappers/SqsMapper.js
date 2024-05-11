"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toResource(message) {
    var _a;
    return {
        id: (_a = message._id) !== null && _a !== void 0 ? _a : "",
        name: message.name,
    };
}
exports.default = {
    toResource,
};
