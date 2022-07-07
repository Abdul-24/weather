const request = require("postman-request");

const forecast = function ({ lat, lng }, callback) {
  request(
    {
      url: `https://api.openweathermap.org/data/2.5/weather?lon=${lng}&lat=${lat}&appid=bbe11819b129e9e3d0cc44ccf5c27a21&units=metric`,
      json: true,
    },
    (error, response) => {
      if (error) return callback("Internet Connection Broken", undefined);
      const data = response.body;
      if (!data.weather) return callback("Enter a proper location", undefined);
      else {
        const weather =
          data.weather[0].description[0].toUpperCase() +
          data.weather[0].description.slice(1);
        const temp = data.main.temp;
        const feels_like = data.main.feels_like;

        return callback(undefined, { weather, temp, feels_like });
        // console.log(weather.description);
      }
    }
  );
};

module.exports = forecast;
