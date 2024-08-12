import React, { useCallback, useEffect, useState } from "react";
import { getData, getForecast } from "./services/axios/service";
import { getDayName } from "./utils";

function translateWeather(description: string) {
  const translations: any = {
    "clear sky": "Cerah",
    "few clouds": "Sedikit berawan",
    "scattered clouds": "Berawan tersebar",
    "broken clouds": "Berawan",
    "overcast clouds": "Mendung",
    "light rain": "Hujan ringan",
    "moderate rain": "Hujan sedang",
    "heavy intensity rain": "Hujan lebat",
    thunderstorm: "Badai petir",
    snow: "Salju",
    mist: "Berkabut",
    // Tambahkan terjemahan lain sesuai kebutuhan
  };

  return translations[description.toLowerCase()] || description;
}

function debounnce<F extends (...args: any[]) => any>(
  func: F,
  delay: number
): (...args: Parameters<F>) => void {
  let timeoutId: number | undefined;
  return (...args: Parameters<F>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

const App = () => {
  const [weather, setWeather] = useState<any>();
  const [forecasts, setForecasts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  const debounnceSearch = useCallback(
    debounnce(async (value: string) => {
      try {
        const result = await getData(value);
        setWeather(result);
      } catch (error) {
        console.log(error);
      }
    }, 500),
    []
  );

  useEffect(() => {
    setIsLoading(true);
    const getAPI = async () => {
      try {
        const data = await getData();
        const forecastData = await getForecast();
        setWeather(data);
        setForecasts(forecastData);
        setIsLoading(false);
      } catch (error) {
        console.error("error", error);
      }
    };

    getAPI();
  }, []);

  return (
    <>
      <div className="container mx-auto max-w-[750px]">
        <div className="mx-4 mt-4 mb-2">
          <input
            type="text"
            className="border w-full p-2 rounded"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              debounnceSearch(e.target.value)
            }
            placeholder="city"
          />
        </div>
        {!isLoading ? (
          <>
            <div className="flex items-center justify-between border rounded shadow bg-white m-4">
              <div className="flex items-center">
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.name}
                  className=""
                />
                <div className="xl:w-full">
                  <h1 className="font-semibold text-nowrap">
                    Cuaca di {weather && weather.name}
                  </h1>
                  <h3>{translateWeather(weather.weather[0].description)}</h3>
                </div>
              </div>

              <h3 className="m-4 font-bold text-lg md:text-2xl text-slate-500">
                {(weather.main.temp - 273.15).toFixed(1)}°C
              </h3>
            </div>
            <div className="flex my-4 text-sm md:text-base">
              <div className="p-4 border w-1/2 ms-4 me-2 rounded shadow bg-white">
                <div>
                  Terasa seperti :{" "}
                  {(weather.main.feels_like - 273.15).toFixed(2)}
                  °C
                </div>
                <div>Kelembaban : {weather.main.humidity}%</div>
              </div>
              <div className="border w-1/2 ms-2 me-4 rounded p-4 shadow bg-white">
                <div>Kecepatan Angin : {weather.wind.speed} m/detik</div>
                <div>Tutupan awan : {weather.clouds.all} %</div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-center text-slate-500">Loading...</div>
        )}

        <div className="flex overflow-x-auto space-x-4 px-4 w-full no-scroll md:justify-between">
          {!isLoading
            ? forecasts.map((forecast: any) => (
                <div
                  key={forecast.dt}
                  className="flex-shrink-0 md:w-32 border flex flex-col justify-center items-center py-2 px-1 bg-white rounded shadow"
                >
                  <h1>{getDayName(forecast.dt)}</h1>
                  <img
                    src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                    alt={forecast.dt}
                    className=""
                  />
                  <h1>{(forecast.main.feels_like - 273.15).toFixed(2)}°C</h1>
                </div>
              ))
            : null}
        </div>

        <div className="text-center text-slate-500 py-2 absolute bottom-0 text-sm w-full md:max-w-[750px]">
          <hr className="mb-2 bg-red-500" />
          <h1>@2024 Syahridho Arjuna Syahputra</h1>
        </div>
      </div>
    </>
  );
};

export default App;
