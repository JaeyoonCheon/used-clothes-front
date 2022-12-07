export const categoryData = [
  {
    id: 1,
    name: "상의",
    child: [
      {
        id: 1,
        name: "티셔츠",
        child: [],
      },
      { id: 2, name: "셔츠/블라우스", child: [] },
      { id: 3, name: "맨투맨", child: [] },
      { id: 4, name: "후드티", child: [] },
      { id: 5, name: "니트/스웨터", child: [] },
    ],
  },
  {
    id: 2,
    name: "아우터",
    child: [
      {
        id: 1,
        name: "코트",
        child: [],
      },
    ],
  },
  {
    id: 3,
    name: "바지",
    child: [],
  },
  {
    id: 4,
    name: "원피스",
    child: [],
  },
  {
    id: 5,
    name: "스커트",
    child: [],
  },
  {
    id: 6,
    name: "가방",
    child: [],
  },
  {
    id: 7,
    name: "스니커즈",
    child: [],
  },
  {
    id: 8,
    name: "신발",
    child: [],
  },
  {
    id: 9,
    name: "시계",
    child: [],
  },
  {
    id: 10,
    name: "모자",
    child: [],
  },
  {
    id: 11,
    name: "스포츠",
    child: [],
  },
  {
    id: 12,
    name: "양말/레그웨어",
    child: [],
  },
  {
    id: 13,
    name: "안경",
    child: [],
  },
  {
    id: 14,
    name: "악세서리",
    child: [],
  },
];

export const mainCategoryData = [
  {
    main_category_id: 1,
    main_category_name: "상의",
  },
  {
    main_category_id: 2,
    main_category_name: "아우터",
  },
  {
    main_category_id: 3,
    main_category_name: "바지",
  },
  {
    main_category_id: 4,
    main_category_name: "원피스",
  },
  {
    main_category_id: 5,
    main_category_name: "스커트",
  },
  {
    main_category_id: 6,
    main_category_name: "가방",
  },
  {
    main_category_id: 7,
    main_category_name: "스니커즈",
  },
  {
    main_category_id: 8,
    main_category_name: "신발",
  },
  {
    main_category_id: 9,
    main_category_name: "시계",
  },
  {
    main_category_id: 10,
    main_category_name: "모자",
  },
  {
    main_category_id: 11,
    main_category_name: "스포츠",
  },
  {
    main_category_id: 12,
    main_category_name: "양말/레그웨어",
  },
  {
    main_category_id: 13,
    main_category_name: "안경",
  },
  {
    main_category_id: 14,
    main_category_name: "악세서리",
  },
];

export const subCategoryData = [
  {
    main_category_id: 1,
    sub_category_id: 1,
    sub_category_name: "티셔츠",
  },
  {
    main_category_id: 1,
    sub_category_id: 2,
    sub_category_name: "셔츠/블라우스",
  },
  {
    main_category_id: 1,
    sub_category_id: 3,
    sub_category_name: "맨투맨",
  },
  {
    main_category_id: 1,
    sub_category_id: 4,
    sub_category_name: "후드티",
  },
  {
    main_category_id: 1,
    sub_category_id: 5,
    sub_category_name: "니트/스웨터",
  },
];

export const filterDatas = [
  {
    typeCode: "color_code",
    name: "색상",
    types: ["화이트", "블랙", "그레이", "브라운", "레드", "블루", "실버"],
  },
  {
    typeCode: "material_code",
    name: "소재",
    types: ["면", "데님", "가죽", "실크", "폴리에스테르", "레이온", "기모"],
  },
  {
    typeCode: "condition_code",
    name: "오염도",
    types: ["미사용", "매우양호", "사용감 있음", "사용감 많음"],
  },
  {
    typeCode: "size",
    name: "사이즈",
    types: ["S", "M", "L", "XL", "XXS", "XS", "XXL"],
  },
  {
    typeCode: "brand_id",
    name: "브랜드",
    types: ["brand_1", "brand_2", "brand_4", "brand_5", "brand_6"],
  },
];

