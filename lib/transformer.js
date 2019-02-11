const OntraportMockService = require('./mocks/ontraportApiMock');
const os = new OntraportMockService();

module.exports = {
	toGraphQLStruct: (file) => {
		// get the ids
		const ids = Object.keys(file.data);

		const records = ids.map(async (id) => {
			const fieldsHashTable = await os.getFieldsHashTable();
			const typesHashTable = await os.getTypesHashTable();
			// init a struct
			const struct = {
				typeName: file.data[id].name,
				defs: [],
			};

			// will go through the fields key and extract all its childres
			const fields = file.data[id].fields;

			// get the keys, on;y push into defs, the ones with type not null
			const fieldKeys = Object.keys(fields);

			fieldKeys.forEach((fieldKey) => {
				const field = fieldsHashTable[fieldKey];
				if (typesHashTable[field.type]) {
					// translate the type and modify it on the field
					field.type = typesHashTable[field.type];

					// push the field onto the struct into the def array
					struct.defs.push(field);
				}
			});
			return struct;
		});

		return records;
	},
};
