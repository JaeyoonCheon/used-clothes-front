import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

import rootReducer from "./slices";

const logger = createLogger();

const store = configureStore({
  reducer: rootReducer,
  middleware: [logger],
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
