var full = document.getElementById("fullurl");
// var shortid = document.getElementById("short");
var newlink = document.createElement("a");
var errorp = document.getElementById("error");
const url =
  "https://emoji-api.com/emojis?access_key=b597cc997e7e1e9dd8933bdb8dd37cd0800c5227";

var collection = [];
async function getemoji() {
  console.log("inside getemoji");
  await axios
    .get(url)
    .then(function (response) {
      if (response.status == 200) {
        console.log("success");
        for (var i = 0; i < 10; i++) {
          var code = "0x" + response.data[i].codePoint;
          console.log(code);
          console.log(String.fromCodePoint(code));
          collection.push(String.fromCodePoint(code));
        }
      }
    })
    .catch(function (err) {
      console.log(err);
    });

  var arr = allshorturls();

  var combination = "";
  var f = 1;
  while (f == 1) {
    var c = -1;
    for (var i = 0; i < 6; i++) {
      var random = Math.floor(Math.random() * 10);
      combination += collection[random];
    }
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == combination) {
        c = 1;
        break;
      }
    }
    if (c != 1) f = 0;
  }
  console.log("new:" + combination);

  postdata(combination);
}

//POST DATA TO DB FUNCTION
async function postdata(url) {
  var fullurl = full.value;
  var urldata = {
    shorturl: url,
    fullurl: fullurl,
  };

  await axios
    .post("https://trying-b8609.firebaseio.com/allurls.json", urldata)
    .then(function (response) {
      console.log("Link Successfully Recorded");
      console.log("Short: " + url + " Long: " + fullurl);
      // shortid.textContent = url;
      newlink.href = fullurl;
      newlink.innerHTML = url;
      newlink.setAttribute("target", "_blank");
      document.getElementById("shortdiv").appendChild(newlink);
      errorp.innerText = "Your Short Link is Right Below";
    })
    .catch(function (err) {
      console.log(err);
    });
}

//FORM SUBMISSION
document
  .getElementById("formid")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    errorp.innerText = "";
    var check = await alllongurls();
    if (check == -1) {
      errorp.textContent = "Already Exists";
    } else {
      console.log("doesnot");
      getemoji();
    }
  });

function allshorturls() {
  var arr = [];
  async function alreadyExist() {
    await axios
      .get("https://trying-b8609.firebaseio.com/allurls.json")
      .then(function (response) {
        var alldata = response.data;
        for (let key in alldata) {
          arr.push(alldata[key].shorturl);
        }
      });
  }
  console.log(arr);
  return arr;
}

async function alllongurls() {
  var arr = [];
  var newfullurl = await full.value;
  console.log(newfullurl);

  await axios
    .get("https://trying-b8609.firebaseio.com/allurls.json")
    .then(function (response) {
      var alldata = response.data;
      for (let key in alldata) {
        arr.push(alldata[key].fullurl);
      }
    });

  console.log(arr);

  var f = 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == newfullurl) {
      console.log("exists");
      f = -1;
      break;
    }
  }
  if (f == -1) return -1;
  else return 1;
}
