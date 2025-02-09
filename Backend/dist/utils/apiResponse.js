"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiResponse = void 0;
class apiResponse {
    constructor(code = 200, message = "Success", data = {}, success = false) {
        this.code = code;
        this.message = message;
        this.data = data;
        this.success = success;
    }
}
exports.apiResponse = apiResponse;
//# sourceMappingURL=apiResponse.js.map