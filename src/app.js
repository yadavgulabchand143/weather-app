// Express Server
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utills/geocode");
const forecast = require("./utills/forecast");

//console.log(__dirname);
//console.log(path.join(__dirname, "../public"));

// to store express application
const app = express();

//configure express to serve html
// define path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and views location
// customized views directory
// configuring Dynamic page Template Engine with express
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);
// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather app",
    name: "Gulabchand Yadav",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Gulabchand Yadav",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Gulabchand Yadav",
    helpText: "this is some helpful text",
  });
});

// Routing
//app.com
//app.com/help
//app.com/about
//app.com/about

// send Html
// app.get("", (req, res) => {
//   res.send("<h1>Weather App</h1>");
// });
//Send Object
// app.get("/help", (req, res) => {
//   console.log();
//   res.send([
//     {
//       name: "Andrew",
//       age: 27,
//     },
//     {
//       name: "gulab",
//       age: 29,
//     },
//   ]);
// });
// app.get("/about", (req, res) => {
//   console.log();
//   res.send("<title>About Page!</title>");
// });
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provide an address",
    });
  }
  // building a JSON HTTP Endpoint
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error }); // shorthand
      }
      forecast(latitude, longitude, (error, forecastdata) => {
        if (error) {
          return res.send({ erro }); // shorthand
        }
        res.send({
          forecast: forecastdata,
          location,
          address: req.query.address,
        });
      });
    }
  );
});
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "gulabchand Yadav",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "gulabchand Yadav",
    errorMessage: "Page Not Found",
  });
});
// start the server
app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
