import React from "react";
import clearBg from "../assets/backgrounds/clear.jpg";
import cloudBg from "../assets/backgrounds/clouds.jpg";
import rainBg from "../assets/backgrounds/rain2.jpeg";
import snowBg from "../assets/backgrounds/snow2.jpg";
import thunderBg from "../assets/backgrounds/thunder.jpg";
import defaultBg from "../assets/backgrounds/default.jpg";

import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiThunderstorm,
  WiSnow,
  WiFog,
  WiHumidity,
  WiBarometer,
  WiStrongWind,
  WiSunrise,
  WiSunset,
  WiThermometer,
  WiDust
} from "react-icons/wi";

/* BACKGROUND  */

export const getBackgroundImage = (description = "") => {
  const text = description.toLowerCase();

  if (text.includes("clear")) return clearBg;
  if (text.includes("cloud")) return cloudBg;
  if (text.includes("rain") || text.includes("drizzle")) return rainBg;
  if (text.includes("snow")) return snowBg;
  if (text.includes("thunder")) return thunderBg;

  return defaultBg;
};

/*  WEATHER ICON */

export const getWeatherIcon = (description = "", size = 36) => {
  const text = description.toLowerCase();

  if (text.includes("clear")) return <WiDaySunny size={size} />;
  if (text.includes("cloud")) return <WiCloudy size={size} />;
  if (text.includes("rain") || text.includes("drizzle")) return <WiRain size={size} />;
  if (text.includes("snow")) return <WiSnow size={size} />;
  if (text.includes("thunder")) return <WiThunderstorm size={size} />;
  if (text.includes("fog") || text.includes("mist")) return <WiFog size={size} />;

  return <WiDaySunny size={size} />;
};

/*STAT ICONS */

export const getStatIcon = (type, size = 26) => {
  switch (type) {
    case "temp":
      return <WiThermometer size={size} />;
    case "humidity":
      return <WiHumidity size={size} />;
    case "pressure":
      return <WiBarometer size={size} />;
    case "wind":
      return <WiStrongWind size={size} />;
    case "visibility":
      return <WiDust size={size} />;
    case "sunrise":
      return <WiSunrise size={size} />;
    case "sunset":
      return <WiSunset size={size} />;
    default:
      return null;
  }
};

