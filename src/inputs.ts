import * as core from "@actions/core";

class Inputs {
	githubToken = core.getInput("github-token", {required: true});
	githubRepository = core.getInput("github-repository", {required: true});
	bootstrapCommand = core.getInput("bootstrap-command", {required: true});
	commitAuthorName = core.getInput("commit-author-name", {required: true});
	commitAuthorEmail = core.getInput("commit-author-email", {required: true});
	commitMessage = core.getInput("commit-message", {required: true});
	tag = core.getInput("tag", {required: true});
}

export function get():Inputs {
	return new Inputs();
}
