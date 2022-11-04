import { APIInstance } from "../utils/axiosInstance";
import makeQuery from "../utils/makeQuery";

export const listProductsAPI = async (options) => {
  const query = makeQuery(options);

  try {
    console.log("fetch Start");
    const response = await APIInstance.get(
      `${process.env.REACT_APP_HOST}/clothe/list?filters=${query}`
    );
    console.log(`fetch success!`);
    console.log(response.data);

    return response.data;
  } catch (e) {
    console.log(`fetch products Error!`);
    console.log(e);

    return null;
  }
};
