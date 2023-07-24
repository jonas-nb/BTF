import React from "react";
import Scoreboard from "./components/Scoreboard";
import "./components/style.css";
type Props = {};

const App = (props: Props) => {
  return (
    <div className="app">
      <Scoreboard />
    </div>
  );
};

export default App;
