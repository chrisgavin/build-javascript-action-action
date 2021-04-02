import * as core from "@actions/core";
import * as exec from "@actions/exec";
import * as inputs from "./inputs";
import * as tags from "./tags";
import sourceMapSupport from "source-map-support";

async function main() {
	sourceMapSupport.install();

	await exec.exec(inputs.get().bootstrapCommand);

	await exec.exec("git", ["checkout", "--detach"]);
	await exec.exec("git", ["add", "--force", "."]);
	await exec.exec(
		"git", ["commit", "--message", inputs.get().commitMessage],
		{
			env: {
				GIT_COMMITTER_NAME: inputs.get().commitAuthorName,
				GIT_COMMITTER_EMAIL: inputs.get().commitAuthorEmail,
				GIT_AUTHOR_NAME: inputs.get().commitAuthorName,
				GIT_AUTHOR_EMAIL: inputs.get().commitAuthorEmail,
			},
		},
	);
	const targetTags = tags.getTargetTags();
	for (const tag of targetTags) {
		await exec.exec("git", ["tag", "--force", tag]);
	}
	let output = "";
	await exec.exec("git", ["ls-remote", "--tags", "--quiet"], {listeners: {stdout: data => output += data.toString()}});
	const existingTags = output.split("\n").map(line => line.split(" ").pop());
	if (existingTags.includes(`refs/tags/${inputs.get().tag}`)) {
		throw `Tag ${inputs.get().tag} already exists.`;
	}
	await exec.exec("git", ["push", "--force", "origin"].concat(targetTags.map(tag => `refs/tags/${tag}`)));
}

main().catch(error => core.setFailed(error.stack || error));
