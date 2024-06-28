const csv = require("csvtojson");
const fs = require("fs");

const readJson = async () => {
  const cards = await csv().fromFile("./cards.csv");
  const json = JSON.stringify(
    cards.map((card) => {
      const newCard = {
        ...card,
        value: Number(card.value),
        release: Number(card.release),
      };

      for (const key of ["boxCode", "cardNum", "box"]) {
        delete newCard[key];
      }

      for (const key of [
        "shield",
        "boost",
        "overheat",
        "backLabel",
        "evolve",
        "story_mechanic",
        "modify",
        "tier",
        "deck",
      ]) {
        if (newCard[key] === "") {
          delete newCard[key];
        }
      }

      return newCard;
    }),

    null,
    2
  );

  fs.writeFile("./cards.json", JSON.stringify(json, null, 2), (err) => {
    if (err) {
      console.log(err);

      return;
    }

    console.log("Success!");
  });
};

readJson();
