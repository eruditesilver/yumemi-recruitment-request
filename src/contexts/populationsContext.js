import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { PrefecturesContext } from "./prefecturesContext";

import {
  API_HEADER,
  API_URL_GET_POPULATIONS,
  ACCEPT_POPULATION_TYPE,
} from "../configurations/apiConfigs";
export const PopulationsContext = createContext();

export function PopulationsProvider({ children }) {
  const [populations, setPopulations] = useState([]);
  const [populationFetchedCount, setPopulationFetchedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { selectedPrefectures } = useContext(PrefecturesContext);

  const updatePopulations = async () => {
    try {
      setIsLoading(true);
      const lengthDiff = populationFetchedCount - selectedPrefectures.length;
      const requireNewFetching = lengthDiff <= 0;
      const fetchPref = selectedPrefectures[selectedPrefectures.length - 1];
      const prefectureName = fetchPref.prefName;
      const currentPopulations = populations;

      if (requireNewFetching) {
        const params = ["prefCode=" + fetchPref.prefCode];
        const url = API_URL_GET_POPULATIONS + "?" + params.join("&");
        const { data } = await axios(url, {
          headers: API_HEADER,
        });

        if (!data || !data.result) throw new Error();
        const populationWithAcceptType = data.result.data.filter(
          (populationsWithLabel) =>
            populationsWithLabel.label === ACCEPT_POPULATION_TYPE
        )[0];

        const fetchedPopulations = populationWithAcceptType.data;
        if (currentPopulations.length === 0) {
          let populationsInitial = [];

          for (let i = 0; i < fetchedPopulations.length; i++) {
            const population = fetchedPopulations[i];
            const graphNodeObject = {};
            graphNodeObject["year"] = population.year;
            graphNodeObject[prefectureName] = population.value;
            populationsInitial.push(graphNodeObject);
          }
          setPopulations(populationsInitial);
        } else {
          let newPopulationList = [];
          for (let i = 0; i < currentPopulations.length; i++) {
            const population = currentPopulations[i];
            const fetchedPopulationInThisYear = fetchedPopulations.filter(
              (fetchedPopulation) => fetchedPopulation.year === population.year
            )[0];
            population[prefectureName] = fetchedPopulationInThisYear.value;
            newPopulationList.push(population);
          }
          setPopulations(newPopulationList);
        }
        setPopulationFetchedCount(populationFetchedCount + 1);
      } else {
        setPopulationFetchedCount(populationFetchedCount - 1);
        if (selectedPrefectures.length === 0) {
          setPopulations([]);
          return;
        }

        let updatedPopulationList = [];
        for (let i = 0; i < currentPopulations.length; i++) {
          const population = currentPopulations[i];
          const graphNodeObject = {};
          graphNodeObject["year"] = population.year;
          for (let j = 0; j < selectedPrefectures.length; j++) {
            const prefectureName = selectedPrefectures[j].prefName;
            graphNodeObject[prefectureName] = population[prefectureName];
          }
          updatedPopulationList.push(graphNodeObject);
        }
        console.log(updatedPopulationList);
        setPopulations(updatedPopulationList);
      }
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedPrefectures || selectedPrefectures.length === 0) return;
    updatePopulations();
  }, [selectedPrefectures]);

  return (
    <PopulationsContext.Provider value={{ populations, isLoading, isError }}>
      {children}
    </PopulationsContext.Provider>
  );
}
