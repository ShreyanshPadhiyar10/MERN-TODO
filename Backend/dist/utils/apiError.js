"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiError = void 0;
class apiError extends Error {
    constructor(code, message = "Something went wrong", data = "") {
        super(message);
        this.code = code;
        this.message = message;
        this.data = null;
    }
}
exports.apiError = apiError;
//# sourceMappingURL=apiError.js.map