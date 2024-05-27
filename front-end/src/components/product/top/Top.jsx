import React from "react";
import { Link } from "react-router-dom";
import "../../../style/product/ProductList.scss";

const Top = () => {
  const categoryTop = [
    {
      id: 1,
      name: "Star Ringer Tee-Cream",
      price: "39,000원",
      image:
        "https://image.msscdn.net/images/goods_img/20230320/3163242/3163242_16807486955379_500.jpg",
    },
    {
      id: 2,
      name: "Blow Tape Tee-Blue Grey",
      price: "39,000원",
      image:
        "https://image.msscdn.net/images/goods_img/20240322/3982764/3982764_17120536334607_500.jpg",
    },
    {
      id: 3,
      name: "Smudged Logo Long Sleeve White",
      price: "49,000원",
      image:
        "https://image.msscdn.net/images/goods_img/20230208/3067813/3067813_16768652453263_500.jpg",
    },
    {
      id: 4,
      name: "Wave Logo Tee-Black",
      price: "36,000원",
      image:
        "https://image.msscdn.net/images/goods_img/20220420/2502743/2502743_1_500.jpg",
    },
    {
      id: 5,
      name: "Cuz&Muz Friends Tee-White",
      price: "39,000원",
      image:
        "https://image.msscdn.net/images/goods_img/20240104/3775993/3775993_17126239917567_500.jpg",
    },

    // 다른 상품들도 이어서 추가
  ];

  return (
    <div id="contents">
      <div className="productWrap">
        <div className="productList_thumbnailWrap">
          <ul className="thumbnail">
            {categoryTop.map((product) => (
              <li key={product.id}>
                <div className="thumbnail_img">
                  <Link to={`/product/${product.name}${product.id}`}>
                    <img src={product.image} alt={product.id} />
                  </Link>
                </div>
                <div className="thumbnail_info">
                  <p className="thumbnail_productName">
                    <Link to={`/product/${product.name}${product.id}`}>
                      <span>{product.name}</span>
                    </Link>
                  </p>
                  <div className="thumbnail_productPrice">{product.price}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Top;
