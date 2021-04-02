"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTargetTags = exports.expandTargetTags = void 0;
const inputs = __importStar(require("./inputs"));
const SEPARATOR = ".";
function expandTargetTags(primaryTag) {
    const targetTags = [];
    for (const part of primaryTag.split(SEPARATOR)) {
        const previousTag = targetTags[targetTags.length - 1];
        let prefix = "";
        if (previousTag !== undefined) {
            prefix = previousTag + SEPARATOR;
        }
        targetTags.push(prefix + part);
    }
    return targetTags;
}
exports.expandTargetTags = expandTargetTags;
function getTargetTags() {
    return expandTargetTags(inputs.get().tag);
}
exports.getTargetTags = getTargetTags;
//# sourceMappingURL=tags.js.map