const fs = require('fs');
const path = require('path');
const lexer = require('marked').lexer;
const chalk = require('chalk');
const current = process.cwd();
const printReadme = async () => {
	const readmePath = path.join(current, 'README.md');
	const readmeMdxPath = path.join(current, 'README.mdx');
	const mdExists = fs.existsSync(readmePath);
	const mdxExists = fs.existsSync(readmeMdxPath);
	if (!mdExists && !mdxExists) {
		console.log(chalk.red('No README.md or README.mdx found'));
		return;
	}
	let fileToRead = readmePath;
	if (!mdExists) {
		fileToRead = readmeMdxPath;
	}
	const readme = fs.readFileSync(fileToRead);
	const text = readme.toString();
	const lex = lexer(text);
	lex.forEach(token => {
		switch(token.type) {
			case 'heading':
				console.log(chalk.green.bold(token.text));
				console.log();
				break;
			case 'text':
				console.log(token.text);
				break;
			case 'list':
				console.log(token.raw);
				break;
			case 'code':
				console.log(chalk.cyan(token.text));
			case 'space':
				console.log();
				break;
			default:
				console.log(token.raw);
				break;
		}
	})
}
printReadme();