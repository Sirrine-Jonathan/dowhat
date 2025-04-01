import chalk from 'chalk';
import path from 'path';
import fs from 'fs';

export default function meta() {
	const current = process.cwd();
	const pkg = JSON.parse(fs.readFileSync(path.join(current, 'package.json')));
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

	console.log(chalk.green.bold('Package meta data:\n'));
	metaProps.filter(prop => pkg[prop]).forEach(prop => {
		console.log(`${chalk.cyan(prop)}: ${pkg[prop]}`);
	});
}