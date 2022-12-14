import { APIInstance } from "./axiosInstance";

export const getMetadataAPI = async (type) => {
  return await APIInstance.get(`/clothe_metadata/list?metadata_kind=${type}`);
};
