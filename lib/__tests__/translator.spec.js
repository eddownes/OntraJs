const expect = require('expect');
const { translateTypeKeys, translateFromType } = require('../translators');
describe('translateTypeKeys Test Suit', () => {
  it('translateTypeKeys should be a function', () => {
    expect(translateTypeKeys).toBeInstanceOf(Function);
  });
});

describe('translateFromType Test Suit', () => {
  it('translateTypeKeys should be a function', () => {
    expect(translateFromType).toBeInstanceOf(Function);
  });
});
