const expect = require('expect');
const { toGraphQLStruct } = require('../transformer');

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
        id: {
          alias: 'Contact ID',
          type: 'numeric',
          required: '0',
          unique: '0',
          editable: '0',
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
    { name: 'first_name', type: 'String!' },
    { name: 'last_name', type: 'String!' },
    { name: 'email', type: 'String!' },
    { name: 'id', type: 'Int!' },
  ],
};

describe('toGraphQLStruct Test Suit', () => {
  const input = Object.assign({}, file_data); // make a clean copy
  const output = { ...contact }; // make a clean copy

  it('toGraphQLStruct should be a function', () => {
    expect(toGraphQLStruct).toBeInstanceOf(Function);
  });

  // it('toGraphQLStruct should return an object', () => {
  //   expect(toGraphQLStruct({ ...input })).toBeInstanceOf(Object);
  // });

  it(`In toGraphQLStruct, ${input} should return ${output}`, () => {
    expect(toGraphQLStruct({ ...input })[0]).toMatchObject(output);
  });
});
