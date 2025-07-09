"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOtpHtmlTemplate = exports.compileTemplate = exports.loadTemplate = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const handlebars_1 = __importDefault(require("handlebars"));
const loadTemplate = async (templateName) => {
    const filePath = path_1.default.join(__dirname, `${templateName}.html`);
    return await fs_1.promises.readFile(filePath, "utf-8");
};
exports.loadTemplate = loadTemplate;
const compileTemplate = (html, data) => {
    const template = handlebars_1.default.compile(html);
    return template(data);
};
exports.compileTemplate = compileTemplate;
const getOtpHtmlTemplate = async (otp, firstName) => {
    const filePath = path_1.default.join(__dirname, "templates", "otp-template.html");
    let template = await fs_1.promises.readFile(filePath, "utf-8");
    template = template
        .replace("{{otp}}", otp)
        .replace("{{firstName}}", firstName)
        .replace("{{year}}", new Date().getFullYear().toString());
    return template;
};
exports.getOtpHtmlTemplate = getOtpHtmlTemplate;
