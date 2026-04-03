import * as inputs from "./inputs.js";
const SEPARATOR = ".";
export function expandTargetTags(primaryTag) {
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
export function getTargetTags() {
    return expandTargetTags(inputs.get().tag);
}
//# sourceMappingURL=tags.js.map