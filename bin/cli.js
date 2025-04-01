#! /usr/bin/env node

import figlet from "figlet";
import { input } from "@inquirer/prompts";
import chalk from "chalk";
import gitHistory from "../utils/git-history.js";
import help from "../utils/help.js";
import meta from "../utils/meta.js";
import readme from "../utils/readme.js";
import listScripts from "../utils/scripts.js";

const promptNextScript = async (msg) => {
  console.log("...");
  const script = await input({ message: msg });
  runScript(script);
};

const runScript = async (script) => {
  let promptAgain = true;
  let message = "";
  switch (script?.trim().toLowerCase()) {
    case "readme":
      readme();
      break;
    case "scripts":
      listScripts();
      break;
    case "help":
      promptAgain = false;
      help();
      promptNextScript("Which would you like to run?\n>>");
      break;
    case "meta":
      meta();
      break;
    case "git-history":
      gitHistory();
      break;
    case "exit":
      promptAgain = false;
      console.log(chalk.magenta.bold("Goodbye!"));
      break;
    default:
      promptAgain = false;
      if (script) {
        console.log(chalk.red.bold(`Unknown command: ${script}`));
        help();
        promptNextScript("Which would you like to run?\n>>");
      } else {
        main(() => {
          help();
          promptNextScript("Which would you like to run?\n>>");
        });
      }
      break;
  }
  if (promptAgain) {
    promptNextScript("\n>>");
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
