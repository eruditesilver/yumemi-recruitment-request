import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { PrefecturesProvider } from "./contexts/prefecturesContext";
import { PopulationsProvider } from "./contexts/populationsContext";
import Title from "./components/Title";
import PrefectureList from "./components/areaSelection/PrefectureList";
import PopulationGraph from "./components/PopulationGraph";

function App() {
  return (
    <div className="App">
      <Title />
      <PrefecturesProvider>
        <PopulationsProvider>
          <PrefectureList />
          <PopulationGraph />
        </PopulationsProvider>
      </PrefecturesProvider>
    </div>
  );
}

export default App;
