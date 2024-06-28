const csv = require("csvtojson");
const fs = require("fs");

const readJson = async () => {
  const cards = await csv().fromFile("./cards.csv");
  const json = JSON.stringify(
    cards.slice(1).map((card) => {
      const newCard = {
        ...card,
        value: Number(card.value),
        release: Number(card.release),
      };

      for (const key of ["boxCode", "cardNum", "box"]) {
        delete newCard[key];
      }

      for (const key of Object.keys(card)) {
        if (newCard[key] === "") {
          delete newCard[key];
        }
      }

      return newCard;
    }),

    null,
    2
  );

  fs.writeFile("./cards.json", json, (err) => {
    if (err) {
      console.log(err);

      return;
    }

    console.log("Success!");
  });
};

readJson();
