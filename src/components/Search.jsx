import { useState } from "react";
import { searchPokeData } from "../utils/pokedata";

export default function Search(props) {
  const { setPokemonData, setNum } = props;
  const [searchTerm, setSearchTerm] = useState("");

  const searchPokemon = async (name) => {
    try {
      const pokeObj = await searchPokeData(name);
      console.log(pokeObj);
      setPokemonData(pokeObj);
      setNum(pokeObj.num);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await searchPokemon(searchTerm);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            name="search"
            placeholder="キーワードを入力"
            value={searchTerm}
            onChange={handleChange}
          />
          <input type="submit" name="submit" value="検索" />
        </form>
      </div>
    </>
  );
}
