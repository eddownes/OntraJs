const expect = require('expect');
const { translateTypeKeys, translateFromType } = require('../translators');

const OntraportMockService = require('../mocks/ontraportApiMock');

// Start a mock session with mock data
describe('Testing the Translator with mock data', () => {
  beforeAll(() => {
    // instantiate a mock session
    const os = new OntraportMockService();
    const testObj = os.getOntraportObjects();
  });

  // Done with the test suit
  afterAll(() => {
    console.log('this test session is done');
  });

  // THE THINGS TO DO IN BETWEEN TESTS
  beforeEach(() => {
    console.log('Before a test');
  });

  afterEach(() => {
    console.log('After a test');
  });

  // THE TESTS GO HERE
});

// Tests not using the mock data
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
