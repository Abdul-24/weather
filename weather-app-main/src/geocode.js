const request = require("postman-request");

const geocode = function (text, callback) {
  request(
    {
      url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=pk.eyJ1Ijoidml2ZWtyYWk5NjM4IiwiYSI6ImNrcWt2ZWpibjAyYncybnF3YzluZG42MnIifQ.wZIkTd8Ee9zPkB-ov7-rhQ`,
      json: true,
    },
    (error, response) => {
      if (error) return callback("Internet Connection Broken", undefined);
      if (!response.body.features[0])
        return callback("Enter a valid location", undefined);
      else {
        const data = response.body.features[0];

        const lat = data.center[1];
        const lng = data.center[0];

        const place = data.place_name;

        return callback(undefined, { lat, lng, place });
      }
    }
  );
};

module.exports = geocode;
