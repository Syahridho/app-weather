import { translateWeather } from "../../../utils/translateDay";

const Hero = ({ weather }: any) => {
  return (
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
  );
};

export default Hero;
