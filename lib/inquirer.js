
const inquirer   = require('inquirer');
const files      = require('./files');

module.exports = {

    askOntraportCredentials: () => {
      console.log('inside ontraport credentials');
      const questions = [
        {
          name: 'appname',
          type: 'input',
          message: 'Enter the name of the app you want to create:',
          validate: function( value ) {
            if (value.length) {
              return true;
            } else {
              return 'Please the name of the folder that will serve as your root directory.';
            }
          }
        },
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
    return inquirer.prompt(questions);
  },
}