export const metaDatas = {
  colors: [
    { code: 1, name: "화이트" },
    { code: 2, name: "블랙" },
    { code: 3, name: "그레이" },
    { code: 4, name: "브라운" },
    { code: 5, name: "레드" },
    { code: 6, name: "블루" },
    { code: 7, name: "실버" },
  ],
  materials: [
    { code: 1, name: "면" },
    { code: 2, name: "데님" },
    { code: 3, name: "가죽" },
    { code: 4, name: "실크" },
    { code: 5, name: "폴리" },
  ],
  conditions: [
    { code: 1, name: "미사용" },
    { code: 2, name: "매우 양호" },
    { code: 3, name: "사용감 있음" },
    { code: 4, name: "사용감 많음" },
  ],
};

export const itemDetailInfos = {
  id: 4606,
  itemimage: "https://loremflickr.com/580/580/abstract?21730",
  itemname: "Gloves",
  itemprice: "311.00",
  category: {
    large: 1,
    medium: 1,
    small: 1,
  },
  options: {
    colors: ["화이트", "블루"],
    brand: "브랜드1",
    textiles: ["면", "실크"],
    pollution: "미사용",
    size: "M",
  },
  seller: {
    id: 50,
    name: "홍길동",
    sellingItems: 10,
    currentLocation: "대구 북구",
  },
  descriptions:
    "Hic eius ipsum placeat voluptas vel corrupti. Optio rem corporis a qui animi dolore. Est alias beatae facilis veniam. Et dolore dolor ipsum asperiores sed et et nihil eveniet. Ipsa corrupti vel rerum. Rerum ipsa modi consequatur et. Ut maxime ipsum facilis itaque eveniet et. Ut molestiae veniam ipsam nobis sed ipsum dignissimos sed. Officia soluta dolores eligendi rerum exercitationem cupiditate eum quo. Illo ipsa iste autem accusamus ut eum repudiandae. Voluptatem laborum aut culpa labore. Rem ut voluptates qui ullam ducimus error excepturi facere odit. Rerum animi nihil ea ex nisi amet nihil quasi optio. Velit beatae eos. Aut exercitationem delectus saepe.",
};

export const itemDetailDatas = [
  {
    id: 4606,
    itemimage: ["https://loremflickr.com/580/580/abstract?21730"],
    name: "Gloves",
    price: "311.00",
    main_category_id: 1,
    sub_category_id: 1,
    color_code: [1, 4],
    brand_id: ["브랜드1"],
    material_code: [1, 2],
    condition_code: ["미사용"],

    shipping_fee: null,
    upload_date: null,
    upload_time: null,
    purchase_place_id: null,
    ex_price: null,
    purchase_date: null,

    descriptions:
      "Hic eius ipsum placeat voluptas vel corrupti. Optio rem corporis a qui animi dolore. Est alias beatae facilis veniam. Et dolore dolor ipsum asperiores sed et et nihil eveniet. Ipsa corrupti vel rerum. Rerum ipsa modi consequatur et. Ut maxime ipsum facilis itaque eveniet et. Ut molestiae veniam ipsam nobis sed ipsum dignissimos sed. Officia soluta dolores eligendi rerum exercitationem cupiditate eum quo. Illo ipsa iste autem accusamus ut eum repudiandae. Voluptatem laborum aut culpa labore. Rem ut voluptates qui ullam ducimus error excepturi facere odit. Rerum animi nihil ea ex nisi amet nihil quasi optio. Velit beatae eos. Aut exercitationem delectus saepe.",
  },
];

