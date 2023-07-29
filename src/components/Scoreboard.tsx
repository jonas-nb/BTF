import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

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
      /* setTeamA({...teamA, score: 0 });
      setTeamB({...teamB, score: 0 }); */
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

  return (
    <div className="scoreboard">
      <div className="team-container w-full h-screen sm:flex-row  flex-col md:flex-col">
        {/* section team A */}
        <div className="w-full h-full sm:h-screen  bg-black text-white flex flex-col items-center justify-around">
          <div className="team-name text-3xl sm:self-end md:self-center sm:pr-5 md:pr-0">
            {teamA.name}
          </div>
          <div className="team-score">{teamA.score}</div>
          <div
            className="team-game"
            onClick={() => handleGameClick(teamA)}
            style={{ cursor: "pointer" }}
          >
            game: {teamA.game}
          </div>
          <div className="btn-center">
            <button
              className="bg-white/10 text-3xl"
              onClick={() => decrementScore(teamA)}
            >
              -1
            </button>
            <button
              className="bg-white/10 text-3xl"
              onClick={() => incrementScore(teamA)}
            >
              +1
            </button>
          </div>
        </div>

        {/* section team B */}
        <div className="w-full h-full sm:h-screen  bg-green-400 text-black flex flex-col items-center justify-around">
          <div className="team-name sm:self-start md:self-center sm:pl-5 md:pl-0 text-3xl">
            {teamB.name}
          </div>
          <div className="team-score">{teamB.score}</div>
          <div
            className="team-game"
            onClick={() => handleGameClick(teamB)}
            style={{ cursor: "pointer" }}
          >
            game: {teamB.game}
          </div>
          <div className="btn-center">
            <button
              className="bg-white/40 text-3xl"
              onClick={() => decrementScore(teamB)}
            >
              -1
            </button>
            <button
              className="bg-white/40 text-3xl"
              onClick={() => incrementScore(teamB)}
            >
              +1
            </button>
          </div>

          {/* modal que mostra quando o jogador ganhour */}
          <Modal isOpen={modal}>
            <ModalBody className="text-6xl text-center">{alertWin}</ModalBody>
            <ModalFooter>
              <Button className="bg-black" onClick={toggle}>
                Jogar novamente
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>

      <div className="fixed top-0 w-full flex justify-between">
        <button
          className="reset-button w-[8rem] bg-white/10"
          onClick={resetPoints}
        >
          Resetar Pontuação
        </button>
      </div>
    </div>
  );
};

export default Scoreboard;
