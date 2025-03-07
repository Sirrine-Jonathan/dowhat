#! /usr/bin/env node

import figlet from "figlet";
import { input } from "@inquirer/prompts";
import chalk from "chalk";

const promptNextScript = async () => {
  console.log("...");
  const script = await input({ message: "Which would you like to run?\n>>" });
  runScript(script);
};

const runScript = async (script) => {
  switch (script) {
    case "readme":
      await import("../utils/readme.js");
      break;
    case "scripts":
      await import("../utils/scripts.js");
      break;
    case "help":
      await import("../utils/help.js");
      break;
    case "meta":
      await import("../utils/meta.js");
      break;
    case "git-history":
      await import("../utils/git-history.js");
      break;
    default:
      main(async () => {
        await import("../utils/help.js");
        promptNextScript();
      });
      break;
  }
};

runScript(process.argv[2]);

export function main(callback) {
  figlet("Do What?", function (err, data) {
    if (err) {
      return;
    }
    console.log(data);
    console.log(chalk.green.bold("CLI for your NPM package"));
    console.log();
    callback();
  });
}
