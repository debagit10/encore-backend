"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewCheck = void 0;
const leo_profanity_1 = __importDefault(require("leo-profanity"));
const reviewCheck = (text) => {
    return leo_profanity_1.default.check(text);
};
exports.reviewCheck = reviewCheck;
