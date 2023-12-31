import React, { useState, useContext } from "react";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import { GoldPointContext } from "./ScoreboardContext";

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

  //controlo o modo do jogo
  const { setGoldPoint, goldPoint } = useContext(GoldPointContext);

  const [teamA, setTeamA] = useState({ ...initialTeamState, name: "Team A" });
  const [teamB, setTeamB] = useState({ ...initialTeamState, name: "Team B" });
  const [modal, setModal] = useState(false);
  const [modalGameMode, setModalGameMode] = useState(false);

  //recebe o vencedor e exibi na tela
  const [alertWin, setAlertWin] = useState("");

  //controla os dois modais (Aviso de vencedor e escolha do game mode)
  const toggle = () => setModal(!modal);
  const toggleGameMode = () => setModalGameMode(!modalGameMode);

  //controla os gamers do jogo
  const handleGameClick = (team: Team) => {
    if (team.name === "Team A") {
      if (teamA.game === goldPoint) {
        setTeamA({ ...teamA, game: 0 });
      } else {
        setTeamA({ ...teamA, game: teamA.game + 1 });
      }
    } else {
      if (teamB.game === goldPoint) {
        setTeamB({ ...teamB, game: 0 });
      } else {
        setTeamB({ ...teamB, game: teamB.game + 1 });
      }
    }
  };

  //interações com btn
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

      if (team.game === goldPoint) {
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

  return (
    <div>
      <div className="scoreboard bg-container">
        {/* ScoreBoard */}
        <div className="flex scoreboard__col">
          {/* section team A */}
          <div className="scoreboard__container border-r border-[#001a064d]">
            <div className="team-name bg-[#1df500] text-black">
              {teamA.name}
            </div>

            {/* container dos pontos */}
            <div className="scoreboard__score">
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
            <div className="team-name bg-black text-white">{teamB.name}</div>

            {/* container dos pontos */}
            <div className="scoreboard__score ">
              <button
                className="p-2 w-14 h-12 bg-white/40 text-xl hover:border-none active:bg-[#1ef554] shadow-black shadow-sm"
                onClick={() => decrementScore(teamB)}
              >
                -
              </button>

              {/* pontos principais*/}
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
        </div>

        {/* modal show win*/}
        <Modal className="bg" isOpen={modal} toggle={toggle}>
          <ModalHeader className="text-4xl m-auto" toggle={toggle}>
            {alertWin}
          </ModalHeader>
          <Button onClick={toggle} className="bg-black w-36 m-auto mb-5">
            Jogar Novamente
          </Button>
        </Modal>

        {/* modal toggle game mode */}
        <Modal isOpen={modalGameMode} toggle={toggleGameMode}>
          <ModalHeader className="m-auto text-4xl">
            Escolha um modo de jogo
          </ModalHeader>
          <ModalBody>
            <div className="m-auto flex flex-col items-center">
              <div className="flex flex-col items-center">
                <p>Modo rápido, ganha quem fizer 3 gamers primeiro</p>
                <button
                  className="toggleGameModeBtn"
                  onClick={() => {
                    setGoldPoint(2);
                    toggleGameMode();
                  }}
                >
                  Melhor de 3
                </button>
              </div>
              <div className="flex flex-col items-center">
                <p>São necessários 5 gamers para vitória</p>
                <button
                  className="toggleGameModeBtn"
                  onClick={() => {
                    toggleGameMode();
                    setGoldPoint(4);
                  }}
                >
                  Melhor de 5
                </button>
              </div>
              <div className="flex flex-col items-center">
                <p>Modo de jogo oficial sem tie break</p>
                <button
                  className="toggleGameModeBtn"
                  onClick={() => {
                    setGoldPoint(6);
                    toggleGameMode();
                  }}
                >
                  Melhor de 7
                </button>
              </div>
            </div>
          </ModalBody>
          <Button
            onClick={toggleGameMode}
            className="bg-black w-36 m-auto mb-5"
          >
            Fechar
          </Button>
        </Modal>

        {/* botões para funcionalidades */}
        <div className="fixed bottom-0 left-0 w-[5rem] h-16">
          {/* btn reset */}
          <button
            className="rounded-none rounded-r-md flex items-center justify-center w-[5rem]  bg-white/30 hover:bg-green-500 hover:border-none"
            onClick={resetPoints}
          >
            Resetar Pontos
          </button>

          {/* btn escolhe modo */}
          <div className="fixed bottom-0 right-0 w-[5rem] h-16">
            <button
              className="rounded-none rounded-l-md flex items-center justify-center w-[5rem]  bg-white/30 hover:bg-green-500 hover:border-none"
              onClick={toggleGameMode}
            >
              Modo Jogo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
