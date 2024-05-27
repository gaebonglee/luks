import React from "react";
import "../../style/product/ProductList.scss";

const ProductList = () => {
  return (
    <div id="contents">
      <div className="productWrap">
        <div className="productList_thumbnailWrap">
          <ul className="thumbnail">
            <li>
              <div className="thumbnail_img"></div>
              <div className="thumbnail_info">
                <p className="thumbnail_productName">
                  <a>
                    <span>Modern cotton half pants</span>
                  </a>
                </p>
                <div className="thumbnail_productPrice"></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
