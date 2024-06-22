export async function trataFields(fields: any) {
	if (fields) {
	  const fieldNames = fields.split(',');
	  const fieldObject: any = {};

	  for (let i = 0; i < fieldNames.length; i++) {
		const fieldName = fieldNames[i];
		fieldObject[`${fieldName}`] = true;
	  }
	  return fieldObject;
	}
	return undefined;
  }