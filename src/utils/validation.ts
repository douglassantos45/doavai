export const fieldValidation = data => {
  const fields: string[] = [];

  const inputs = {
    name: data.name,
    phone: data.phone,
    zip: data.zip,
    number: data.number,
    city: data.city,
    state: data.state,
    streetAddress: data.streetAddress,
    neighborhood: data.neighborhood,
  };

  Object.keys(inputs).forEach(value => {
    const input = String(inputs[value]).trim();
    if (input === '') {
      fields.push(value);
    }
  });

  return fields;
};

const type = {
  PHONE: 'Telefone inválido. ',
  EMAIL: 'E-mail inválido. ',
  HEIGHBORHOOD: 'O bairro deve ter no mínimo 1 caracter. ',
  STREETADDRESS: 'O nome da rua está invalido. ',
  COMPLEMENT: 'O complemento deve ter no mínimo 2 caracteres. ',
  NUMBER: 'O número deve ser maior que 0',
};

export function messageError(requiredFields) {
  const message = requiredFields?.map(field => {
    return type[field.toUpperCase()];
  });

  return message;
}
