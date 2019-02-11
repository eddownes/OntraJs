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

// Start a mock session with mock data
describe('Testing the transformer with mock data', () => {
	beforeAll(() => {
		// TBD
	});

	// Done with the test suit
	afterAll(() => {
		console.log('this test session is done');
	});

	// THE THINGS TO DO IN BETWEEN TESTS
	beforeEach(() => {
		// TBD
	});

	afterEach(() => {
		//TBD
	});

	// THE TESTS GO HERE
	describe('Should describe the object', () => {
		it(`toGraphQLStruct the input object should return a matching output object object`, async () => {
			const input = await createInput();
			const output = createOutput();
			await expect(toGraphQLStruct({ ...input })[0]).toMatchObject(output);
		});
	});

	describe('Should describe the id', () => {
		it(`id Should return of type Int!`, async () => {
			const input = await createInput();
			const output = createOutput();
			const id = await toGraphQLStruct({ ...input })[0].defs.find((obj) => obj.name === 'id');
			await expect(id.type).toMatchObject('Int!');
		});
	});

	describe('Should describe the firstname', () => {
		it(`firstname Should return of type String!`, async () => {
			const input = await createInput();
			const output = createOutput();
			const firstname = await toGraphQLStruct({ ...input })[0].defs.find((obj) => obj.name === 'first_name');
			await expect(firstname.type).toMatchObject('String!');
		});
	});

	describe('Should describe the lastname', () => {
		it(`lastname Should return of type String!`, async () => {
			const input = await createInput();
			const output = createOutput();
			const lastname = await toGraphQLStruct({ ...input })[0].defs.find((obj) => obj.name === 'last_name');
			await expect(lastname.type).toMatchObject('String!');
		});
	});
});

//Tests not using the mock data
describe('toGraphQLStruct Test Suit', () => {
	it('toGraphQLStruct should be a function', () => {
		expect(toGraphQLStruct).toBeInstanceOf(Function);
	});
});
