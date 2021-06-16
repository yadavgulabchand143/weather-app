const request = require("request");

const foreCast = (latitude, longitude, callback) => {
  console.log();

  const url =
    "http://api.weatherstack.com/current?access_key=131b93d1229d4f50280cf1f99bfaa06e&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";
  // use es6 shorthand and object destrcturing features
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to Connect Weather Service", undefined);
    } else if (body.error) {
      callback("Unable to Find Location", undefined);
    } else {
      console.log(body.current);
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". it is currently " +
          body.current.temperature +
          " degrees out. it feels like " +
          body.current.feelslike +
          " degress out. The humidity is " +
          body.current.humidity +
          "%"
      );
    }
  });
};

module.exports = foreCast;
