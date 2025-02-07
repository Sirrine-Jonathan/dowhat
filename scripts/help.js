import chalk from "chalk";

console.log(chalk.green.bold("Available commands:"));
console.log();

const obj = {
  readme: "print out readme",
  scripts: "print out available npm scripts",
  meta: "print out package meta data",
  "git-history": "print out git history",
  help: "print this help message",
};

Object.entries(obj).forEach(([key, value]) => {
  console.log(`${chalk.cyan(key)}: ${value}`);
});
