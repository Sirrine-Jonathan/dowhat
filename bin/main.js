#! /usr/bin/env node

const figlet = require('figlet');

switch(process.argv[2]) {
	case 'readme':
		require('../scripts/readme');
		break;
	case 'scripts':
		require('../scripts/scripts');
		break;
	case 'help':
		require('../scripts/help');
		break;
	default:
		main(() => {
			require('../scripts/help');
		});
		break;
}

function main(callback) {
	figlet("Do What?", function (err, data) {
		if (err) {
			return;
		}
		console.log(data);
		console.log("CLI for your NPM package");
		callback();
	})
}