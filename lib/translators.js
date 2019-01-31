// let allObjects = require('./services/translators/keys');

/*

example objectTranslator Key

{
    "10001": {
      "f167" : "name",
      "f226" : "email"
    }
}

*/

const testObj = {
  '10001': {
    f167: 'name',
    f226: 'email',
  },
};

module.exports = {
  translateTypeKeys: (objectId, key) => {
    if (testObj[objectId].hasOwnProperty(key)) {
      return testObj[objectId][key];
    }
    return new Error('No translation for key exists');
  },
  translateFromType: (objectId, key) => {
    let objKeys = Object.keys(testObj[objectId]);
    return objKeys.find(keyname => {
      return testObj[objectId][keyname] == key;
    });
  },
};
