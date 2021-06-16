// Asynchronous Calling
const request = require("request");

const geoCode = (address, callback) => {
  const geoMapBoxUrl =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoieWFkYXZndWxhYmNoYW5kIiwiYSI6ImNrcHRwNnlqYzB1OXEydW1uOGJzOTZxZDQifQ.dNZeCmWLXa19UQnu3LM-AA";

  request({ url: geoMapBoxUrl, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to Find Location, Try another Search", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
