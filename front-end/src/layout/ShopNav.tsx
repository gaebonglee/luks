import React from "react";
import "../style/layout/ShopNav.scss";

const ShopNav: React.FC<{
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}> = ({ className, onMouseEnter, onMouseLeave }) => {
  return (
    <div
      className={`ShopNav_container ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="cover">
        <div className="shopCategory">
          <div className="sub_category">
            <div className="cate-Area">
              <ul className="cate_section">
                <li>상의</li>
                <li>팬츠</li>
                <li>아우터</li>
                <li>스커트&드레스</li>
                <li>신발&가방</li>
                <li>악세서리</li>
                <li>홈웨어</li>
              </ul>
            </div>
            <div className="image-Area"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopNav;
