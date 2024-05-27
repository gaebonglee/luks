import React from "react";
import { Routes, Route } from "react-router-dom";
import Top from "../components/product/top/Top";
import Tshirts from "../components/product/top/Tshirts";

const Category = () => {
  return (
    <div className="Category">
      <Routes>
        <Route path="top" element={<Top />} />
        <Route path="top/티셔츠" element={<Tshirts />} />
        <Route path="top/맨투맨&후드" element={<Top />} />
        <Route path="top/셔츠" element={<Top />} />
        <Route path="top/블라우스" element={<Top />} />
        <Route path="top/니트" element={<Top />} />
      </Routes>
    </div>
  );
};

export default Category;
