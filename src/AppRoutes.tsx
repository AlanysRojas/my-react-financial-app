import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/new" element={<ProductForm />} />
      <Route
        path="/products/edit/:id"
        element={<ProductForm isEdit={true} />}
      />
    </Routes>
  );
};

export default AppRoutes;
