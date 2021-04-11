// Require Express to run server and routes
const express = require("express");
const routes = require("./routes");

// Start up an instance of app
const app = express();

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
app.use("/", routes);

console.log(__dirname);

// Setup Server
const port = 8080;

const server = app.listen(port, () => {
  console.log(`running on localhost: ${port}`);
});
