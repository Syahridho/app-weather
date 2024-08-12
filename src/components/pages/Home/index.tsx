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
          <Input
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
            <Hero />
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
                <CardForecast forecast={forecast} />
              ))
            : null}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Home;
