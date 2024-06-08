import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../../style/temperature/OpenWeatherMap.scss";
import { useNavigate } from "react-router-dom";

// 아이콘
import { FiSearch } from "react-icons/fi";
import { IoLocationSharp } from "react-icons/io5";
import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { IoUmbrella } from "react-icons/io5";
import { FaTemperatureLow } from "react-icons/fa6";

const OpenWeatherMap = () => {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState("Seoul");
  const [search, setSearch] = useState("");
  const apiKey = process.env.REACT_APP_WEATHER_KEY;

  const getWeatherIcon = (description) => {
    switch (description) {
      case "clear sky":
        return "/images/weather/sunny_icon.png";
      case "few clouds":
        return "/images/weather/sunnycloudy_icon.png";
      case "scattered clouds":
      case "broken clouds":
      case "overcast clouds":
        return "/images/weather/cloudy_icon.png";
      case "light rain":
      case "moderate rain":
      case "heavy intensity rain":
      case "very heavy rain":
      case "extreme rain":
      case "freezing rain":
      case "light intensity shower rain":
      case "heavy intensity shower rain":
      case "ragged shower rain":
      case "shower rain":
        return "/images/weather/rain_icon.png";
      case "thunderstorm":
      case "thunderstorm with light rain":
      case "thunderstorm with rain":
      case "thunderstorm with heavy rain":
      case "light thunderstorm":
      case "heavy thunderstorm":
      case "ragged thunderstorm":
      case "thunderstorm with light drizzle":
      case "thunderstorm with drizzle":
      case "thunderstorm with heavy drizzle":
        return "/images/weather/lightning_icon.png";
      case "snow":
      case "light snow":
      case "heavy snow":
      case "sleet":
      case "light shower sleet":
      case "shower sleet":
      case "light rain and snow":
      case "rain and snow":
      case "light shower snow":
      case "shower snow":
      case "heavy shower snow":
        return "/images/weather/snow_icon.png";
      case "mist":
      case "smoke":
      case "haze":
      case "sand/dust whirls":
      case "fog":
      case "sand":
      case "dust":
      case "volcanic ash":
      case "squalls":
      case "tornado":
        return "/images/weather/foggy_icon.png";
      default:
        return "/images/weather/default_icon.png";
    }
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
        );
        console.log("API Response:", response.data);
        const filteredData = response.data.list.filter((data) =>
          data.dt_txt.includes("12:00:00")
        );
        console.log("Filtered Data:", filteredData);

        setWeatherData(filteredData);
      } catch (error) {
        console.error("Error fetching the weather data", error);
      }
    };
    fetchWeather();
  }, [city, apiKey]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) {
      Swal.fire("지역을 영어로 검색해주세요");
      return;
    }
    setCity(search);
  };

  const handleNextBtn = () => {
    navigate("/t-emperature/chooseOne");
  };

  return (
    <section className="OpenWeatherMap_section">
      <div className="OpenWeatherMap_container">
        <div className="todayWeatherWrap">
          <div className="currentWeather">
            <h2>
              <IoLocationSharp />
              {city}
            </h2>
            {weatherData.length > 0 ? (
              <div className="weather_item">
                <h3>{new Date(weatherData[0].dt_txt).toLocaleDateString()}</h3>
                <img
                  src={getWeatherIcon(weatherData[0].weather[0].description)}
                  alt={weatherData[0].weather[0].description}
                />
                <p>온도: {weatherData[0].main.temp}°C</p>
                <p>날씨: {weatherData[0].weather[0].description}</p>
              </div>
            ) : (
              <p>No data available</p>
            )}
          </div>
          <div className="Weather_SearchDetail">
            <div className="searchWrap">
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  value={search}
                  onChange={handleSearchChange}
                  placeholder="지역이름 검색"
                />
                <button type="submit">
                  <FiSearch />
                </button>
              </form>
            </div>
            <div className="detailedWeather">
              <h2>오늘 날씨</h2>
              {weatherData.length > 0 ? (
                <div className="detailedWeather_itemWrap">
                  <div className="detailedWeather_item">
                    <FaWind />
                    <a>바람</a>
                    <p>{weatherData[0].wind.speed} m/s</p>
                  </div>
                  <div className="detailedWeather_item">
                    <IoUmbrella />
                    <a>강수량</a>
                    <p>
                      {weatherData[0].rain ? weatherData[0].rain["3h"] : "0"} mm
                    </p>
                  </div>
                  <div className="detailedWeather_item">
                    <WiHumidity />
                    <a>습도</a>
                    <p>{weatherData[0].main.humidity}%</p>
                  </div>
                  <div className="detailedWeather_item">
                    <FaTemperatureLow />
                    <a>온도</a>
                    <p>{weatherData[0].main.temp}°C</p>
                  </div>
                </div>
              ) : (
                <p>No data available</p>
              )}
            </div>
          </div>
        </div>
        <div className="forecastWrap">
          <h2>{city}의 5일 날씨 예보</h2>
          {weatherData.length > 0 ? (
            <div className="animation_container">
              {weatherData.map((data, index) => (
                <div className="weather_item" key={index}>
                  <h3>{new Date(data.dt_txt).toLocaleDateString()}</h3>
                  <img
                    src={getWeatherIcon(data.weather[0].description)}
                    alt={data.weather[0].description}
                  />
                  <p>온도: {data.main.temp}°C</p>
                  <p>날씨: {data.weather[0].description}</p>
                  <p>강수량: {data.rain ? data.rain["3h"] : "0"} mm</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No data available</p>
          )}
        </div>
        <button className="NextBtn" onClick={handleNextBtn}>
          다음
        </button>
      </div>
    </section>
  );
};

export default OpenWeatherMap;
