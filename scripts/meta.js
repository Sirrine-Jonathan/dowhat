const current = process.cwd();
const path = require('path');
const package = require(path.join(current, 'package.json'));
const metaProps = [
	'name',
	'author',
	'description',
	'keywords',
	'homepage',
	'repository',
	'license',
	'bugs',
	'maintainers',
	'version',
]
console.log(`Meta data:
${metaProps.filter(prop => package[prop]).map(prop => `"${prop}": "${package[prop]}"`).join(',\n')}`);