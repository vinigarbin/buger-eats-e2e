const faker = require('faker');
const cpfUtils = require('gerador-validador-cpf');

export default {
  deliver: function () {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    return {
      name: `${firstName} ${lastName}`,
      cpf: cpfUtils.generate(),
      email: faker.internet.email(firstName),
      whatsapp: "95987650988",
      address: {
        postalCode: "85812-000",
        street: "Avenida Brasil",
        number: "0000",
        details: "Casa",
        district: "Centro",
        cityState: "Cascavel/PR",
      },
      deliveryMethod: "Moto",
      cnh: "cnh-digital.jpg",
    };
  },
};
