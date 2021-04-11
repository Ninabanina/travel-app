var express = require("express");
const fetch = require("node-fetch");
const dotenv = require("dotenv");

var router = express.Router();
dotenv.config();

// Setup environment variables
const GEONAME_USERNAME = process.env.GEONAME_USERNAME;
const WEATHER_APIKEY = process.env.WEATHER_APIKEY;
const PIXABAY_APIKEY = process.env.PIXABAY_APIKEY;

router.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

router.get("/weather/:forecastType/:city", async (req, res) => {
  let { city, forecastType = "current" } = req.params;
  const geonameBaseURL = "http://api.geonames.org/";
  let geoResponse = await fetch(
    `${geonameBaseURL}searchJSON?q=${city}&maxRows=1&username=${GEONAME_USERNAME}`
  );
  let geoData = await geoResponse.json();
  if (geoData.geonames.length) {
    let { lat, lng } = geoData.geonames[0];
    const weatherbitBaseURL =
      forecastType === "current"
        ? `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}`
        : `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}`;
    let weatherResponse = await fetch(
      `${weatherbitBaseURL}&key=${WEATHER_APIKEY}`
    );
    let weatherData = await weatherResponse.json();
    res.send(weatherData);
  }
});

router.get("/city/:cityName", async (req, res) => {
  let cityName = req.params.cityName;
  const pixabayBaseURL = "https://pixabay.com/api/";
  let pixabayResponse = await fetch(
    `${pixabayBaseURL}?key=${PIXABAY_APIKEY}&q=${cityName}&image_type=photo&category=travel&safesearch=true&per_page=3`
  );
  let pixaData = await pixabayResponse.json();

  res.send(pixaData);
});

module.exports = router;
