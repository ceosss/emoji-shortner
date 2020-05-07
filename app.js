var express = require("express");
var app = express();
require("dotenv").config();
var ur = process.env.EMOJISHORT;
var axios = require("axios").default;
var cors = require("cors");
var bodyParser = require("body-parser");
app.use(cors());
app.use(express.static(__dirname + "/views"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.render("home.ejs");
});

app.get("/:hash", async function (req, res) {
  var url = req.params.hash;
  var arrfull = [];
  var arrshort = [];
  var redirectURL = "";
  console.log("data");
  await axios.get(ur).then(function (response) {
    var data = response.data;
    console.log(data);

    for (let key in data) {
      arrfull.push(data[key].fullurl);
      arrshort.push(data[key].shorturl);
    }

    for (var i = 0; i < arrshort.length; i++) {
      if (url == arrshort[i]) {
        redirectURL = arrfull[i];
        break;
      }
    }
  });
  if (redirectURL != "") {
    res.redirect(redirectURL);
  } else {
    res.redirect("/");
  }
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server Started");
});
