const express = require("express");
const app = express();
const https = require("https");
app.use(express.urlencoded({ extended: true })); // for parsing the HTTP request
app.use(express.static("public")); //provides the path of static files

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  console.log("Post request received.");
  var userName = req.body.userName;
  var userEmail = req.body.userEmail;
  console.log(userName + " " + userEmail);
});

app.listen(3000, function() {
  console.log("Listening on port 3000");
});
