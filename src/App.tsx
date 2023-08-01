import Scoreboard from "./components/Scoreboard";
import "./styles/global.css";
import { GoldPointProvider } from "./components/ScoreboardContext";
const App = () => {
  return (
    <div className="app">
      <GoldPointProvider>
        <Scoreboard />
      </GoldPointProvider>
    </div>
  );
};

export default App;
