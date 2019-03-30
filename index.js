const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const files = require('./lib/files');

clear();
console.log(
  chalk.yellow(
    figlet.textSync('cli-v1b.es v.1.0', { horizontalLayout: 'full' })
  )
);