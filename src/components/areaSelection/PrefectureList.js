import React, { useContext } from "react";
import { PrefecturesContext } from "../../contexts/prefecturesContext";
import { PopulationsContext } from "../../contexts/populationsContext";
import PrefectureItem from "./PrefectureItem";
import { Alert } from "react-bootstrap";
import "./prefectureList.scss";

export default function PrefectureList() {
  const { prefectures, isLoading, isError, togglePrefecture } = useContext(
    PrefecturesContext
  );
  const { isLoading: populationIsLoading } = useContext(PopulationsContext);

  return isError ? (
    <Alert variant={"danger"}>API連携エラーが発生しました</Alert>
  ) : isLoading ? (
    <Alert variant={"warning"}>API連携しています、しばらくお待ちください</Alert>
  ) : (
    <div className={"prefecture-list"}>
      {prefectures
        ? prefectures.map((prefecture, index) => (
            <PrefectureItem
              key={index}
              prefecture={prefecture}
              checkListener={(code) => togglePrefecture(code)}
              disable={populationIsLoading}
            />
          ))
        : ""}
    </div>
  );
}
