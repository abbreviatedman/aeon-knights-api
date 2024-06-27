const csv = require("csvtojson");
const fs = require("fs");

const readJson = async () => {
  const json = await csv().fromFile("./cards.csv");
  fs.writeFile("./cards.json", JSON.stringify(json, null, 2), (err) => {
    if (err) {
      console.log(err);

      return;
    }

    console.log("Success!");
  });
};

readJson();
