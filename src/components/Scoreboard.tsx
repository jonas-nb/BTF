import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, Button } from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./../styles/global.css";
import "./../styles/scoreboard.css";

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
  const [modal, setModal] = useState(false);
  const [alertWin, setAlertWin] = useState("");

  const toggle = () => setModal(!modal);

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
        setModal(!modal);
        setAlertWin(`${team.name} Ganhou 🎉`);

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
                <div className="scoreboard__container border-r border-[#001a064d]">
                  <div className="team-name bg-[#1df500] text-black">
                    {teamA.name}
                  </div>

                  {/* container dos pontos */}
                  <div className="scoreborad__score">
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
                  <div className="scoreboard__game">
                    <div className="title">game</div>
                    <div
                      className="btn"
                      onClick={() => handleGameClick(teamA)}
                      style={{ cursor: "pointer" }}
                    >
                      {teamA.game}
                    </div>
                  </div>
                </div>

                {/* section team B */}
                <div className="scoreboard__container border-l border-[#001a064d]">
                  <div className="team-name bg-black text-white">
                    {teamB.name}
                  </div>

                  {/* container dos pontos */}
                  <div className="scoreborad__score ">
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
                  <div className="scoreboard__game">
                    <div className="title">game</div>
                    <div
                      className="btn"
                      onClick={() => handleGameClick(teamB)}
                      style={{ cursor: "pointer" }}
                    >
                      {teamB.game}
                    </div>
                  </div>
                </div>
                {/* modal */}
                <div>
                  <Modal className="bg" isOpen={modal} toggle={toggle}>
                    <ModalHeader className="text-4xl m-auto" toggle={toggle}>
                      {alertWin}
                    </ModalHeader>
                    <Button
                      onClick={toggle}
                      className="bg-black w-36 m-auto mb-5"
                    >
                      Jogar Novamente
                    </Button>
                  </Modal>
                </div>
              </div>

              <div className="fixed bottom-0 left-0 w-[5rem] h-16">
                <button
                  className="rounded-none rounded-r-md flex items-center justify-center w-[5rem]  bg-white/30 hover:bg-green-500 hover:border-none"
                  onClick={resetPoints}
                >
                  Resetar Pontos
                </button>
                <div className="fixed bottom-0 right-0 w-[5rem] h-16">
                  <button
                    className="rounded-none rounded-l-md flex items-center justify-center w-[5rem]  bg-white/30 hover:bg-green-500 hover:border-none"
                    onClick={resetPoints}
                  >
                    Modo Jogo
                  </button>
                </div>
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