export const itemDatas = [
  {
    id: 4606,
    itemimage: "https://loremflickr.com/180/180/abstract?21730",
    itemname: "Gloves",
    itemprice: "311.00",
  },
  {
    id: 7820,
    itemimage: "https://loremflickr.com/180/180/abstract?45230",
    itemname: "ShoesShoesShoesShoes ShoesShoesShoesShoesShoes",
    itemprice: "997.00",
  },
  {
    id: 7985,
    itemimage: "https://loremflickr.com/180/180/abstract?86224",
    itemname: "Chair",
    itemprice: "936.00",
  },
  {
    id: 7859,
    itemimage: "https://loremflickr.com/180/180/abstract?8846",
    itemname: "Bike",
    itemprice: "477.00",
  },
  {
    id: 4220,
    itemimage: "https://loremflickr.com/180/180/abstract?52460",
    itemname: "Cheese",
    itemprice: "387.00",
  },
  {
    id: 4330,
    itemimage: "https://loremflickr.com/180/180/abstract?17910",
    itemname: "Chair",
    itemprice: "767.00",
  },
  {
    id: 5704,
    itemimage: "https://loremflickr.com/180/180/abstract?20624",
    itemname: "Cheese",
    itemprice: "65.00",
  },
  {
    id: 4172,
    itemimage: "https://loremflickr.com/180/180/abstract?30152",
    itemname: "Keyboard",
    itemprice: "926.00",
  },
  {
    id: 9097,
    itemimage: "https://loremflickr.com/180/180/abstract?10498",
    itemname: "Pants",
    itemprice: "749.00",
  },
  {
    id: 813,
    itemimage: "https://loremflickr.com/180/180/abstract?49030",
    itemname: "Chicken",
    itemprice: "611.00",
  },
  {
    id: 1977,
    itemimage: "https://loremflickr.com/180/180/abstract?99457",
    itemname: "Shoes",
    itemprice: "471.00",
  },
  {
    id: 4276,
    itemimage: "https://loremflickr.com/180/180/abstract?93010",
    itemname: "Fish",
    itemprice: "897.00",
  },
  {
    id: 8879,
    itemimage: "https://loremflickr.com/180/180/abstract?4436",
    itemname: "Car",
    itemprice: "616.00",
  },
  {
    id: 3088,
    itemimage: "https://loremflickr.com/180/180/abstract?31194",
    itemname: "Computer",
    itemprice: "235.00",
  },
  {
    id: 2509,
    itemimage: "https://loremflickr.com/180/180/abstract?9464",
    itemname: "Chicken",
    itemprice: "443.00",
  },
  {
    id: 5210,
    itemimage: "https://loremflickr.com/180/180/abstract?25498",
    itemname: "Bacon",
    itemprice: "701.00",
  },
  {
    id: 9291,
    itemimage: "https://loremflickr.com/180/180/abstract?38218",
    itemname: "Shirt",
    itemprice: "892.00",
  },
  {
    id: 7104,
    itemimage: "https://loremflickr.com/180/180/abstract?46770",
    itemname: "Gloves",
    itemprice: "205.00",
  },
  {
    id: 4155,
    itemimage: "https://loremflickr.com/180/180/abstract?5815",
    itemname: "Shirt",
    itemprice: "370.00",
  },
  {
    id: 952,
    itemimage: "https://loremflickr.com/180/180/abstract?67430",
    itemname: "Bike",
    itemprice: "355.00",
  },
  {
    id: 8540,
    itemimage: "https://loremflickr.com/180/180/abstract?46754",
    itemname: "Chicken",
    itemprice: "849.00",
  },
  {
    id: 890,
    itemimage: "https://loremflickr.com/180/180/abstract?1012",
    itemname: "Pizza",
    itemprice: "165.00",
  },
  {
    id: 3505,
    itemimage: "https://loremflickr.com/180/180/abstract?47343",
    itemname: "Fish",
    itemprice: "590.00",
  },
  {
    id: 1079,
    itemimage: "https://loremflickr.com/180/180/abstract?93629",
    itemname: "Shoes",
    itemprice: "803.00",
  },
  {
    id: 9561,
    itemimage: "https://loremflickr.com/180/180/abstract?14664",
    itemname: "Ball",
    itemprice: "825.00",
  },
  {
    id: 1872,
    itemimage: "https://loremflickr.com/180/180/abstract?63927",
    itemname: "Chips",
    itemprice: "87.00",
  },
  {
    id: 2795,
    itemimage: "https://loremflickr.com/180/180/abstract?66188",
    itemname: "Bacon",
    itemprice: "275.00",
  },
  {
    id: 2868,
    itemimage: "https://loremflickr.com/180/180/abstract?72912",
    itemname: "Keyboard",
    itemprice: "610.00",
  },
  {
    id: 292,
    itemimage: "https://loremflickr.com/180/180/abstract?91844",
    itemname: "Keyboard",
    itemprice: "815.00",
  },
  {
    id: 5042,
    itemimage: "https://loremflickr.com/180/180/abstract?62660",
    itemname: "Fish",
    itemprice: "256.00",
  },
];
