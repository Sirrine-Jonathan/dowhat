#! /usr/bin/env node
const figlet = require('figlet');
const text = process.argv[2];
if (!text) {
	throw new Error("Please provide text to print");
}
const font = process.argv[3] || 'small';
figlet(process.argv[2], {
	font
}, function (err, data) {
	if (err) {
		if (err.code === 'ENOENT') {
			console.log(`Font "${font}" not found`);
		}
		return;
	}
	console.log(data);
})