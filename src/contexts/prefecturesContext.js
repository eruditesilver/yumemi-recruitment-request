import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

import { API_HEADER } from "../configurations/apiConfigs";

const apiUrl = "https://opendata.resas-portal.go.jp/api/v1/prefectures";

export const PrefecturesContext = createContext();

export function PrefecturesProvider({ children }) {
  const [prefectures, setPrefectures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedPrefectures, setSelectedPrefectures] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios(apiUrl, {
        headers: API_HEADER,
      });
      if (!data || !data.result) throw new Error();
      setPrefectures(data.result);
      setIsLoading(false);
    } catch (e) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const togglePrefecture = (code) => {
    const filteredPrefectureList = selectedPrefectures.filter(
      (prefecture) => prefecture.prefCode !== code
    );
    const prefectureIsExists =
      filteredPrefectureList.length !== selectedPrefectures.length;
    if (prefectureIsExists) {
      setSelectedPrefectures(filteredPrefectureList);
    } else {
      setSelectedPrefectures([
        ...selectedPrefectures,
        prefectures.filter((prefecture) => prefecture.prefCode === code)[0],
      ]);
    }
  };

  return (
    <PrefecturesContext.Provider
      value={{
        prefectures,
        isLoading,
        isError,
        togglePrefecture,
        selectedPrefectures,
      }}
    >
      {children}
    </PrefecturesContext.Provider>
  );
}
