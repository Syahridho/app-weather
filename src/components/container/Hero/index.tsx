import { translateWeather } from "../../../utils/translateDay";

const Hero = (props: any) => {
  const { weather } = props;
  return (
    <>
      <div className="flex items-center justify-between border rounded shadow bg-white m-4">
        {weather ? (
          <>
            <div className="flex items-center w-full">
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.name}
                className=""
              />
              <div className="md:flex md:justify-between md:items-center w-full">
                <div>
                  <h1 className="font-semibold text-nowrap">
                    Cuaca di {weather.name}
                  </h1>
                  <h3>{translateWeather(weather.weather[0].description)}</h3>
                </div>
                <h3 className="font-bold text-lg md:text-2xl text-slate-500 md:mr-12">
                  {(weather.main.temp - 273.15).toFixed(1)}°C
                </h3>
              </div>
            </div>
          </>
        ) : (
          <div className="h-[100px] animate-pulse bg-slate-200 w-full"></div>
        )}
      </div>
    </>
  );
};

export default Hero;
