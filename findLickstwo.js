const http = require("http");
var axios = require("axios");
var fs = require("fs");
var lodash = require("lodash");
var moment = require("moment");
const { get } = require("lodash");

const hostname = "127.0.0.1";
const port = 3000;
const access_token = "";

async function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const asyncQuery = async (obj = []) => {
  let data = [];
  for (let index = 0; index < obj.length; index++) {
    console.log("wait", index, obj.length, obj.length - index);
    const count = get(obj, `[${index}].likes`);
    const offset = index;
    const item_id = get(obj, `[${index}].id`);
    const owner_id = get(obj, `[${index}].owner_id`);
    const items = get(obj, `[${index}].items`);
    var config = {
      method: "get",
      url: `https://api.vk.com/method/likes.getList?access_token=${access_token}&v=5.131&domain=primorsknews_ru&count=${count}&offset=${offset}&item_id=${item_id}&owner_id=${owner_id}&type=post&filter=likes&extended=1`,
      headers: {},
    };

    await axios(config)
      .then((response) => {
        console.log(response.data);
        const items = lodash.get(response, "data.response.items", []);
        data.push({ items, item_id, owner_id });
      })
      .catch(function (error) {
        console.log(error);
      });
    await wait(1000);
  }
  return data;
};

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/json");
  fs.readFile(
    "LicksUsersOnPost.json",
    "utf8",
    function readFileCallback(err, data) {
      if (err) {
        console.log(err);
      } else {
        const obj = JSON.parse(data); //now it an object
        asyncQuery(obj).then((newData) => {
          fs.writeFile(
            "LicksUsersOnPostTwo.json",
            JSON.stringify(newData),
            "utf8",
            () => {}
          );
          console.log(newData);
        });
      }
    }
  );
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
