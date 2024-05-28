import React from "react";
import { Link } from "react-router-dom";

const Tshirts = () => {
  return (
    <div id="contents">
      <div className="productWrap">
        <div className="productList_thumbnailWrap">
          <ul className="thumbnail">
            <li>
              <div className="thumbnail_img">
                <Link>
                  <img />
                </Link>
              </div>
              <div className="thumbnail_info">
                <p className="thumbnail_productName">
                  <Link>
                    <span></span>
                  </Link>
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

export default Tshirts;
