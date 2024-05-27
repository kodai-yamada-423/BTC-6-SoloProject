import axios from "axios";
//ポケモンの番号でDBを検索してデータを持ってくる
//DBに無ければその番号をポストで送りAPIから取得＆データ入手
export const getPokeData = async (num) => {
  try {
    const getData = await axios
      .get(`/api/pokemon/${String(num)}`)
      .then((res) => res.data);
    if (getData.length !== 0) {
      // console.log(getData);
      return getData[0];
    } else {
      const postData = await axios
        .post(`/api/pokemon`, { num: JSON.stringify(num) })
        .then((res) => res.data);
      // console.log(postData);
      return postData;
    }
  } catch (err) {
    console.log(err);
  }
};

//-------------------------------------------
//検索検索
export const searchPokeData = async (name) => {
  try {
    const getData = await axios
      .get(`/api/pokemon/search/${name}`)
      .then((res) => res.data);
    if (getData.length !== 0) {
      // console.log(getData);
      return getData[0];
    } else {
      const postData = await axios
        .post(`/api/pokemon/search`, { name: name })
        .then((res) => res.data);
      return postData;
    }
  } catch (err) {
    console.log(err);
  }
};
//----------------------------------------------
//捕まえたポケモンの登録
export const pokemonGet = async (name) => {
  try {
    const get = await axios
      .post(`/api/pokemon/get`, { name: name })
      .then((res) => res.data);
    return get;
  } catch (err) {
    console.log(err);
  }
};
//捕まえたポケモンの確認
export const pokemons = async () => {
  try {
    return await axios.get(`/api/pokemons`).then((res) => res.data);
  } catch (err) {
    console.log(err);
  }
};
//ポケモンとバイバイする
export const goodbay = async (name) => {
  try {
    await axios.delete(`/api/pokemon/get/${name}`);
  } catch (err) {
    console.log(err);
  }
};
