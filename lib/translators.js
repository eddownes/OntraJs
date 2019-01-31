// let allObjects = require('./services/translators/keys');


/*

example objectTranslator Key

{
    "f167" : "name",
    "f226" : "email",
}

*/

const testObj = {
    "f167" : "name",
    "f226" : "email"
}


module.exports = {

    translateTypeKeys : (key) => {
        if(testObj.hasOwnProperty(key)){
          return testObj[key];
        }
        return new Error('No translation for key exists');
      },
    translateFromType : (key) => {
        let objKeys = Object.keys(testObj);
        return objKeys.find(keyname => {
          return testObj[keyname] == key;
        })
      }

}