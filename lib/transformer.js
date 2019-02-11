const fieldsHashTable = require('./fieldsHashTable.json');
const typesHashTable = require('./typesHashTable.json');

module.exports = {
	toGraphQLStruct: (file_data) => {
		const ids = Object.keys(file_data.data);

		// Will contain an array of records
		const records = ids.map((record) => {
			// initialize a struct which will contain the record
			const struct = {
				typeName: file_data.data[record].name,
				defs: [],
			};

			// will go to the fields key and extra all its children
			const fields = file_data.data[record].fields;

			// get the keys, only push into defs, the ones with type not null
			const fieldKeys = Object.keys(fields);

			fieldKeys.forEach((fieldKey) => {
				// pick from the hashTable
				const field = fieldsHashTable[fieldKey];
				if (typesHashTable[field.type] !== null) {
					// translate the type and modify it on the field
					field.type = typesHashTable[field.type];

					// push the field onto the struct into the def array
					struct.defs.push(field);
				}
			});

			return struct;
		});

		// If everything went well, the records will be returned
		return records;
	},
};
