#!/usr/bin/env node
import { execSync } from "child_process";
import { input } from "@inquirer/prompts";

const gitCheckouts = () => {
  try {
    // Run git reflog to get the list of checkouts
    const output = execSync(
      'git reflog | grep "checkout" | awk \'!seen[$NF]++ {print $1, $2, $3, "\x1b[1;34m" $NF "\x1b[0m"}\'',
      { encoding: "utf8" }
    );

    // Split the output into an array by line
    const checkouts = output
      .split("\n")
      .filter((line) => line.trim().length > 0);

    // Function to display a chunk of the checkouts array
    const displayCheckouts = (startIndex, chunkSize) => {
      console.clear(); // Clear the console for refreshing
      console.log(
        checkouts.slice(startIndex, startIndex + chunkSize).join("\n")
      );
    };

    // Show the first 10 entries
    let currentIndex = 0;
    const chunkSize = 10;
    displayCheckouts(currentIndex, chunkSize);

    // Use inquirer to prompt for "Press a key to show more"
    const askToShowMore = async () => {
      if (currentIndex + chunkSize < checkouts.length) {
        const response = await input({
          type: "input",
          name: "showMore",
          message: "Press any key to show more (or q to quit)...",
        });

        if (response.showMore.toLowerCase() === "q") {
          console.log("Exiting...");
          return; // Exit the function
        }

        currentIndex += chunkSize;
        displayCheckouts(currentIndex, chunkSize);
        askToShowMore(); // Recurse to show more entries
      } else {
        console.log("No more entries to show.");
      }
    };

    // Start interactive prompt
    askToShowMore();
  } catch (error) {
    console.error("Error getting Git checkouts:", error.message);
  }
};

export default function gitHistory() {
  gitCheckouts();
}
