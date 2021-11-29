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

const server = http.createServer(async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/json");
  res.end("Hello World");

  let data = "";
  for (let index = 0; index < 20; index++) {
    const count = 100;
    const offset = count * index;
    var config = {
      method: "get",
      url: `https://api.vk.com/method/wall.get?access_token=${access_token}&v=5.131&domain=primorsknews_ru&count=${count}&offset=${offset}`,
      headers: {},
    };

    await axios(config)
      .then((response) => {
        console.log(response.data, response.data.response.items);
        const items = lodash.get(response, "data.response.items", []);
        const needData = lodash.map(items, (res) => ({
          text: lodash.get(res, "text", "").slice(0, 100),
          id: lodash.get(res, "id"),
          from_id: lodash.get(res, "from_id"),
          owner_id: lodash.get(res, "owner_id"),
          date: lodash.get(res, "date"),
          marked_as_ads: lodash.get(res, "marked_as_ads"),
          comments: lodash.get(res, "comments.count"),
          likes: lodash.get(res, "likes.count"),
          reposts: lodash.get(res, "reposts.count"),
          views: lodash.get(res, "views.count"),
        }));
        data += JSON.stringify(needData);
      })
      .catch(function (error) {
        console.log(error);
      });
    await wait(1000);
  }
  console.log(data);
  fs.writeFile("myjsonfile.json", data, "utf8", () => {});

  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
