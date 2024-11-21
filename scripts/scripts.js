const current = process.cwd();
const path = require('path');
const package = require(path.join(current, 'package.json'));
console.log(`Available npm scripts:
${Object.entries(package.scripts).map(([key, value]) => `"${key}": "${value}"`).join(',\n')}`);


