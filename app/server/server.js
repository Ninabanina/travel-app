const data = {}

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const fetch = require('node-fetch');

// Start up an instance of app
const app = express();

// Setup environment variables
const dotenv = require('dotenv');
dotenv.config();

const GEONAME_USERNAME = process.env.GEONAME_USERNAME;
const WEATHER_APIKEY = process.env.WEATHER_APIKEY;
const PIXABAY_APIKEY = process.env.PIXABAY_APIKEY;

/* Middleware*/
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("dist"));

console.log(__dirname)

app.get('/', function (req, res) {
  res.sendFile('dist/index.html')
})

// Setup Server
const port = 8080;

const server = app.listen(port, () => {
  console.log(`running on localhost: ${port}`);
});

// GET route
app.get("/all", (req, res) => {
  res.send(projectData);
});

// POST route
app.post("/add", (req, res) => {
  projectData = req.body;
  res.send({ message: "Post received" });
});

app.get("/weather/:forecastType/:city" , async (req, res) => {
  let { city, forecastType='current'} = req.params;
  const geonameBaseURL = 'http://api.geonames.org/';
  let geoResponse = await fetch(`${geonameBaseURL}searchJSON?q=${city}&maxRows=1&username=${GEONAME_USERNAME}`);
  let geoData = await geoResponse.json()
  if (geoData.geonames.length) {
      let {lat, lng} = geoData.geonames[0];
      const weatherbitBaseURL = forecastType === 'current'
         ? `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}`
         : `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}`;
      let weatherResponse = await fetch(`${weatherbitBaseURL}&key=${WEATHER_APIKEY}`)
      let weatherData = await weatherResponse.json()
      res.send(weatherData)
  }
})

app.get("/city/:cityName" , async (req, res) => {
  // let city = req.params.city;
  let cityName =req.params.cityName;
  const pixabayBaseURL = 'https://pixabay.com/api/';
  let pixabayResponse = await fetch(`${pixabayBaseURL}?key=${PIXABAY_APIKEY}&q=${cityName}&image_type=photo&category=travel&safesearch=true&per_page=3`);
  let pixaData = await pixabayResponse.json();

  res.send(pixaData);
})
