"use strict";

const fs = require("hexo-fs");
const log = require("hexo-log")({
	debug: false,
	silent: false
});
var options,
	searchFilesCount = 0,
	replaceCount = 0;

function replaceConsole(args) {
	var hexo = this;
	var strs = args._;
	if (!strs || strs.length < 2) {
		return hexo.call("help", { _: ["replace"] });
	}
	options = {
		sourceStr: strs[0],
		replaceStr: strs[1]
	};
	var gloabl = args.g || args.global;
	var rule = args.r || args.rule;
	var rules = ["/"];
	if (!gloabl && rule) {
		rules = typeof rule === "string" ? [rule] : rule;
	}
	rules.forEach(function (rule) {
		hexo.extend.processor.register(rule, replace);
	});
	Promise.all([hexo.source.process(), hexo.theme.process()]).then(() => {
		log.info(
			"Number of search files: %s ,Number of replacement strings: %s",
			searchFilesCount,
			replaceCount
		);
	});
}

function cmd() {
	// TODO
}

function backup() {
	// TODO
}

function replace(file) {
	searchFilesCount++;
	var sourceStr = options.sourceStr;
	var replaceStr = options.replaceStr;
	var reg = new RegExp(sourceStr, "g");
	file.read().then(content => {
		var result = content.match(reg);
		if (result) {
			log.info(file.source);
			var count = result.length;
			replaceCount += count;
			log.info("Replace count: %s", count);
			content = content.replace(reg, replaceStr);
			fs.writeFileSync(file.source, content, "utf-8");
		}
		return content;
	});
}

module.exports = replaceConsole;
