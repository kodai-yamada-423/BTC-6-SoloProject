import styled from "styled-components";
import "./Pokedata.css";

export default function Pokedata(props) {
  const {
    pokemonName,
    pokemonNum,
    pokemonType1,
    pokemonType2,
    pokemonText,
    pokemonImg,
  } = props;

  const Space = styled.span`
    margin-right: 20px;
  `;

  return (
    <>
      <div>
        <h3>
          <Space>No.{pokemonNum}</Space>
          {pokemonName}
        </h3>
      </div>
      <div style={{ maxHeight: "200px" }}>
        <img src={pokemonImg} alt="" className="img" />
      </div>
      <div>
        <div>
          <p>{pokemonType1}</p>
        </div>
        <div>{pokemonType2 ? <p>{pokemonType2}</p> : <Space></Space>}</div>
        <div>
          <p>{pokemonText}</p>
        </div>
      </div>
    </>
  );
}
