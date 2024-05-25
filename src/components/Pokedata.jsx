import styled from "styled-components";
import Search from "./Search";

export default function Pokedata(props) {
  const { pokemonName, pokemonNum, pokemonType1, pokemonType2, pokemonText } =
    props;

  const Space = styled.span`
    margin-right: 20px;
  `;

  return (
    <>
      <div>
        <Search></Search>
        <div>
          <h3>
            <Space>No.{pokemonNum}</Space>
            {pokemonName}
          </h3>
        </div>
        <div>
          <img src="" alt="" />
        </div>
        <div>
          <div>
            <p>{pokemonType1}</p>
          </div>
          <div>
            <p>{pokemonType2}</p>
          </div>
          <div>
            <p>{pokemonText}</p>
          </div>
        </div>
      </div>
    </>
  );
}
