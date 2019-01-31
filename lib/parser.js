module.exports = file_data => {
  return Object.keys(file_data.data).map(id => {
    const fields = file_data.data[id].fields;

    const other_fields = Object.keys(fields).map(key => {
      const name = fields[key].alias
        .toLowerCase()
        .split(' ')
        .join('_');
      // TODO: Make other types but type will be Strings for now
      return { name, type: 'String!' };
    });
    const struct = {
      typeName: file_data.data[id].name,
      defs: [{ name: 'id', type: 'String!' }, ...other_fields], // destructure all the other fields here
    };
    return struct;
  });
};
