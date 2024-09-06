import React from "react";
// import { menus } from "../types/menus";

const CategoryNav: React.FC = () => {
  return (
    <div className="header-left">
      <div className="category">
        <ul className="list">
          <li>NEW</li>
          <li>BEST</li>
          <li>SHOP</li>
          <li>STYLEING</li>
        </ul>
        {/* <ul className="list">
          {menus.map((menu) => (
            <li key={menu.id}>{menu.title}</li>
          ))}
        </ul> */}
      </div>
      <div className="mobileBtn"></div>
    </div>
  );
};

export default CategoryNav;
