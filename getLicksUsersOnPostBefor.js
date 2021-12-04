const http = require("http");
var axios = require("axios");
var fs = require("fs");
var lodash = require("lodash");
var moment = require("moment");
const { get, filter } = require("lodash");

const hostname = "127.0.0.1";
const port = 3000;

async function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function getData() {
  const filtredWallsBefor = JSON.parse(
    await fs.promises.readFile("j/filtredWallsBefor.json", "utf8")
  );
  const LicksUsersOnPostTwo = JSON.parse(
    await fs.promises.readFile("j/LicksUsersOnPostTwo.json", "utf8")
  );

  return filter(
    LicksUsersOnPostTwo,
    (o) => filtredWallsBefor.findIndex((obj) => obj.id === o.item_id) !== -1
  );
}

const server = http.createServer(async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/json");
  getData().then((newData) => {
    console.log(newData);
    fs.writeFile(
      "j/LicksUsersOnPostTwoBefor.json",
      JSON.stringify(newData),
      "utf8",
      () => {}
    );
  });
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
