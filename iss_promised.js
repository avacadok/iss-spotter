const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
};



const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  return request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then((ip) => {
      return fetchCoordsByIP(ip);
    })
    .then((coords) => {
      return fetchISSFlyOverTimes(coords);
    })
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };