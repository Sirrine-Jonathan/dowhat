#! /usr/bin/env node

const package = require('../package.json');
console.log(`Available npm scripts:
${Object.keys(package.bin).join('\n')}`)


