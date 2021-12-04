const http = require("http");
var axios = require("axios");
var fs = require("fs");
var lodash = require("lodash");
var moment = require("moment");
const { get, map, uniqBy, filter, size } = require("lodash");

const hostname = "127.0.0.1";
const port = 3000;

async function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const filter = async () => {};

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  fs.readFile(
    "vkGraph/uniqUsers.json",
    "utf8",
    function readFileCallback(err, data) {
      if (err) {
        console.log(err);
      } else {
        const obj = JSON.parse(data); //now it an object
        const dataVal = map(obj, (res) => ({
          id: res.id,
          label: res.first_name + " " + res.last_name,
        }));
        res.end(JSON.stringify(dataVal));
      }
    }
  );
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
