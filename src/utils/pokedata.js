import axios from "axios";

export const getPokeData = async (num) => {
  const getData = await axios
    .get(`/api/pokemon/${num}`)
    .then((res) => res.data);
  return getData[0];
};
