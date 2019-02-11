const expect = require('expect');
const { toGraphQLStruct } = require('../transformer');
const OntraportMockService = require('../mocks/ontraportApiMock');
const os = new OntraportMockService();
const getData = os.getObjectFields(0);

const createInput = async () => {
	const mockData = await getData;

	// make a copy
	const fields = Object.assign({}, mockData.data[0].fields);

	// assign the name
	const name = mockData.data[0].name;

	return {
		code: 0,
		data: {
			'0': {
				name: name,
				fields: {
					firstname: fields.firstname,
					lastname: fields.lastname,
					email: fields.email,
					id: fields.id,
				},
			},
		},
		account_id: 168657,
	};
};

const createOutput = () => {
	return {
		typeName: 'Contact',
		defs: [
			{ name: 'first_name', type: 'String!' },
			{ name: 'last_name', type: 'String!' },
			{ name: 'email', type: 'String!' },
			{ name: 'id', type: 'Int!' },
		],
	};
};

describe('Should describe the object', () => {
	it(`toGraphQLStruct the input object should return a matching output object object`, async () => {
		const input = await createInput();
		const output = createOutput();
		const result = await toGraphQLStruct({ ...input })[0];
		return expect(result).toMatchObject(output);
	});
});

describe('Should describe the id', () => {
	it(`id Should return of type Int!`, async () => {
		const input = await createInput();
		const output = createOutput();
		const result = await toGraphQLStruct({ ...input })[0];
		const id = await result.defs.find((obj) => obj.name === 'id');
		return await expect(id.type).toBe('Int!');
	});
});

describe('Should describe the firstname', () => {
	it(`firstname Should return of type String!`, async () => {
		const input = await createInput();
		const output = createOutput();
		const result = await toGraphQLStruct({ ...input })[0];
		const firstname = await result.defs.find((obj) => obj.name === 'first_name');
		return await expect(firstname.type).toBe('String!');
	});
});

describe('Should describe the lastname', () => {
	it(`lastname Should return of type String!`, async () => {
		const input = await createInput();
		const output = createOutput();
		const result = await toGraphQLStruct({ ...input })[0];
		const lastname = await result.defs.find((obj) => obj.name === 'last_name');
		return await expect(lastname.type).toBe('String!');
	});
});

describe('toGraphQLStruct Test Suit', () => {
	it('toGraphQLStruct should be a function', () => {
		expect(toGraphQLStruct).toBeInstanceOf(Function);
	});
});
