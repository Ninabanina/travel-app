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

const geonameUsername = process.env.GEONAME_USERNAME;
const weatherAPIKey = process.env.WEATHERAPIKEY;

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
  // let city = req.params.city;
  let {city, forecastType='current'} = req.params;
  const geonameBaseURL = 'http://api.geonames.org/';
  let geoResponse = await fetch(`${geonameBaseURL}searchJSON?q=${city}&maxRows=1&username=${process.env.GEONAME_USERNAME}`);
  let geoData = await geoResponse.json()
  if (geoData.geonames.length) {
      let {lat, lng} = geoData.geonames[0];
      const weatherbitBaseURL = forecastType === 'current'
         ? `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}`
         : `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}`;
      let weatherResponse = await fetch(`${weatherbitBaseURL}&key=${process.env.WEATHERAPIKEY}`)
      let weatherData = await weatherResponse.json()
      res.send(weatherData)
  }
})


app.get("/getKey", (req, res) => {
  res.send({ 
    GeonameKey: geonameUsername,
    WeatherAPIKey: weatherAPIKey
  });
})
