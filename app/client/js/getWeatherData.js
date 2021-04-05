async function getWeatherData(lat, lng, forecastType) {
    const weatherbitBaseURL = `https://api.weatherbit.io/v2.0/${forecastType}?lat=${lat}&lon=${lng}`;
    console.log("url" + weatherbitBaseURL)
    
    let data = await fetch('http://localhost:8080/getKey')
    let keys = await data.json();
    let APIkey = keys.WeatherAPIKey;
    
    if (weatherbitBaseURL && APIkey) {
        let response = await fetch(`${weatherbitBaseURL}&key=${APIkey}`)
        let json = await response.json()
        return json
    }
}

export { getWeatherData }