#!/usr/bin/env node
const files = require('./lib/files');
const inquirer  = require('./lib/inquirer');
const figlet = require('figlet');
const clear = require('clear');
const chalk = require('chalk');
const fs = require('fs');
const CLI = require('clui')
const Spinner = CLI.Spinner;
const path = require('path');
var exec = require('child_process').exec;


function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(stdout); });
};

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
  const questions = [
    {
      name: 'app_id',
      type: 'input',
      message: 'Enter your Ontraport APP ID:',
      validate: function( value ) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter your Ontraport APP ID.';
        }
      }
    },
    {
      name: 'api_key',
      type: 'password',
      message: 'Enter your Ontraport API Key:',
      validate: function(value) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter your Ontraport API Key';
        }
      }
    }
  ];
  let credentials = await inquirer.askOntraportCredentials(questions);
  let str = [`API_KEY = "${credentials.api_key}"`, `APP_ID = "${credentials.app_id}"`].join('\n')
  const status = new Spinner('Scaffolding files...');
  status.start();
  fs.writeFile('.env', str, res => {
    console.log(chalk.green('Successfully saved Ontraport Credentials to Env file!'));
  })
  
  if(!files.directoryExists('./services')){
    fs.mkdir('./services');
  }

  let createOs = execute('npm root -g', function(location){
    fs.createReadStream(`${location.replace("\\","/").replace("\n", "")}/ontrajs/lib/ontraport_service.txt`).pipe(fs.createWriteStream(`./services/ontraport_service.js`))
  })

  let stream = fs.createWriteStream('schema.graphql');
  stream.once('open', function(fd) {
    stream.write("type User {\n");
    stream.write("\tid : String!\n");
    stream.write('}')
    stream.end();
  });
  status.stop();
}

run()