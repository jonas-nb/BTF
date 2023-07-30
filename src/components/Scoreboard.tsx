import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import "./../styles/scoreboardStyled.css";

const Scoreboard: React.FC = () => {
  interface Team {
    name: string;
    score: number;
    game: number;
  }

  //Objeto para inicializar os states
  const initialTeamState = {
    name: "Team",
    score: 0,
    game: 0,
  };

  const [teamA, setTeamA] = useState({ ...initialTeamState, name: "Team A" });
  const [teamB, setTeamB] = useState({ ...initialTeamState, name: "Team B" });
  //const [modal, setModal] = useState(false);

  // const toggle = () => setModal(!modal); fazer o toogle

  const handleGameClick = (team: Team) => {
    if (team.name === "Team A") {
      if (teamA.game === 6) {
        setTeamA({ ...teamA, game: 0 });
      } else {
        setTeamA({ ...teamA, game: teamA.game + 1 });
      }
    } else {
      if (teamB.game === 6) {
        setTeamB({ ...teamB, game: 0 });
      } else {
        setTeamB({ ...teamB, game: teamB.game + 1 });
      }
    }
  };

  const incrementScore = (team: Team) => {
    if (team.score === 0) {
      team.score = 15;
    } else if (team.score === 15) {
      team.score = 30;
    } else if (team.score === 30) {
      team.score = 40;
    } else if (team.score === 40) {
      // If a team reaches 40 points and wins the game
      setTeamA({ ...teamA, score: 0 });
      setTeamB({ ...teamB, score: 0 });

      if (team.game === 6) {
        // Game over, team won
       // setModal(!modal);
        //setAlertWin(`${team.name} Ganhou 🎉`);

        // Reset the score for both teams
        setTeamA({ ...initialTeamState, name: "Team A" });
        setTeamB({ ...initialTeamState, name: "Team B" });
        return;
      }
      team.score = 0;
      team.game++;
    }

    updateTeam(team);
  };

  const decrementScore = (team: Team) => {
    if (team.score === 0) {
      return; // No negative points
    } else if (team.score === 15) {
      team.score = 0;
    } else if (team.score === 30) {
      team.score = 15;
    } else if (team.score === 40) {
      team.score = 30;
    }

    updateTeam(team);
  };

  const resetPoints = () => {
    setTeamA({ ...initialTeamState, name: "Team A" });
    setTeamB({ ...initialTeamState, name: "Team B" });
  };

  const updateTeam = (team: Team) => {
    if (team.name === "Team A") {
      setTeamA({ ...team });
    } else {
      setTeamB({ ...team });
    }
  };

  const [isLandscape, setIsLandscape] = useState(
    window.innerWidth > window.innerHeight
  );

  useEffect(() => {
    const handleOrientationChange = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    window.addEventListener("resize", handleOrientationChange);

    return () => {
      window.removeEventListener("resize", handleOrientationChange);
    };
  }, []);

  return (
    <div>
      <div>
        {isLandscape ? (
          // Conteúdo da página em modo paisagem
          <div>
            <div className="scoreboard bg-container">
              <div className="flex">
                {/* section team A */}
                <div className="score-container">
                  <div className="name bg-[#08b324]">{teamA.name}</div>

                  {/* container dos pontos */}
                  <div className="score-main ">
                    <button
                      className="p-2 w-14 h-12 bg-white/40 text-xl hover:border-none active:bg-[#1ef554] shadow-black shadow-sm"
                      onClick={() => decrementScore(teamA)}
                    >
                      -
                    </button>
                    <div className="score">{teamA.score}</div>
                    <button
                      className="p-2 w-14 h-12 bg-white/40 text-xl hover:border-none active:bg-[#1ef554] shadow-black shadow-sm"
                      onClick={() => incrementScore(teamA)}
                    >
                      +
                    </button>
                  </div>

                  {/* controle do game */}
                  <div className="uppercase text-[#000] text-xl">game</div>
                  <div
                    className="game"
                    onClick={() => handleGameClick(teamA)}
                    style={{ cursor: "pointer" }}
                  >
                    {teamA.game}
                  </div>
                </div>
                {/* section team B */}
                <div className="score-container">
                  <div className="name bg-black text-[rgb(182,255,180)]">
                    {teamB.name}
                  </div>

                  {/* container dos pontos */}
                  <div className="score-main">
                    <button
                      className="p-2 w-14 h-12 bg-white/40 text-xl hover:border-none active:bg-[#1ef554] shadow-black shadow-sm"
                      onClick={() => decrementScore(teamB)}
                    >
                      -
                    </button>
                    <div className="score">{teamB.score}</div>
                    <button
                      className="p-2 w-14 h-12 bg-white/40 text-xl hover:border-none active:bg-[#1ef554] shadow-black shadow-sm"
                      onClick={() => incrementScore(teamB)}
                    >
                      +
                    </button>
                  </div>

                  {/* controle do game */}
                  <div className="uppercase text-[#000] text-xl">game</div>
                  <div
                    className="game"
                    onClick={() => handleGameClick(teamB)}
                    style={{ cursor: "pointer" }}
                  >
                    {teamB.game}
                  </div>
                </div>
              </div>

              <div className="fixed top-0 w-full ">
                <button
                  className="reset-button w-[8rem] bg-white/10"
                  onClick={resetPoints}
                >
                  Resetar Pontuação
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Mensagem para girar o dispositivo para o modo paisagem
          <div>
            <h1>Por favor, vire seu dispositivo para o modo paisagem.</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scoreboard;
