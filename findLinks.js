const http = require("http");
var axios = require("axios");
var fs = require("fs");
var lodash = require("lodash");
var moment = require("moment");
const { get, map, uniqBy, sortBy } = require("lodash");

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
        console.log("test", obj);
        for (let i = 0; i < obj.length; i++) {
          const element = obj[i].items;
          const sortedItems = sortBy(element, ["id"]);
          for (let a = 0; a < sortedItems.length - 1; a++) {
            const userOne = sortedItems[a];
            for (let b = a + 1; b < sortedItems.length; b++) {
              const userTwo = sortedItems[b];
              const idToFrom = `${userTwo.id}${userOne.id}`;
              const idFromTo = `${userOne.id}${userTwo.id}`;
              newData.push({
                idToFrom,
                idFromTo,
                from: userOne.id,
                to: userTwo.id,
              });
            }
          }
        }
        const dataTestFromTo = sortBy(newData, ["from", "to"]);
        const newDateThre = [];
        let i = 0;
        let maxWidth = 0;
        while (i < dataTestFromTo.length - 1) {
          let j = i + 1;
          let width = 1;
          const element = dataTestFromTo[i];
          const elementTwo = dataTestFromTo[j];
          while (
            dataTestFromTo[i].from == dataTestFromTo[j].from &&
            dataTestFromTo[i].to == dataTestFromTo[j].to
          ) {
            j += 1;
            width += 1;
          }
          i = j;
          newDateThre.push({ ...element, width });
          maxWidth = width > maxWidth ? width : maxWidth;
          //console.log(i, newDateThre);
        }

        //console.log(dataTestFromTo);
        // let widthData = {} //newData.length
        // for (let i = 0; i < 2000; i++) {
        //   const element = newData[i];
        //   const idToFrom = `${element.to}${element.from}`;
        //   const idFromTo = `${element.from}${element.to}`;
        //   if (widthData.get(`${idFromTo}`) || widthData.get(`${idToFrom}`)) {
        //     if (widthData.get(`${idFromTo}`)) {
        //       const newElem = widthData.get(`${idFromTo}`);
        //       widthData.set(idFromTo, { ...element, width: newElem.width + 1 });
        //     }

        //     if (widthData.get(`${idToFrom}`)) {
        //       const newElem = widthData.get(`${idToFrom}`);
        //       widthData.set(idToFrom, { ...element, width: newElem.width + 1 });
        //     }
        //   } else {
        //     widthData.set(idToFrom, { ...element, width: 1 });
        //   }
        //   console.log(widthData);
        // }
        console.log(maxWidth, newDateThre);

        fs.writeFile(
          "linksOfWidth.json",
          JSON.stringify(newDateThre),
          "utf8",
          () => {}
        );
        res.end(JSON.stringify(newDateThre));
      }
    }
  );
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
