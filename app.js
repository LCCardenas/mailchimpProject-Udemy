const express = require("express");
const app = express();
const https = require("https");
app.use(express.urlencoded({ extended: true })); // for parsing the HTTP request
app.use(express.static("public")); //provides the path to static files

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  console.log("Post request received.");
  var userName = req.body.userName;
  var userEmail = req.body.userEmail;
  var data = {
    members: [
      {
        email_address: userEmail,
        status: "subscribed",
        merge_fields: {
          FNAME: userName
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us19.api.mailchimp.com/3.0/lists/LISTID"; // mailchimp endpoint
  const options = {
    method: "POST",
    auth: "lolo:APIKEY"
  };

  const request = https.request(url, options, function(response) {
    if (response.statusCode === 200) {
      // Only checks the connection to mailchimp, not if the registration was successful.
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function(data) {
      const subInfo = JSON.parse(data);
    });
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Listening on port 3000");
});
