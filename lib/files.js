const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const CLI = require('clui')
const Spinner = CLI.Spinner;

module.exports = {
  getCurrentDirectoryBase : () => {
    return path.basename(process.cwd());
  },

  directoryExists : (filePath) => {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false;
    }
  },
  createTypeFile : (path, name, contents) =>{
    console.log(chalk.green(`Creating new file at ${path}`));
    const status = new Spinner(`Creating ${name}...`);
    status.start();

    let stream = fs.createWriteStream(`${path}/${name.trim()}.graphql`);
    stream.once('open', function(fd) {
      contents.map(content => {
        let contentSpinner = new Spinner(`Creating type ${content.typeName}`)
        contentSpinner.start();
        stream.write(`type ${content.typeName} {\n`);
        content.defs.map(typeDef => {
          stream.write(`\t${typeDef.name} : ${typeDef.type}\n`);
        })
        stream.write('}\n\n')    
        contentSpinner.stop();
      })
      stream.end();
    });
    status.stop();
  },
  createPackageFile : (path, appname) => {

  }
};

