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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const exec = __importStar(require("@actions/exec"));
const inputs = __importStar(require("./inputs"));
const tags = __importStar(require("./tags"));
const source_map_support_1 = __importDefault(require("source-map-support"));
async function main() {
    source_map_support_1.default.install();
    await exec.exec(inputs.get().bootstrapCommand);
    await exec.exec("git", ["checkout", "--detach"]);
    await exec.exec("git", ["add", "--force", "."]);
    await exec.exec("git", ["commit", "--message", inputs.get().commitMessage], {
        env: {
            GIT_COMMITTER_NAME: inputs.get().commitAuthorName,
            GIT_COMMITTER_EMAIL: inputs.get().commitAuthorEmail,
            GIT_AUTHOR_NAME: inputs.get().commitAuthorName,
            GIT_AUTHOR_EMAIL: inputs.get().commitAuthorEmail,
        },
    });
    const targetTags = tags.getTargetTags();
    for (const tag of targetTags) {
        await exec.exec("git", ["tag", "--force", tag]);
    }
    let output = "";
    await exec.exec("git", ["ls-remote", "--tags", "--quiet"], { listeners: { stdout: data => output += data.toString() } });
    output = output.trimEnd();
    const existingTags = output.split("\n").map(line => line.split("\t").pop());
    if (existingTags.includes(`refs/tags/${inputs.get().tag}`)) {
        throw `Tag ${inputs.get().tag} already exists.`;
    }
    await exec.exec("git", ["push", "--force", "origin"].concat(targetTags.map(tag => `refs/tags/${tag}`)));
}
main().catch(error => core.setFailed(error.stack || error));
//# sourceMappingURL=index.js.map