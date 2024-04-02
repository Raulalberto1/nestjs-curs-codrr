"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useToken = void 0;
const jwt = require("jsonwebtoken");
const useToken = (token) => {
    try {
        const decode = jwt.decode(token);
        const curentDate = new Date();
        const expiresDate = new Date(decode.exp);
        return {
            sub: decode.sub,
            role: decode.role,
            isExpired: +expiresDate <= +curentDate / 1000,
        };
    }
    catch (error) {
        return 'token is invalid';
    }
};
exports.useToken = useToken;
//# sourceMappingURL=use.token.js.map