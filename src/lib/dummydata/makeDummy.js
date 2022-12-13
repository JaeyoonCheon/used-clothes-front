const { faker } = require("@faker-js/faker");
const fs = require("fs");

const generate = (count) => {
  const obj = [];

  for (let i = 0; i < count; i++) {
    obj.push({
      clothe_id: faker.datatype.number(10000),
      itemimage: [faker.image.abstract(180, 180, true)],
      user_email: faker.internet.email(),
      name: faker.commerce.product(),
      main_category_id: faker.datatype.number(8),
      sub_category_id: faker.datatype.number(1),
      price: faker.datatype.number({ min: 5000, max: 1000000 }),
      condition_code: [1],
      shipping_fee: faker.datatype.number({ min: 0, max: 5000 }),
      upload_date: faker.datatype.datetime(),
      upload_time: faker.datatype.datetime(),
      brand_id: faker.datatype.number(30),
      purchase_place_id: faker.datatype.number(30),
      ex_price: null,
      color_code: [faker.datatype.number(10)],
      purchase_date: faker.datatype.datetime(),
      material_code: [faker.datatype.number(5)],
      description: faker.lorem.paragraphs(3),
    });
  }

  return obj;
};

fs.writeFileSync(
  "src/lib/dummydata/dummyProductList.json",
  JSON.stringify(generate(100)),
  (err) => {
    if (err) {
      console.log(err);
      return;
    }
  }
);
