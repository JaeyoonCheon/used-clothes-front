const { faker } = require("@faker-js/faker");

const generate = (count) => {
  const obj = [];

  for (let i = 0; i < count; i++) {
    obj.push({
      id: faker.datatype.number(10000),
      itemimage: faker.image.abstract(180, 180, true),
      itemname: faker.commerce.product(),
      itemprice: faker.commerce.price(),
    });
  }

  return obj;
};
