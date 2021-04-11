async function getWeatherData(city, forecastType) {
  const weatherbitBaseURL = `http://localhost:8080/weather/${forecastType}/${city}`;

  let response = await fetch(weatherbitBaseURL);
  let data = await response.json();

  return data;
}

export { getWeatherData };
