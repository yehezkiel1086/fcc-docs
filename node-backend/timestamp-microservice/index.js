// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

function validateDateFormat(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/; // Example for YYYY-MM-DD
  return regex.test(dateString);
}

// your first API endpoint...
app.get("/api/:date", function (req, res) {
  let { date } = req.params;

  if (!date) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString(),
    });
  }

  let dateTime;
  if (!isNaN(date)) {
    dateTime = new Date(parseInt(date));
  } else {
    dateTime = new Date(date);
  }

  if (isNaN(dateTime.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: dateTime.getTime(),
    utc: dateTime.toUTCString(),
  });
});

app.get("/api", function (req, res) {
  const now = new Date();

  res.json({
    unix: now.getTime(),
    utc: now.toUTCString(),
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
