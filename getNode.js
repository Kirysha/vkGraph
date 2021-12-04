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

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  switch (req.url) {
    case "/users":
      console.log("user");
      res.writeHead(200);
      fs.readFile(
        "j/uniqUsers.json",
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
      break;
    case "/links":
      res.writeHead(200);
      fs.readFile(
        "j/linksOfWidth.json",
        "utf8",
        function readFileCallbackTwo(err, data) {
          if (err) {
            console.log(err);
          } else {
            const obj = JSON.parse(data); //now it an object
            const fData = filter(obj, (res) => res.width > 2);
            res.end(JSON.stringify(fData));
          }
        }
      );
      break;
    case "/users/after":
      console.log("user");
      res.writeHead(200);
      fs.readFile(
        "j/uniqUsersAfter.json",
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
      break;
    case "/users/befor":
      console.log("user");
      res.writeHead(200);
      fs.readFile(
        "j/uniqUsersBefor.json",
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
      break;
    case "/links/befor":
      res.writeHead(200);
      fs.readFile(
        "j/linksOfWidthBefor.json",
        "utf8",
        function readFileCallbackTwo(err, data) {
          if (err) {
            console.log(err);
          } else {
            const obj = JSON.parse(data); //now it an object
            const fData = filter(obj, (res) => res.width > 2);
            res.end(JSON.stringify(fData));
          }
        }
      );
      break;
    case "/users/after":
      console.log("user");
      res.writeHead(200);
      fs.readFile(
        "j/uniqUsersAfter.json",
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
      break;
    case "/links/after":
      res.writeHead(200);
      fs.readFile(
        "j/linksOfWidthAfter.json",
        "utf8",
        function readFileCallbackTwo(err, data) {
          if (err) {
            console.log(err);
          } else {
            const obj = JSON.parse(data); //now it an object
            const fData = filter(obj, (res) => res.width > 2);
            res.end(JSON.stringify(fData));
          }
        }
      );
      break;
    default:
      break;
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
