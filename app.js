const axios = require("axios");
const prompt = require("prompt-sync")({ sigint: true });

const getSummary = async () => {
  const title = prompt(" What is the subject you want to summarize ? ");
  const subject = title.replace(/\s/g, "+");
  const { data } = await axios.get(
    `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=&explaintext=&titles=${subject}&format=json`
  );
  const id = Object.keys(data.query.pages)[0];
  console.log(data.query.pages[id].extract || "No summary found");
};
const main = async () => {
  await getSummary();
  while (true) {
    const answer = prompt("Do you want to continue ? (y/n)");
    if (answer === "y") {
      await getSummary();
    } else {
      break;
    }
  }
};
main();
