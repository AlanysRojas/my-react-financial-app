import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductList";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" />} />
      <Route path="/products" element={<ProductList />} />
    </Routes>
  );
};

export default AppRoutes;
