import { useReducer } from "react";
import {
  API_HEADER,
  ACCEPT_POPULATION_TYPE,
  API_URL_GET_POPULATIONS,
} from "../configurations/apiConfigs";

export const ADD_PREFECTURE = "add prefecture from graph";
export const REMOVE_PREFECTURE = "remove prefecture from graph";

const initPopulation = [];

const populationReducer = async (state, action) => {
  switch (action.type) {
    case ADD_PREFECTURE:
      console.log(ADD_PREFECTURE + ", code = " + action.payload.code);
      const params = ["prefCode=" + fetchPref.prefCode];
      const url = API_URL_GET_POPULATIONS + "?" + params.join("&");
      try {
        const { data } = await axios(url, {
          headers: API_HEADER,
        });
        if (!data || !data.result)
          throw new Error("API連携エラーが発生しました");
      } catch (error) {}

      return;
    case REMOVE_PREFECTURE:
      console.log(REMOVE_PREFECTURE + ", code = " + action.payload.code);
      return;
    default:
      throw new Error();
  }
};

export const usePopulationReducer = useReducer(
  populationReducer,
  initPopulation
);
