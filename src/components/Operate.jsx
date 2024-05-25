import { ButtonGroup, IconButton } from "@mui/joy";
import ArrowCircleLeftSharpIcon from "@mui/icons-material/ArrowCircleLeftSharp";
import CatchingPokemonSharpIcon from "@mui/icons-material/CatchingPokemonSharp";
import ArrowCircleRightSharpIcon from "@mui/icons-material/ArrowCircleRightSharp";
import { useState } from "react";
import { getPokeData } from "../utils/pokedata";

export default function Operate(props) {
  const { setPokemonData, setNum, num } = props;
  const nextPokemon = async () => {
    const addNum = Number(num) + 1;
    console.log(addNum);
    if (addNum < 152) {
      setNum(addNum);
      const pokeObj = await getPokeData(num);
      console.log(pokeObj, num);
      setPokemonData(pokeObj);
    }
  };

  const backPokemon = async () => {
    const numNum = Number(num);
    if (numNum > 0) {
      console.log(numNum);
      setNum(numNum - 1);
      const pokeObj = await getPokeData(num);
      console.log(pokeObj, num);
      setPokemonData(pokeObj);
    }
  };

  return (
    <>
      <div>
        <ButtonGroup color="success" size="lg" variant="solid">
          <IconButton onClick={() => backPokemon()}>
            <ArrowCircleLeftSharpIcon />
          </IconButton>
          <IconButton>
            <CatchingPokemonSharpIcon />
          </IconButton>
          <IconButton onClick={() => nextPokemon()}>
            <ArrowCircleRightSharpIcon />
          </IconButton>
        </ButtonGroup>
      </div>
    </>
  );
}
