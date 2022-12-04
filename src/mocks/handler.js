import { rest } from "msw";

import {
  itemDatas,
  metaDatas,
  mainCategoryData,
  subCategoryData,
} from "../lib/dummydata/dummydata";

export const handlers = [
  rest.post("/user/login", (req, res, ctx) => {
    const email = req.body.email;
    return res(ctx.status(200), ctx.json(email));
  }),
  rest.post("/user/create", (req, res, ctx) => {
    const formData = req.body;

    if (formData) {
      return res(ctx.status(200));
    } else {
      return res(ctx.status(400));
    }
  }),
  rest.get("/clothe/list?*", (req, res, ctx) => {
    const params = req.url.searchParams.get("filters");

    if (params) {
      return res(ctx.json(itemDatas));
    } else {
      return res(ctx.status(400));
    }
  }),
  rest.get(`/clothe_metadata/list?*`, (req, res, ctx) => {
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
