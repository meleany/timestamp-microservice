// New Timestamp Microservice Project by Yasmin Melean 09/08/2019
// init project
const express = require('express');
const app = express();

// Require CORS to allow FCC the remote testing of the API.
// More about Cors: https://en.wikipedia.org/wiki/Cross-origin_resource_sharing.
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200})); // Some legacy browsers (IE11, various SmartTVs) choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// Variables and function declaration used for validation of passed date string. 
var dateStringToUnix, dateStringToUTC;

const checkString = function(params) {
  var dateValue = new Date(params);
  if(isNaN(dateValue)) {
    dateStringToUnix = null;
    dateStringToUTC = "Invalid Date";
    const regexTest = /^\-?\d+$/.test(params);
    if(regexTest) {
      const parseIntParams = parseInt(params);
      dateValue = new Date(parseIntParams);
    }
  }

  if(!isNaN(dateValue)) {
    dateStringToUnix = dateValue.getTime();
    dateStringToUTC = dateValue.toUTCString(); 
  }
};

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Actual date of the server. Assumed to be local time, not necessarily the client real time.
app.get('/api/timestamp', function(req, res) {
  const date = new Date();
  const currentUnixTime = date.getTime();
  const currentUTCTime = date.toUTCString();
  res.json({"unix": currentUnixTime, "utc": currentUTCTime});
});

// GET the parameter passed in the url and checks if it is a natural date, an Unix timestamp, etc.
app.get('/api/timestamp/:date', function(req, res) {
  checkString(req.params.date);
  if(dateStringToUTC == "Invalid Date"){
    res.json({"error": dateStringToUTC });
  }else{
    res.json({"unix":dateStringToUnix, "utc": dateStringToUTC });  
  }
});

// Starts the server and listens for requests in PORT
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app Timestamp Microservice is listening on port ' + listener.address().port);
});