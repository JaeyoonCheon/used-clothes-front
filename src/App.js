import React from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./lib/router/ProtectedRoute";
import GlobalStyle from "./lib/styles/globalStyle";
import HomePage from "./pages/HomePage";
import HomePage2 from "./pages/HomePage2";
import IDForgotPage from "./pages/IDForgotPage";
import PWForgotPage from "./pages/PWForgotPage";
import RegisterPage from "./pages/RegisterPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import AddItemPage from "./pages/AddItemPage";
import ModifyItemPage from "./pages/ModifyItemPage";
import WelcomePage from "./pages/WelcomePage";
import MyPage from "./pages/MyPage";
import MyProductPage from "./pages/MyProductPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  console.log("Render start");
  return (
    <>
      <GlobalStyle></GlobalStyle>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/2" element={<HomePage2 />}></Route>
        <Route path="idforgot" element={<IDForgotPage />}></Route>
        <Route path="pwforgot" element={<PWForgotPage />}></Route>
        <Route path="register" element={<RegisterPage />}></Route>
        <Route path="product/:id" element={<ItemDetailPage />}></Route>
        <Route
          path="addItem"
          element={
            <ProtectedRoute>
              <AddItemPage />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="modifyItem/:id" element={<ModifyItemPage />}></Route>
        <Route path="welcome" element={<WelcomePage />}></Route>
        <Route
          path="mypage"
          element={
            <ProtectedRoute>
              <MyPage />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="myproduct" element={<MyProductPage />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </>
  );
};

export default App;
