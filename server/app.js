const express = require("express");
const app = express();
const knex = require("./knex");
const cors = require("cors");

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//確認用
app.get("/api", (req, res) => {
  res.send("Hallow World");
});

// app.get("/api/pokemon", (req, res) => {
//   knex("pokedata")
//     .columnInfo()
//     .then((result) => {
//       console.log(result);
//       res.send(result);
//     });
// });

app.get("/api/pokemon/:id", async (req, res) => {
  try {
    const Num = req.params.id;
    const pokemonData = await knex("pokedata").where({ num: Num });
    res.send(pokemonData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => console.log(`listening on port : ${PORT}`));
