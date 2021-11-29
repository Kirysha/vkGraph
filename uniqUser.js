const http = require("http");
var axios = require("axios");
var fs = require("fs");
var lodash = require("lodash");
var moment = require("moment");
const { get, map, uniqBy } = require("lodash");

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
  fs.readFile(
    "LicksUsersOnPostTwo.json",
    "utf8",
    function readFileCallback(err, data) {
      if (err) {
        console.log(err);
      } else {
        let newData = [];
        const obj = JSON.parse(data); //now it an object
        console.log(obj.length);
        for (let i = 0; i < obj.length; i++) {
          const element = obj[i].items;
          for (let j = 0; j < element.length; j++) {
            const user = element[j];
            newData.push(user);
          }
        }
        const uniqUsers = uniqBy(newData, "id");
        console.log();
        fs.writeFile(
          "uniqUsers.json",
          JSON.stringify(uniqUsers),
          "utf8",
          () => {}
        );
        res.end(JSON.stringify(uniqUsers));
      }
    }
  );
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
