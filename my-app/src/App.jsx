import React, { useEffect } from "react";
import useLocationStore from "./Api/stores/useLocationStore";
import CitySearch from "./componets/CitySearch";
import { getWeatherCondition } from "./Api/utils";

function App() {
  const {
    getGeolocation,
    weather,
    city,
    state,
    country,
    longitude,
    latitude,
    isLoading,
  } = useLocationStore();

  useEffect(() => {
    getGeolocation();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-400 flex flex-col items-center justify-start p-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 mt-8">
        <h1 className="text-4xl font-extrabold text-blue-700 text-center mb-2">
          Weather Now
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Get the current weather information for your location.
        </p>
        <div className="flex flex-col items-center gap-2 mb-6">
          {!isLoading ? (
            <>
              <div className="text-lg font-semibold text-gray-800">
                {city && (
                  <span>
                    <span className="inline-block mr-2">📍</span>
                    {city}
                    {state ? ", " + state : ""}
                    {country ? ", " + country : ""}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-4 items-center justify-center mt-2">
                <div className="bg-blue-50 rounded p-4 flex flex-col items-center min-w-[160px]">
                  <span className="text-2xl font-bold text-blue-600">
                    {weather ? `${weather.temperature}°C` : "--"}
                  </span>
                  <span className="text-sm text-gray-500">Temperature</span>
                </div>
                <div className="bg-blue-50 rounded p-4 flex flex-col items-center min-w-[160px]">
                  <span className="text-lg font-semibold text-blue-600">
                    {weather ? `${weather.windspeed} km/h` : "--"}
                  </span>
                  <span className="text-sm text-gray-500">Wind Speed</span>
                </div>
                <div className="bg-blue-50 rounded p-4 flex flex-col items-center min-w-[160px]">
                  <span className="text-lg font-semibold text-blue-600">
                    {weather ? `${weather.winddirection}°` : "--"}
                  </span>
                  <span className="text-sm text-gray-500">Wind Direction</span>
                </div>
              </div>
              {weather && (
                <div className="mt-4 text-center">
                  <span className="inline-block bg-blue-200 text-blue-900 rounded px-3 py-1 font-medium">
                    {getWeatherCondition(weather.weathercode)}
                  </span>
                  <span className="block text-xs text-gray-500 mt-1">
                    Updated:{" "}
                    {weather && new Date(weather.time).toLocaleString("en-US", {
                      timeZone: "UTC",
                    })}
                  </span>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-32">
              <svg
                className="animate-spin h-8 w-8 text-blue-500 mb-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
              <span className="text-blue-700 font-medium">
                Fetching location & weather...
              </span>
            </div>
          )}
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
            Search for a Location
          </h2>
          <CitySearch />
        </div>
      </div>
      <footer className="mt-8 text-gray-500 text-xs text-center">
        &copy; {new Date().getFullYear()} Weather Now. Powered by Open-Meteo &
        OpenStreetMap.
        <br />Developed By Tejas Najare aka <a href="https://github.com/Macdox" className="font-bold">Maddox</a>
      </footer>
    </div>
  );
}

export default App;
