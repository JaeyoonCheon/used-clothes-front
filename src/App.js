import React from "react";
import { Routes, Route } from "react-router-dom";

import GlobalStyle from "./lib/styles/globalStyle";
import HomePage from "./pages/HomePage";
import IDForgotPage from "./pages/IDForgotPage";
import PWForgotPage from "./pages/PWForgotPage";
import RegisterPage from "./pages/RegisterPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import AddItemPage from "./pages/AddItemPage";
import WelcomePage from "./pages/WelcomePage";
import MyPage from "./pages/MyPage";

const App = () => {
  console.log("Render start");
  return (
    <>
      <GlobalStyle></GlobalStyle>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="idforgot" element={<IDForgotPage />}></Route>
        <Route path="pwforgot" element={<PWForgotPage />}></Route>
        <Route path="register" element={<RegisterPage />}></Route>
        <Route path="product/:id/*" element={<ItemDetailPage />}></Route>
        <Route path="addItem" element={<AddItemPage />}></Route>
        <Route path="welcome" element={<WelcomePage />}></Route>
        <Route path="mypage" element={<MyPage />}></Route>
      </Routes>
    </>
  );
};

export default App;
