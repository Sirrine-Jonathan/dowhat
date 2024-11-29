import path from 'path';
import fs from 'fs';
import chalk from 'chalk';

const current = process.cwd();
const pkg = JSON.parse(fs.readFileSync(path.join(current, 'package.json')));
console.log(chalk.green.bold('NPM scripts:\n'));
Object.entries(pkg.scripts).forEach(([key, value]) => {
	if (!key) return;
	if (!value) return;
	console.log(`${chalk.cyan(key)}: ${value}`);
});