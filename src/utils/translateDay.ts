export function translateWeather(description: string) {
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
