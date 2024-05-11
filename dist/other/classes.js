"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResournceNotFoundError = exports.RouteError = void 0;
class RouteError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
exports.RouteError = RouteError;
class ResournceNotFoundError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.ResournceNotFoundError = ResournceNotFoundError;
