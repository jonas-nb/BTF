import React, { useState } from "react";
import "./style.css";

interface Team {
  name: string;
  score: number;
  sets: number;
}

const Scoreboard: React.FC = () => {
  const [teamA, setTeamA] = useState<Team>({
    name: "Time A",
    score: 0,
    sets: 0,
  });

  const [teamB, setTeamB] = useState<Team>({
    name: "Time B",
    score: 0,
    sets: 0,
  });

  const incrementScore = (team: Team) => {
    if (team.score < 40) {
      setPoints(team, 15);
    } else if (team.score === 40) {
      setPoints(team, 0);
      setSets(team);
    }
  };

  const decrementScore = (team: Team) => {
    if (team.score > 0) {
      setPoints(team, -15);
    }
  };

  const resetSets = () => {
    resetPoints();
    setTeamA({ ...teamA, sets: 0 });
    setTeamB({ ...teamB, sets: 0 });
  };

  const setPoints = (team: Team, points: number) => {
    team.score += points;
    if (team.score === 45) {
      team.score = 40;
    }
    updateTeam(team);
  };

  const setSets = (team: Team) => {
    team.sets += 1;
    if (team.sets === 3) {
      alert(`${team.name} venceu o jogo!`);
      resetScores();
    } else {
      alert(`Set vencido por ${team.name}!`);
      resetPoints();
    }
  };

  const resetPoints = () => {
    setTeamA({ ...teamA, score: 0 });
    setTeamB({ ...teamB, score: 0 });
  };

  const resetScores = () => {
    setTeamA({ ...teamA, sets: 0 });
    setTeamB({ ...teamB, sets: 0 });
  };

  const updateTeam = (team: Team) => {
    if (team.name === "Time A") {
      setTeamA({ ...team });
    } else {
      setTeamB({ ...team });
    }
  };

  return (
    <div className="scoreboard ">
      <div className="team-container w-full h-screen sm:flex-row  flex-col md:flex-col">
        <div className="w-full h-full sm:h-screen  bg-black text-white flex flex-col items-center justify-around">
          <div className="team-name text-3xl sm:self-end md:self-center sm:pr-5 md:pr-0">
            {teamA.name}
          </div>
          <div className="team-score">{teamA.score}</div>
          <div className="team-sets">Sets: {teamA.sets}</div>
          <div className="btn-center">
            <button
              className="bg-white/10 text-3xl"
              onClick={() => incrementScore(teamA)}
            >
              +1
            </button>

            <button
              className="bg-white/10 text-3xl"
              onClick={() => decrementScore(teamA)}
            >
              -1
            </button>
          </div>
        </div>
        <div className="w-full h-full sm:h-screen  bg-green-400 text-black flex flex-col items-center justify-around">
          <div className="team-name sm:self-start md:self-center sm:pl-5 md:pl-0 text-3xl">
            {teamB.name}
          </div>
          <div className="team-score">{teamB.score}</div>
          <div className="team-sets">Sets: {teamB.sets}</div>
          <div className="btn-center">
            <button
              className="bg-white/40 text-3xl"
              onClick={() => incrementScore(teamB)}
            >
              +1
            </button>

            <button
              className="bg-white/40 text-3xl"
              onClick={() => decrementScore(teamB)}
            >
              -1
            </button>
          </div>
        </div>
      </div>

      <div className="fixed top-0 w-full flex justify-between">
        <button
          className="reset-button w-[8rem] bg-white/10"
          onClick={resetPoints}
        >
          Resetar Pontuação
        </button>
        <button
          className="reset-sets-button w-[8rem] bg-white/10 sm:bg-black/20"
          onClick={resetSets}
        >
          Resetar Sets
        </button>
      </div>
    </div>
  );
};

export default Scoreboard;
