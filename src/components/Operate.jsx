import { ButtonGroup, IconButton, Stack } from "@mui/joy";
import ArrowCircleLeftSharpIcon from "@mui/icons-material/ArrowCircleLeftSharp";
import CatchingPokemonSharpIcon from "@mui/icons-material/CatchingPokemonSharp";
import ArrowCircleRightSharpIcon from "@mui/icons-material/ArrowCircleRightSharp";
import { useState } from "react";
import { getPokeData, pokemonGet } from "../utils/pokedata";

export default function Operate(props) {
  const { setPokemonData, setNum, num, pokemonName, setFlag, flag } = props;

  const nextPokemon = async () => {
    const addNum = Number(num) + 1;
    console.log(addNum);
    if (addNum < 152) {
      const pokeObj = await getPokeData(addNum);
      console.log(pokeObj, num);
      setPokemonData(pokeObj);
      setNum(addNum);
    }
  };

  const backPokemon = async () => {
    const numNum = Number(num) - 1;
    if (numNum > 0) {
      const pokeObj = await getPokeData(numNum);
      console.log(pokeObj, num);
      setPokemonData(pokeObj);
      setNum(numNum);
    }
  };

  return (
    <>
      <Stack alignItems="center">
        <ButtonGroup
          color="success"
          size="lg"
          variant="solid"
          className="btns"
          text-align="center"
        >
          <IconButton onClick={async () => await backPokemon()}>
            <ArrowCircleLeftSharpIcon />
          </IconButton>
          <IconButton
            onClick={async () => {
              await pokemonGet(pokemonName);
              flag === true ? setFlag(false) : setFlag(true);
            }}
          >
            <CatchingPokemonSharpIcon />
          </IconButton>
          <IconButton onClick={async () => await nextPokemon()}>
            <ArrowCircleRightSharpIcon />
          </IconButton>
        </ButtonGroup>
      </Stack>
    </>
  );
}
