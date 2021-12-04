const http = require("http");
var axios = require("axios");
var fs = require("fs");
var lodash = require("lodash");
var moment = require("moment");
const { get } = require("lodash");

const hostname = "127.0.0.1";
const port = 3000;

async function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const server = http.createServer(async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/json");
  fs.readFile("j/groopPost.json", "utf8", function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      const obj = JSON.parse(data); //now it an object
      const newData = lodash.filter(obj, (res) => {
        if (
          moment(new Date(get(res, "date", 0) * 1000)).isAfter("2021-09-01") &&
          moment(new Date(get(res, "date", 0) * 1000)).isBefore("2021-12-31")
        ) {
          return true;
        } else {
          return false;
        }
      });
      console.log(newData);
      fs.writeFile(
        "j/filtredWallsAfter.json",
        JSON.stringify(newData),
        "utf8",
        () => {}
      );
    }
  });
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
