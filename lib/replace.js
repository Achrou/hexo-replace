'use strict';
var fs = require('hexo-fs');
var log = require('hexo-log')({
	debug: false,
	silent: false
});
var options, searchFilesCount = 0, replaceCount = 0;

function load(args) {
	console.log(args);
	var hexo = this;
	var strs = args['_'];
	if (!strs || strs.length < 2) {
		log.error("缺少替换参数,示例: hexo replace 被替换值 替换值 [-g]|[-r]");
		return;
	}
	var sourceStr = strs[0];
	var replaceStr = strs[1];
	this.options = {
		sourceStr: strs[0],
		replaceStr: strs[1]
	}
	log.info(sourceStr + ":" + replaceStr);
	var gloabl = args['g'] || args['global'];
	var rule = args['r'] || args['rule'];
	var rules = ['posts/:id'];
	if (!gloabl && rule) {
		rules = typeof (rule) === "string" ? [rule] : rule;
	}
	hexo.load();
	rules.forEach(function (rule) {
		hexo.extend.processor.register(rule, replace);
	});

	// hexo.extend.filter.register('after_init', function () {
	// 	log.info("Number of search files:" + searchFilesCount + ",Number of replacement strings:" + replaceCount);
	// });
}

function cmd() {
	// TODO
}

function backup() {
	// TODO
}

function replace(file) {
	searchFilesCount++;
	var sourceStr = this.options.sourceStr;
	var replaceStr = this.options.replaceStr;
	var reg = new RegExp(sourceStr, "i");
	file.read().then(content => {
		var result = content.match(reg);
		if (result) {
			log.info(file.source);
			var count = result.length;
			replaceCount += count;
			log.info("count:" + count);
			content = content.replace(sourceStr, replaceStr);
			fs.writeFileSync(file.source, content, 'utf-8');
		}
		return content;
	});
};

module.exports = load;