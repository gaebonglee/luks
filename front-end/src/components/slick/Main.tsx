import React, { useState, useEffect } from "react";
import { menus } from "../../types/menus";
import "animate.css";
import "../../style/Main.scss";

const Main: React.FC = () => {
  const [randomImgUrl, setRandomImgUrl] = useState<string>("");
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * menus.length);
    setRandomImgUrl(menus[randomIndex].imageUrl);
  }, []);
  return (
    <section className="mainContainer">
      <div className="main-contents collections">
        <img src="images/collection.jpg" />
      </div>
      <div className="main-contents items">
        <img src={randomImgUrl} alt="Random Menu" />
      </div>
    </section>
  );
};

export default Main;
