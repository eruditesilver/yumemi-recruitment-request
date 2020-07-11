import React, { useContext } from "react";
import { PopulationsContext } from "../contexts/populationsContext";
import { PrefecturesContext } from "../contexts/prefecturesContext";
import { Alert } from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./populationGraph.scss";

const lineColor = [];

function generateRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  lineColor.push(color);
}

export default function PopulationGraph() {
  const { populations, isLoading, isError } = useContext(PopulationsContext);
  const { selectedPrefectures } = useContext(PrefecturesContext);
  // console.log(populations);
  return isError ? (
    <Alert variant={"danger"}>API連携エラーが発生しました</Alert>
  ) : isLoading ? (
    <Alert variant={"warning"}>API連携しています、しばらくお待ちください</Alert>
  ) : (
    <div className={"populations-chart"}>
      {selectedPrefectures.length === 0 ? (
        <Alert variant={"warning"}>都道府県選んでください</Alert>
      ) : (
        <LineChart
          width={1200}
          height={600}
          data={populations}
          margin={{
            top: 50,
            right: 50,
            left: 50,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            label={{ value: "年度", position: "right", offset: 30 }}
          />
          <YAxis
            padding={{ left: 20, bottom: 20 }}
            label={{ value: "人口数", position: "top", offset: 20 }}
          />
          <Tooltip />
          <Legend
            align="right"
            verticalAlign="middle"
            layout="vertical"
            margin={{ left: 50 }}
            width={100}
          />
          {selectedPrefectures.map((selectedPrefecture, index) => {
            generateRandomColor();
            return (
              <Line
                key={index}
                type="monotone"
                dataKey={selectedPrefecture.prefName}
                stroke={lineColor[index]}
                activeDot={{ r: 8 }}
              />
            );
          })}
        </LineChart>
      )}
    </div>
  );
}
