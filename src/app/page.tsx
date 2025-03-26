"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const sunnyConditions = [
  "clearsky_day",
  "clearsky_night",
  "clearsky_polartwilight",
  "fair_day",
  "fair_night",
  "fair_polartwilight",
  "partlycloudy_day",
  "partlycloudy_night",
  "partlycloudy_polartwilight",
];

export default function Home() {
  const [currentWeather, setcurrentWeather] = useState<null | string>(null);

  const isDepressed = () => {
    if (!currentWeather) {
      return false;
    }
    const isSunny = sunnyConditions.includes(currentWeather);

    const currentMonth = new Date().getMonth();
    const isWinter = currentMonth >= 9 || currentMonth <= 3; // winter is from october to april

    return isWinter && !isSunny;
  };

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await fetch("/api/weather");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const timeseries = data.properties.timeseries;
        const currentWeather =
          timeseries[0].data.next_1_hours.summary.symbol_code; // Weather code
        setcurrentWeather(currentWeather);
      } catch (error) {
        console.error("Error fetching MET weather data:", error);
      }
    }

    fetchWeather();
  }, []);

  if (!currentWeather) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <div className="px-18 py-12 text-8xl font-medium bg-background">?</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div>
        <Image
          height={100}
          width={100}
          src={`weatherIcons/${currentWeather}.svg`}
          alt={currentWeather}
          className="relative md:absolute top-4 right-4"
        />
      </div>
      <div className="px-18 py-12 text-8xl font-medium bg-background color-[#171717]">
        {isDepressed() ? "Ja :(" : "Nei :)"}
      </div>
    </div>
  );
}
