import { APIInstance, testAPIInstance } from "./axiosInstance";
import makeQuery from "../utils/makeQuery";

export const listProductsAPI = async (options) => {
  const query = makeQuery(options);

  return await testAPIInstance.get(`/clothe/list?filters=${query}`);
};

export const getProductAPI = async (id) => {
  return await testAPIInstance.get(`/clothe/read/${id}`);
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
  return await testAPIInstance.post(
    `/clothe/create`,
    {
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
    },
    { withCredentials: true }
  );
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
  return await testAPIInstance.put(
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
  return await testAPIInstance.delete(`/clothe/delete/${id}`);
};
