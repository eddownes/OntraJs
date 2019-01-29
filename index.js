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
  let credentials = await inquirer.askOntraportCredentials();
  let str = [`API_KEY = "${credentials.api_key}"`, `APP_ID = "${credentials.app_id}"`].join('\n')
  
  if(!files.directoryExists(`${credentials.appname}`)){
    fs.mkdir(`./${credentials.appname}`);
  } else {
    console.log(chalk.red('App Directory Already Exists!'));
    process.exit();
  }
  
  let appRoot = `./${credentials.appname}`;

  fs.writeFile(`${appRoot}/.env`, str, res => {
    console.log(chalk.green('Successfully saved Ontraport Credentials to Env file!'));
  })
  
  if(!files.directoryExists('./services')){
    fs.mkdir(`${appRoot}/services`);
  }

  files.createPackageFile(`${location.replace("\\","/").replace("\n", "")}`,appRoot, `${credentials.appname}`)

  const status = new Spinner('Scaffolding files...');
  status.start();
  let createOs = execute('npm root -g', function(location){
    fs.createReadStream(`${location.replace("\\","/").replace("\n", "")}/ontrajs/lib/ontraport_service.txt`).pipe(fs.createWriteStream(`${appRoot}/services/ontraport_service.js`))
  })
  status.stop();
  
  // files.createTypeFile( `${appRoot}`, 'schema', contents);
}

run()