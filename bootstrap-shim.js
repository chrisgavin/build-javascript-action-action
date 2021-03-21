"use strict";

const childProcess = require("child_process");
const fs = require("fs");

const target = "./build/index.js";
try {
	if (!fs.existsSync(target)) {
		console.warn("This is a development build! For greater reliability and faster startup time, please use a tagged release.");
		childProcess.execFileSync("npm", ["run", "bootstrap"], {stdio: "inherit"});
	}
	childProcess.execFileSync(process.execPath, [target], {stdio: "inherit"});
}
catch (error) {
	if (error.status === undefined) {
		throw error;
	}
	process.exitCode = error.status;
}
