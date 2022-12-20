import { APIInstance } from "./axiosInstance";
import makeQuery from "../utils/makeQuery";
import imageCompression from "browser-image-compression";

export const listProductAPI = async (payload) => {
  const { filters, sort_by, order, elements, page } = payload;

  console.log(payload);

  const filterQuery = makeQuery(filters);

  return await APIInstance.get(
    `/clothe/list?filters=${filterQuery}&sort_by=${sort_by}&order=${order}&elements=${elements}&page=${page}`
  );
};

export const getProductAPI = async (id) => {
  return await APIInstance.get(`/clothe/read/${id}`);
};

export const addProductAPI = async (payload) => {
  const {
    images,
    name,
    main_category_id,
    sub_category_id,
    price,
    condition_code,
    shipping_fee,
    brand_id,
    purchase_place_id,
    ex_price,
    purchase_date,
  } = payload;

  const base64List = [];
  const options = {
    masSizeMB: 2,
    maxWidthOrHeight: 768,
    useWebWorker: true,
  };

  const newImages = await Promise.all(
    Array.from(images).map(async (file) =>
      imageCompression.getDataUrlFromFile(await imageCompression(file, options))
    )
  );

  const newImageList = newImages.map((imageURL) => imageURL.split(",")[1]);

  const formdata = new FormData();
  formdata.append("files", newImageList);

  formdata.append("name", name);
  formdata.append("main_category_id", main_category_id);
  formdata.append("sub_category_id", sub_category_id);
  formdata.append("price", price);
  formdata.append("condition_code", condition_code);
  formdata.append("shipping_fee", shipping_fee);
  formdata.append("brand_id", brand_id);
  formdata.append("purchase_place_id", purchase_place_id);
  formdata.append("purchase_date", purchase_date);
  formdata.append("ex_price", ex_price);

  return await APIInstance.post(`/clothe/create`, formdata, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const modifyProductAPI = async (payload) => {
  const {
    clothe_id,
    itemimage,
    name,
    main_category_id,
    sub_category_id,
    price,
    condition_code,
    shipping_fee,
    upload_date,
    upload_time,
    brand_id,
    purchase_place_id,
    ex_price,
    purchase_date,
    color_code,
    material_code,
    description,
  } = payload;
  return await APIInstance.put(
    `/clothe/update/${clothe_id}`,
    {
      clothe_id,
      itemimage,
      name,
      main_category_id,
      sub_category_id,
      price,
      condition_code,
      shipping_fee,
      upload_date,
      upload_time,
      brand_id,
      purchase_place_id,
      ex_price,
      purchase_date,
      color_code,
      material_code,
      description,
    },
    { withCredentials: true }
  );
};

export const deleteProductAPI = async (id) => {
  return await APIInstance.delete(`/clothe/delete/${id}`);
};
