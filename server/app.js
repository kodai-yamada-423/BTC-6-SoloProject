const express = require("express");
const app = express();
const knex = require("./knex");
const cors = require("cors");
const axios = require("axios");

//----------------------------------
//DBにまだ無いポケモンのデータを入れる
const insertPokemon = async (data) => {
  await knex("pokedata").insert(data);
};
//----------------------------------
//ポケモンの名前を日本語で取得
const getPokemonName = (data) => {
  return data.names.find((name) => name.language.name === "ja").name;
};
//---------------------------------
//ポケモンのタイプをURLで取得
const getTypeUrl = (data) => {
  const typesUrl = data.map((v) => {
    const typeUrl = v.type.url;
    return typeUrl;
  });
  return typesUrl;
};
//---------------------------------
//ポケモンのタイプを日本語で取得
const loadPokemonType = async (data) => {
  let _pokemonType = await Promise.all(
    data.map(async (pokemon) => {
      let pokemonTypeDetail = await getPokemonType(pokemon);
      let jaName = pokemonTypeDetail.names.find(
        (name) => name.language.name === "ja"
      ).name;
      return jaName;
    })
  );
  return _pokemonType;
};
//---------------------------------
//ポケモンの説明を日本語で取得
const getPokemonText = (data) => {
  return data.flavor_text_entries.find((obj) => obj.language.name === "ja")
    .flavor_text;
};
//---------------------------------
//ポケモンの番号を取得
const getPokemonNo = (data) => {
  return String(data.id);
};
//---------------------------------
//タイプのURLからさらに奥へ
const getPokemonType = (url) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};
//---------------------------------

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/", express.static(__dirname + "/frontend/dist"));

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

//----------------------------------
//データベースから番号にあうポケモンのデータを送るゲットエンドポイント
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
//-----------------------------------
//データべースにポケモンのデータが無い時にAPIから引っ張ってきて送った上に
//データベースに保存するポストのエンドポイント
//ここしんどかった
app.post("/api/pokemon", async (req, res) => {
  try {
    const num = req.body.num;
    console.log(num);
    const pokeApi = `https://pokeapi.co/api/v2/pokemon-species/${num}/`;
    const typeApi = `https://pokeapi.co/api/v2/pokemon/${num}`;
    const pokeData = await axios.get(pokeApi).then((res) => res.data);
    const typeData = await axios.get(typeApi).then((res) => res.data.types);
    const types = await loadPokemonType(getTypeUrl(typeData));

    let pokeDex = {};

    const src = await axios.get(typeApi).then((res) => res.data);

    if (types.length === 2) {
      pokeDex = {
        name: getPokemonName(pokeData),
        num: getPokemonNo(pokeData),
        type1: types[0],
        type2: types[1],
        text: getPokemonText(pokeData),
        img: src.sprites.versions["generation-v"]["black-white"].animated
          .front_default,
        icon: src.sprites.versions["generation-viii"].icons.front_default,
      };
    } else {
      pokeDex = {
        name: getPokemonName(pokeData),
        num: getPokemonNo(pokeData),
        type1: types[0],
        text: getPokemonText(pokeData),
        img: src.sprites.versions["generation-v"]["black-white"].animated
          .front_default,
        icon: src.sprites.versions["generation-viii"].icons.front_default,
      };
    }

    await insertPokemon(pokeDex);
    res.status(200).send(pokeDex);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});
//--------------------------------------------------
//DBから名前に合うポケモンのデータが欲しいって言われた
app.get("/api/pokemon/search/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const pokemonData = await knex("pokedata").where({ name: name });
    res.send(pokemonData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});
//---------------------------------------------------
//日本名でポケモンの情報APIを探して色々やるポスト
//日本のゲームなのになんで日本語検索が深い所にあるんだよ！！！！！！！！うああああああああああああ
app.post("/api/pokemon/search", async (req, res) => {
  try {
    const name = req.body.name;
    console.log(name);
    const pokeApi = `https://pokeapi.co/api/v2/pokemon-species?limit=151`;
    const response = await axios.get(pokeApi);
    const pokesUrl = response.data.results;

    const pokesUrlArray = pokesUrl.map((data) => data.url);

    const pokeNames = await Promise.all(
      pokesUrlArray.map(async (url) => {
        const res = await axios.get(url);
        const names = res.data.names;
        const jpName = names.find((nameObj) => nameObj.language.name === "ja");
        return { url, name: jpName.name };
      })
    );

    const matchedPokemon = pokeNames.find((pokemon) => pokemon.name === name);

    if (matchedPokemon) {
      const pokemonDetail = await axios
        .get(matchedPokemon.url)
        .then((res) => res.data);
      const num = getPokemonNo(pokemonDetail);
      const typeApi = `https://pokeapi.co/api/v2/pokemon/${num}`;
      const typeData = await axios.get(typeApi).then((res) => res.data.types);
      const types = await loadPokemonType(getTypeUrl(typeData));

      const src = await axios.get(typeApi).then((res) => res.data);

      let pokeDex = {};

      if (types.length === 2) {
        pokeDex = {
          name: getPokemonName(pokemonDetail),
          num: num,
          type1: types[0],
          type2: types[1],
          text: getPokemonText(pokemonDetail),
          img: src.sprites.versions["generation-v"]["black-white"].animated
            .front_default,
          icon: src.sprites.versions["generation-viii"].icons.front_default,
        };
      } else {
        pokeDex = {
          name: getPokemonName(pokemonDetail),
          num: getPokemonNo(pokemonDetail),
          type1: types[0],
          text: getPokemonText(pokemonDetail),
          img: src.sprites.versions["generation-v"]["black-white"].animated
            .front_default,
          icon: src.sprites.versions["generation-viii"].icons.front_default,
        };
      }
      // console.log(pokeDex);
      await insertPokemon(pokeDex);
      res.status(200).send(pokeDex);
    } else {
      res.send("未発見");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

//------------------------------------------------
//ポケモンゲットだぜ
app.post("/api/pokemon/get", async (req, res) => {
  try {
    const name = req.body.name;
    console.log(name);
    const pokedata = await knex("pokedata").where({ name }).first();
    console.log(pokedata);
    await knex("favorite").insert({
      pokedata_id: pokedata.id,
    });

    res.status(200).json({ message: `${name} ゲットだぜ！` });
  } catch (error) {
    console.log(error);
  }
});
//--------------------------------------------------
//捕まえたポケモンをみたい
app.get("/api/pokemons", async (req, res) => {
  try {
    const allPokemonData = await knex("favorite")
      .join("pokedata", "favorite.pokedata_id", "=", "pokedata.id")
      .select("name", "icon");
    console.log(allPokemonData);
    res.status(200).send(allPokemonData);
  } catch (err) {
    console.log(err);
  }
});
//---------------------------------------------
//ポケモンを逃がす
app.delete("/api/pokemon/get/:name", async (req, res) => {
  const name = req.params.name;
  try {
    const pokemonData = await knex("pokedata").where({ name: name });
    const id = pokemonData[0].id;

    console.log(id, name, pokemonData);
    await knex("favorite").where({ pokedata_id: id }).del();
    res.status(200).send(`バイバイ${name}`);
  } catch (error) {
    console.error(error);
  }
});

// 確認用のエンドポイント
app.get("/api/test", (req, res) => {
  console.log("Test endpoint hit");
  res.status(200).send("Server is working");
});
module.exports = app;
app.listen(PORT, () => console.log(`listening on port : ${PORT}`));
