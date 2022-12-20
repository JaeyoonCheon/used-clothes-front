import { rest } from "msw";

import {
  itemDatas,
  metaDatas,
  mainCategoryData,
  subCategoryData,
  itemDetailDatas,
  brandListDatas,
  locationScopeAData,
  locationScopeBData,
  locationScopeCData,
  purchasePlaceListDatas,
} from "../lib/dummydata/dummydata";
import { productList } from "../lib/dummydata/dummyProductList";

export const handlers = [
  rest.post("/user/login", (req, res, ctx) => {
    const email = req.body.email;
    return res(ctx.status(200), ctx.json(email));
  }),
  rest.post("/user/create", (req, res, ctx) => {
    const formData = req.json();

    if (formData) {
      return res(ctx.status(200));
    } else {
      return res(ctx.status(400));
    }
  }),
  rest.get("/user/logout", (req, res, ctx) => {
    const logOn = true;
    if (logOn) {
      return res(ctx.status(200));
    } else {
      return res(ctx.status(400));
    }
  }),
  rest.post(`/clothe/create`, (req, res, ctx) => {
    console.log(req);
    const image = req.file;

    if (image) {
      return res(ctx.json(image));
    } else {
      return res(ctx.status(400));
    }
  }),
  rest.get("/clothe/list", (req, res, ctx) => {
    const filters = req.url.searchParams.get("filters");
    const sort_by = req.url.searchParams.get("sort_by");
    const order = req.url.searchParams.get("order");
    const elements = Number(req.url.searchParams.get("elements"));
    const page = Number(req.url.searchParams.get("page")) - 1;

    console.log("handler page " + page);

    const newProductList = [...productList];
    const result = newProductList.slice(elements * page, elements * (page + 1));

    return res(ctx.json(result));
  }),
  rest.get(`/clothe/read/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const info = productList.find((data) => data.clothe_id === parseInt(id));

    if (info) {
      return res(ctx.json(info));
    } else {
      return res(ctx.status(400));
    }
  }),
  rest.put(`/clothe/update/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const payload = req.json();
    console.log(payload);

    if (payload) {
      return res(ctx.status(200));
    } else {
      return res(ctx.status(400));
    }
  }),
  rest.delete(`/clothe/delete/:id`, (req, res, ctx) => {
    const { id } = req.params;

    if (id) {
      return res(ctx.status(200));
    } else {
      return res(ctx.status(400));
    }
  }),
  rest.get(`/location/scope_a/list`, (req, res, ctx) => {
    if (locationScopeAData) {
      return res(ctx.json(locationScopeAData));
    } else {
      return res(ctx.status(400));
    }
  }),
  rest.get(`/location/scope_b/list`, (req, res, ctx) => {
    if (locationScopeBData) {
      return res(ctx.json(locationScopeBData));
    } else {
      return res(ctx.status(400));
    }
  }),
  rest.get(`/location/scope_c/list`, (req, res, ctx) => {
    if (locationScopeCData) {
      return res(ctx.json(locationScopeCData));
    } else {
      return res(ctx.status(400));
    }
  }),
  rest.get(`/brand/list`, (req, res, ctx) => {
    if (brandListDatas) {
      return res(ctx.json(brandListDatas));
    } else {
      return res(ctx.status(400));
    }
  }),
  rest.post(`/brand/create`, (req, res, ctx) => {
    const newBrand = req.json();
    const newItem = {
      brand_id: Math.floor(Math.random() * (1000 - 100 + 1)) + 100,
      name: newBrand.name,
    };

    if (newBrand) {
      return res(ctx.json(newItem));
    } else {
      return res(ctx.status(400));
    }
  }),
  rest.get(`/purchase_place/list`, (req, res, ctx) => {
    if (purchasePlaceListDatas) {
      return res(ctx.json(purchasePlaceListDatas));
    } else {
      return res(ctx.status(400));
    }
  }),
  rest.post(`/purchase_place/create`, (req, res, ctx) => {
    const newpurchase_place = req.json();
    const newItem = {
      purchase_place_id: Math.floor(Math.random() * (1000 - 100 + 1)) + 100,
      name: newpurchase_place.name,
    };

    if (newpurchase_place) {
      return res(ctx.json(newItem));
    } else {
      return res(ctx.status(400));
    }
  }),
  rest.get(`/clothe_metadata/list`, (req, res, ctx) => {
    const params = req.url.searchParams.get("metadata_kind");

    console.log(params);

    if (params) {
      return res(ctx.json(metaDatas));
    } else {
      return res(ctx.status(400));
    }
  }),
  rest.get(`/category/main/list`, (req, res, ctx) => {
    const mainCategoryList = mainCategoryData;

    if (mainCategoryList) {
      return res(ctx.json(mainCategoryList));
    } else {
      return res(ctx.status(400));
    }
  }),
  rest.get(`/category/sub/list`, (req, res, ctx) => {
    const subCategoryList = subCategoryData;

    if (subCategoryList) {
      return res(ctx.json(subCategoryList));
    } else {
      return res(ctx.status(400));
    }
  }),
];
