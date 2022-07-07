const express = require("express");
const forecast = require("./forecast");
const geocode = require("./geocode");
const path = require("path");
const hbs = require("hbs");

const app = express();

const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);

hbs.registerPartials(partialPath);

app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/help", (req, res) => {
  res.render("help");
});

app.get("/weather", (req, res) => {
  if (!req.query.place)
    res.send({ error: "Enter proper location", author: "Abdul" });
  else {
    geocode(req.query.place, (error, { lat, lng, place } = {}) => {
      if (error) return res.send({ error, author: "Abdul" });
      else {
        forecast({ lat, lng }, (error2, { weather, temp, feels_like } = {}) => {
          if (error2) return res.send({ error: error2, author: "Abdul" });
          else {
            return res.send({
              coord: { lat, lng },
              place,
              temp: { temp, feels_like },
              description: weather,
              author: "Abdul",
            });
          }
        });
      }
    });
  }
});

app.listen(port, () => {
  console.log("Server up and running at port " + port);
});
