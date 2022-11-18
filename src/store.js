import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

import rootReducer from "./slices";

const logger = createLogger();

const initialState = {};

const store = configureStore({
  reducer: rootReducer,
  middleware: [logger],
  preloadedState: initialState,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
