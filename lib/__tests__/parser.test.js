const expect = require('expect');
const parser = require('../parser');

const file_data = {
  code: 0,
  data: {
    '0': {
      name: 'Contact',
      fields: {
        firstname: {
          alias: 'First Name',
          type: 'text',
          required: '0',
          unique: '0',
          editable: '1',
          deletable: '0',
        },
        lastname: {
          alias: 'Last Name',
          type: 'text',
          required: '0',
          unique: '0',
          editable: '1',
          deletable: '0',
        },
        email: {
          alias: 'Email',
          type: 'email',
          required: '0',
          unique: '1',
          editable: '1',
          deletable: '0',
        },
      },
    },
  },
  account_id: 168657,
};

const contact = {
  typeName: 'Contact',
  defs: [
    { name: 'id', type: 'String!' },
    { name: 'first_name', type: 'String!' },
    { name: 'last_name', type: 'String!' },
    { name: 'email', type: 'String!' },
  ],
};

describe('The parser function test suit', () => {
  test('parser to be a function', () => {
    expect(parser(file_data)[0]).toMatchObject(contact);
  });
});
