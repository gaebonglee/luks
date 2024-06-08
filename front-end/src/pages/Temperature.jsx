import React from "react";
import OpenWeatherMap from "../components/t-emperature/TodayWeather";
import "../style/temperature/Temperature.scss";

const Temperature = () => {
  return (
    <div className="Temperature_page">
      <div className="Temperature_container">
        <OpenWeatherMap />
      </div>
    </div>
  );
};

export default Temperature;
