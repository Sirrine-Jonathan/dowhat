import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import os from 'os';
import config from '../config/scripts.json' assert { type: 'json' };
import expandTilde from 'expand-tilde'; // We will use this package to expand ~

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const manSource = path.join(__dirname, config.manPages.manSource);

// Function to get the appropriate man directory for the current OS
function getManDir() {
  const platform = os.platform();
  let manDir = '';

  switch (platform) {
    case 'win32':
      manDir = config.manPages.fallbackDirs.windows;
      break;
    case 'darwin':
      manDir = config.manPages.fallbackDirs.macos;
      break;
    case 'linux':
    default:
      manDir = config.manPages.fallbackDirs.linux;
      break;
  }

  // Expand the '~' in the path to the user's home directory
  return expandTilde(manDir);
}

// Function to install the man page
function installManPage() {
  const manDir = getManDir();
  const manTarget = path.join(manDir, 'dowhat.1');

  if (fs.existsSync(manSource)) {
    try {
      // Ensure the target directory exists
      execSync(`mkdir -p "${manDir}"`);

      // Copy the man page to the correct location
      execSync(`cp ${manSource} "${manTarget}"`);
      console.log('Man page installed successfully.');
    } catch (error) {
      console.error('Error installing man page:', error);
    }
  } else {
    console.error(`Man page source ${manSource} does not exist.`);
  }
}

installManPage();