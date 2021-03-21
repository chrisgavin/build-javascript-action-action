import * as inputs from "./inputs";

const SEPARATOR = ".";

export function expandTargetTags(primaryTag:string):string[] {
	const targetTags:string[] = [];
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

export function getTargetTags():string[] {
	return expandTargetTags(inputs.get().tag);
}
