import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import createStore from "./store";
import { worker } from "./mocks/worker";

import ScrollToTop from "./lib/utils/ScrollToTop";

if (process.env.NODE_ENV === "development") {
  worker.start();
}

const queryClient = new QueryClient();
const store = createStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ScrollToTop></ScrollToTop>
          <App />
          <div id="modal"></div>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
