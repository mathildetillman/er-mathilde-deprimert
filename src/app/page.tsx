"use client";
import { useEffect, useState } from "react";

const sunnyConditions = [
  "clearsky_day",
  "clearsky_night",
  "clearsky_polartwilight",
  "fair_day",
  "fair_night",
  "fair_polartwilight",
];

export default function Home() {
  const [currentWeather, setcurrentWeather] = useState<null | string>(null);

  useEffect(() => {
    async function fetchWeather() {
      const url =
        "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=59.9139&lon=10.7522";

      try {
        const response = await fetch(url, {
          headers: {
            "User-Agent": "IMD",
          },
        });

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
    return null;
  }

  const isSunny = sunnyConditions.includes(currentWeather);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="px-18 py-12 text-8xl font-medium bg-background">
        {isSunny ? "Nei :)" : "Ja :("}
      </div>
    </div>
  );
}
