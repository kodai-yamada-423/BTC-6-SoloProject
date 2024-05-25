import React, { useEffect, useState } from "react";
import Pokedata from "./Pokedata";
import Operate from "./Operate";
import Favorite from "./Favorite";
import axios from "axios";

export default function Main() {
  const [pokemonData, setPokemonData] = useState([]);
  const [num, setNum] = useState(null);

  useEffect(() => {
    (async () => {
      const getData = await axios.get("/api/pokemon/1").then((res) => res.data);
      console.log(getData[0]);
      setPokemonData(getData[0]);
      setNum(getData[0].num);
    })();
  }, []);

  return (
    <>
      <div>
        <Pokedata
          pokemonName={pokemonData.name}
          pokemonNum={pokemonData.num}
          pokemonType1={pokemonData.type1}
          pokemonType2={pokemonData.type2}
          pokemonText={pokemonData.text}
        ></Pokedata>
        <Operate
          setPokemonData={setPokemonData}
          setNum={setNum}
          num={num}
        ></Operate>
        <Favorite></Favorite>
      </div>
    </>
  );
}
