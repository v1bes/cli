const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const files = require('./lib/files');

clear();
console.log(
  chalk.green(
    figlet.textSync('cli-v1b.es v.1.0', { horizontalLayout: 'full' })
  )
);
var inquirer = require('inquirer');
inquirer
  .prompt([
    /* Pass your questions in here */
  ])
  .then(answers => {
    // Use user feedback for... whatever!!
  });