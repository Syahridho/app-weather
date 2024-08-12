import { useCallback, useEffect, useState } from "react";
import { getData, getForecast } from "../../../services/axios/service";
import Input from "../../UI/Input";
import CardForecast from "../../container/CardForecast";
import Footer from "../../container/Footer";
import { debounnce } from "../../../utils/debounnce";
import Hero from "../../container/Hero";

const Home = () => {
  const [weather, setWeather] = useState<any>();
  const [forecasts, setForecasts] = useState<any>([]);

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
    const getAPI = async () => {
      try {
        const data = await getData();
        const forecastData = await getForecast();
        setWeather(data);
        setForecasts(forecastData);
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
          <h1 className="text-3xl mb-4 font-semibold">Perkiraan Cuaca</h1>
          <Input
            type="text"
            className="border w-full p-2 rounded"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              debounnceSearch(e.target.value)
            }
            placeholder="city"
          />
        </div>
        <Hero weather={weather} />
        {weather ? (
          <>
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
          <div className="flex mx-4 mb-4 gap-4">
            <div className="w-1/2 h-[100px] bg-slate-200 rounded shadow animate-pulse border"></div>
            <div className="w-1/2 h-[100px] bg-slate-200 rounded shadow animate-pulse border"></div>
          </div>
        )}

        <div className="flex overflow-x-auto space-x-4 px-4 w-full no-scroll md:justify-between">
          {forecasts.length > 0 ? (
            forecasts.map((forecast: any) => (
              <CardForecast key={forecast.dt} forecast={forecast} />
            ))
          ) : (
            <>
              <div className="flex-shrink-0 w-28 animate-pulse bg-slate-200 h-[140px] rounded shadow border"></div>
              <div className="flex-shrink-0 w-28 animate-pulse bg-slate-200 h-[140px] rounded shadow border"></div>
              <div className="flex-shrink-0 w-28 animate-pulse bg-slate-200 h-[140px] rounded shadow border"></div>
              <div className="flex-shrink-0 w-28 animate-pulse bg-slate-200 h-[140px] rounded shadow border"></div>
              <div className="flex-shrink-0 w-28 animate-pulse bg-slate-200 h-[140px] rounded shadow border"></div>
            </>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Home;
