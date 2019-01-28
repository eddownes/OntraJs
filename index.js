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
  const credentials = await inquirer.askOntraportCredentials();

  let str = [`API_KEY = "${credentials.api_key}"`, `APP_ID = "${credentials.app_id}"`].join('\n')
  const status = new Spinner('Scaffolding files...');
  status.start();
  fs.writeFile('.env', str, res => {
    console.log(chalk.green('Successfully saved Ontraport Credentials to Env file!'));
  })
  
  if(!files.directoryExists('./services')){
    fs.mkdir('./services');
  }

  let createOs = fs.createReadStream('./lib/ontraport_service.txt').pipe(fs.createWriteStream(`./services/ontraport_service.js`))

  let stream = fs.createWriteStream('schema.graphql');
  stream.once('open', function(fd) {
    stream.write("type User {\n");
    stream.write("\t id : String!\n");
    stream.write('}')
    stream.end();
  });
  status.stop();
}

run()