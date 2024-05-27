import React, { useEffect, useState } from "react";
import Pokedata from "./Pokedata";
import Operate from "./Operate";
import Favorite from "./Favorite";
import axios from "axios";
import { getPokeData, pokemons } from "../utils/pokedata";
import Search from "./Search";
import "./Main.css";

export default function Main() {
  const [pokemonData, setPokemonData] = useState([]);
  const [num, setNum] = useState(null);
  const [list, setList] = useState([]);
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const getData = await getPokeData(1);
        console.log(getData);
        setPokemonData(getData);
        setNum(getData.num);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (num === null || isNaN(num)) {
          const getData = await getPokeData(1);
          setPokemonData(getData);
          setNum(getData.num);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [num]);

  useEffect(() => {
    (async () => {
      try {
        const pokeList = await pokemons();
        setList(pokeList);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [flag]);

  return (
    <>
      <div className="main1">
        <Search setPokemonData={setPokemonData} setNum={setNum}></Search>
        <Pokedata
          pokemonName={pokemonData.name}
          pokemonNum={pokemonData.num}
          pokemonType1={pokemonData.type1}
          pokemonType2={pokemonData.type2}
          pokemonText={pokemonData.text}
          pokemonImg={pokemonData.img}
        ></Pokedata>
        <div>
          <Operate
            setPokemonData={setPokemonData}
            setNum={setNum}
            num={num}
            pokemonName={pokemonData.name}
            setFlag={setFlag}
            flag={flag}
          ></Operate>
        </div>
      </div>
      <div className="main2">
        <Favorite
          setPokemonData={setPokemonData}
          setNum={setNum}
          list={list}
          setFlag={setFlag}
          flag={flag}
        ></Favorite>
      </div>
    </>
  );
}
