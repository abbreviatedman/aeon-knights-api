const csv = require("csvtojson");
const fs = require("fs");

const readJson = async () => {
  const cards = await csv().fromFile("./cards.csv");
  const cleanedCards = cards.slice(1).map((card) => {
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
  });

  const noDupes = cleanedCards.filter(
    (card, i) =>
      i === cleanedCards.length - 1 ||
      card.name !== cleanedCards[i + 1].name ||
      card.release !== cleanedCards[i + 1].release
  );

  fs.writeFile("./cards.json", JSON.stringify(noDupes, null, 2), (err) => {
    if (err) {
      console.log(err);
    }
  });

  fs.writeFile(
    "./physical-cards.json",
    JSON.stringify(cleanedCards, null, 2),
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
};

readJson();
