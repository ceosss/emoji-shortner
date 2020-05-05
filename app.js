var express = require("express");
var app = express();
var axios = require("axios").default;
var cors = require("cors");
var bodyParser = require("body-parser");
app.use(cors());
app.use(express.static(__dirname + "/Views"));
app.use(bodyParser.urlencoded({ extended: true }));

// const url =
//   "https://emoji-api.com/emojis?access_key=b597cc997e7e1e9dd8933bdb8dd37cd0800c5227";

// var collection = [];

// async function getemoji() {
//   await axios
//     .get(url)
//     .then(function (response) {
//       if (response.status == 200) {
//         console.log("success");
//         for (var i = 0; i < 10; i++) {
//           var code = "0x" + response.data[i].codePoint;
//           console.log(code);
//           console.log(String.fromCodePoint(code));
//           collection.push(String.fromCodePoint(code));
//         }
//       }
//     })
//     .catch(function (err) {
//       console.log(err);
//     });
//   var combination = "";
//   for (var i = 0; i < 8; i++) {
//     var random = Math.floor(Math.random() * 10);
//     combination += collection[random];
//   }
//   console.log("new:" + combination);
//   postdata(combination);
// }

// function postdata(url) {
//   axios
//     .post("https://trying-b8609.firebaseio.com/allurls.json", { url: url })
//     .then(function (response) {
//       console.log(response);
//     });
// }

// getemoji();

// async function alreadyExist(newurl) {
//   var arr = [];
//   await axios
//     .get("https://trying-b8609.firebaseio.com/allurls.json")
//     .then(function (response) {
//       var alldata = response.data;
//       for (let key in alldata) {
//         arr.push(alldata[key].shorturl);
//       }
//       for (var i = 0; i < arr.length; i++) {
//         if (arr[i] == newurl) console.log("Exists");
//       }
//     });
// }

// alreadyExist("😀😃😄🤣😂😃");

app.get("/", function (req, res) {
  res.render("home.ejs");
});

app.get("/:hash", async function (req, res) {
  var url = req.params.hash;
  var arrfull = [];
  var arrshort = [];
  var redirectURL = "";
  console.log("data");
  await axios
    .get("https://trying-b8609.firebaseio.com/allurls.json")
    .then(function (response) {
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
