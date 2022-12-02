import { APIInstance, testAPIInstance } from "./axiosInstance";

export const getMetadataAPI = async (type) => {
  return await testAPIInstance.get(
    `/clothe_metadata/list?metadata_kind=${type}`
  );
};
