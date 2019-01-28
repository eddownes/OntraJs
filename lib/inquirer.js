const inquirer   = require('inquirer');
const files      = require('./files');

module.exports = {

    askOntraportCredentials: () => {
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
    return inquirer.prompt(questions);
  },
}