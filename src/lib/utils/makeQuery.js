import qs from "qs";

const makeQuery = (options) => {
  return qs.stringify(options, { delimiter: "," });
};

export default makeQuery;
