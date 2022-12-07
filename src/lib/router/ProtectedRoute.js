import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => {
    return {
      user: state.auth.auth,
    };
  });
  if (!user) {
    alert("먼저 로그인이 필요한 서비스 입니다!");
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
