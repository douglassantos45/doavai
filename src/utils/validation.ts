export const fieldValidation = data => {
  const fields: string[] = [];

  Object.keys(data).forEach(value => {
    const input = data[value];
    if (input.trim() === '') {
      fields.push(value);
    }
  });

  return fields;
};
