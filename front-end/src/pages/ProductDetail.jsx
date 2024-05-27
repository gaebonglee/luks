import React from "react";
import ProductImg from "../components/product/ProductImg";
import ProductInfo from "../components/product/ProductInfo";
import "../style/product/ProductDetail.scss";

const ProductDetail = () => {
  return (
    <div className="ProductDetail_container">
      <div className="ProductDetail_wrap">
        <ProductImg />
        <ProductInfo />
      </div>
    </div>
  );
};

export default ProductDetail;
