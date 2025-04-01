import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import { markedTerminal } from 'marked-terminal';
import chalk from 'chalk';

export default function readme(){
	const current = process.cwd();
	marked.use(markedTerminal());

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

		console.log(marked.parse(text));
	}
	printReadme();
}