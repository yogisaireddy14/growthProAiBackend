const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const headlines = [
  "Why {name} is {location}'s Sweetest Spot in 2025",
  "Discover the Secret Behind {name}'s Success in {location}",
  "{name} Takes {location} by Storm with Their Amazing Services",
  "Why Everyone in {location} Loves {name}",
  "{name}: Your Go-To Choice in {location} This Year"
];

app.post("/business-data", (req, res) => {
  const { name, location } = req.body;
  const headline = headlines[0].replace("{name}", name).replace("{location}", location);
  res.json({ rating: 4.3, reviews: 127, headline });
});

app.get("/regenerate-headline", (req, res) => {
  const { name, location } = req.query;
  const randomHeadline = headlines[Math.floor(Math.random() * headlines.length)];
  res.json({ headline: randomHeadline.replace("{name}", name).replace("{location}", location) });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
