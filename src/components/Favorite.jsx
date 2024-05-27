import { useEffect, useState } from "react";
import { pokemons, goodbay, searchPokeData } from "../utils/pokedata";
import "./Favorite.css";

export default function Favorite(props) {
  const { setPokemonData, setNum, list, setFlag, flag } = props;

  const searchPokemon = async (name) => {
    try {
      const pokeObj = await searchPokeData(name);
      setPokemonData(pokeObj);
      setNum(pokeObj.num);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <h2>捕まえたポケモン</h2>
        <div>
          <ul>
            {list.map((pokemon, index) => (
              <li key={index}>
                <img src={pokemon.icon} alt="" />
                <p
                  onClick={() => searchPokemon(pokemon.name)}
                  className="pokemon-get"
                >
                  {pokemon.name}
                </p>
                <button
                  onClick={async () => {
                    await goodbay(pokemon.name);
                    flag === true ? setFlag(false) : setFlag(true);
                  }}
                >
                  逃がす
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
