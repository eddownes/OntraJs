const files = require('./lib/files');
const inquirer  = require('./lib/inquirer');
const figlet = require('figlet');
const clear = require('clear');
const chalk = require('chalk');
const fs = require('fs');
const CLI         = require('clui')
const Spinner     = CLI.Spinner;

clear();
console.log(
  chalk.yellow(
    figlet.textSync('Ontra-Js', { horizontalLayout: 'full' })
  )
);

if (files.directoryExists('./server')) {
  console.log(chalk.red('Server has already been created, run update instead!'));
  process.exit();
}

const run = async () => {
  const credentials = await inquirer.askGithubCredentials();

  let str = [`API_KEY = "${credentials.api_key}"`, `APP_ID = "${credentials.app_id}"`].join('\n')
  const status = new Spinner('Creating Env File...');
  status.start();
  fs.writeFile('.env', str, res => {
    status.stop();
    console.log(chalk.green('Successfully saved Ontraport Credentials to Env file!'));
  })
  
}

run();