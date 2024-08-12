import axios from "axios";

const apiKey = import.meta.env.VITE_APP_API_KEY;
const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const getData = async (query = "Pekanbaru") => {
  try {
    const result = await axios.get(
      `${baseUrl}/weather?q=${query}&appid=${apiKey}`
    );
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getForecast = async (query = "Pekanbaru") => {
  try {
    const result = await axios.get(
      `${baseUrl}/forecast?q=${query}&appid=${apiKey}`
    );
    const forecastAT6AM = result.data.list.filter((item: any) => {
      const date = new Date(item.dt * 1000);
      return date.getUTCHours() === 6;
    });

    return forecastAT6AM;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
