import { getDayName } from "../../../utils/getDayName";

const CardForecast = (props: any) => {
  const { forecast } = props;
  return (
    <div className="flex-shrink-0 md:w-32 border flex flex-col justify-center items-center py-2 px-1 bg-white rounded shadow">
      <h1>{getDayName(forecast.dt)}</h1>
      <img
        src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
        alt={forecast.dt}
        className=""
      />
      <h1>{(forecast.main.feels_like - 273.15).toFixed(2)}°C</h1>
    </div>
  );
};

export default CardForecast;
