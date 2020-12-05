import React, { useState, useEffect } from "react";
import PlayerPlanet1 from "../../images/player-planet-1.svg";
import PlayerPlanet2 from "../../images/player-planet-2.svg";
import PlayerPlanet3 from "../../images/player-planet-3.svg";
import PlayerPlanet4 from "../../images/player-planet-4.svg";
import Planet from "../../images/planet.svg";
import PlayerLander1 from "../../images/player-lander-1.svg";
import PlayerLander2 from "../../images/player-lander-2.svg";
import PlayerLander3 from "../../images/player-lander-3.svg";
import PlayerLander4 from "../../images/player-lander-4.svg";
import PlayerLauncher1 from "../../images/player-launcher-1.svg";
import PlayerLauncher2 from "../../images/player-launcher-2.svg";
import PlayerLauncher3 from "../../images/player-launcher-3.svg";
import PlayerLauncher4 from "../../images/player-launcher-4.svg";
import PlayerStep1 from "../../images/player-step-1.svg";
import PlayerStep2 from "../../images/player-step-2.svg";
import PlayerStep3 from "../../images/player-step-3.svg";
import PlayerStep4 from "../../images/player-step-4.svg";
// Simulate horses
import Horse1 from "../../images/horse-1.png";
import Horse2 from "../../images/horse-2.png";
import Horse3 from "../../images/horse-3.png";
import Horse4 from "../../images/horse-4.png";
import Winner from "../../images/winner.svg";

const rollADie = require("roll-a-die");

const GamePlay = () => {
  const defaultGamePlay = {
    no1: PlayerLauncher1,
    no2: Planet,
    no3: Planet,
    no4: Planet,
    no5: Planet,
    no6: Planet,
    no7: Planet,
    no8: Planet,
    no9: Planet,
    no10: Planet,
    no11: Planet,
    no12: Planet,
    no13: Planet,
    no14: PlayerLander2,
    no15: PlayerLauncher2,
    no16: Planet,
    no17: Planet,
    no18: Planet,
    no19: Planet,
    no20: Planet,
    no21: Planet,
    no22: Planet,
    no23: Planet,
    no24: Planet,
    no25: Planet,
    no26: Planet,
    no27: Planet,
    no28: PlayerLander3,
    no29: PlayerLauncher3,
    no30: Planet,
    no31: Planet,
    no32: Planet,
    no33: Planet,
    no34: Planet,
    no35: Planet,
    no36: Planet,
    no37: Planet,
    no38: Planet,
    no39: Planet,
    no40: Planet,
    no41: Planet,
    no42: PlayerLander4,
    no43: PlayerLauncher4,
    no44: Planet,
    no45: Planet,
    no46: Planet,
    no47: Planet,
    no48: Planet,
    no49: Planet,
    no50: Planet,
    no51: Planet,
    no52: Planet,
    no53: Planet,
    no54: Planet,
    no55: Planet,
    no56: PlayerLander1,
    a1: PlayerStep1,
    a2: PlayerStep1,
    a3: PlayerStep1,
    a4: PlayerStep1,
    a5: PlayerStep1,
    a6: PlayerStep1,
    b1: PlayerStep2,
    b2: PlayerStep2,
    b3: PlayerStep2,
    b4: PlayerStep2,
    b5: PlayerStep2,
    b6: PlayerStep2,
    c1: PlayerStep3,
    c2: PlayerStep3,
    c3: PlayerStep3,
    c4: PlayerStep3,
    c5: PlayerStep3,
    c6: PlayerStep3,
    d1: PlayerStep4,
    d2: PlayerStep4,
    d3: PlayerStep4,
    d4: PlayerStep4,
    d5: PlayerStep4,
    d6: PlayerStep4,
    // ...
  };

  const initialState = {
    currentPlayer: 0,
    gamePlay: { ...defaultGamePlay },
    horses1: [1, 0, 0, 0],
    horses2: [15, 14, 14, 14],
    horses3: [29, 28, 28, 28],
    horses4: [43, 42, 42, 42],
    normalDice: null,
    specialDice: null,
  };

  const [boardState, setBoardState] = useState(initialState);

  useEffect(() => {
    const newGamePlay = {
      ...boardState.gamePlay,
      no1: Horse1,
      no15: Horse2,
      no29: Horse3,
      no43: Horse4,
    };
    setBoardState({ ...boardState, gamePlay: newGamePlay });
  }, []);

  const handleChangeDices = (e) => {
    const player = e.target.dataset.index - 1;
    if (player === boardState.currentPlayer) {
      let currentHorses = [];
      let currentSrc = null;
      switch (player) {
        case 0:
          currentHorses = [...boardState.horses1];
          currentSrc = Horse1;
          break;
        case 1:
          currentHorses = [...boardState.horses2];
          currentSrc = Horse2;
          break;
        case 2:
          currentHorses = [...boardState.horses3];
          currentSrc = Horse3;
          break;
        case 3:
          currentHorses = [...boardState.horses4];
          currentSrc = Horse4;
          break;
        default:
          break;
      }
      const element = document.getElementById("dices");
      rollADie({
        element,
        numberOfDice: 2,
        callback: (values) => {
          const movingSteps = values[1];
          const currentPosition = currentHorses[0];
          console.log(currentPosition);
          console.log(defaultGamePlay[`no${currentPosition}`]);
          const newGamePlay = {
            ...boardState.gamePlay,
            [`no${currentPosition}`]: defaultGamePlay[`no${currentPosition}`],
            [`no${currentPosition + movingSteps}`]: currentSrc,
          };

          setBoardState({
            ...boardState,
            gamePlay: newGamePlay,
            currentPlayer: (boardState.currentPlayer + 1) % 4,
            [`horses${player + 1}`]: [currentPosition + movingSteps, 0, 0, 0],
          });
        },
      });
    }
  };

  return (
    <div className="boardContainer">
      <div
        id="dices"
        style={{
          position: "fixed",
          width: "100px",
          height: "200px",
        }}
      ></div>
      <div className="board">
        {/*  */}
        <div className="boardItem player1Area">
          <img
            data-index={1}
            id="player-planet-1"
            src={PlayerPlanet1}
            alt=""
            onClick={handleChangeDices}
          />
        </div>
        <div className="boardItem">
          <img id="no1" src={boardState.gamePlay["no1"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="no56" src={boardState.gamePlay["no56"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="no55" src={boardState.gamePlay["no55"]} alt="" />
        </div>
        <div className="boardItem player4Area">
          <img
            data-index={4}
            id="player-planet-4"
            src={PlayerPlanet4}
            alt=""
            onClick={handleChangeDices}
          />
        </div>
        {/*  */}
        <div className="boardItem">
          <img id="no2" src={boardState.gamePlay["no2"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="a1" src={boardState.gamePlay["a1"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="no54" src={boardState.gamePlay["no54"]} alt="" />
        </div>
        {/*  */}
        <div className="boardItem">
          <img id="no3" src={boardState.gamePlay["no3"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="a2" src={boardState.gamePlay["a2"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="no53" src={boardState.gamePlay["no53"]} alt="" />
        </div>
        {/*  */}
        <div className="boardItem">
          <img id="no4" src={boardState.gamePlay["no4"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="a3" src={boardState.gamePlay["a3"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="no52" src={boardState.gamePlay["no52"]} alt="" />
        </div>
        {/*  */}
        <div className="boardItem">
          <img id="no5" src={boardState.gamePlay["no5"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="a4" src={boardState.gamePlay["a4"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="no51" src={boardState.gamePlay["no51"]} alt="" />
        </div>
        {/*  */}
        <div className="boardItem">
          <img id="no6" src={boardState.gamePlay["no6"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="a5" src={boardState.gamePlay["a5"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="no50" src={boardState.gamePlay["no50"]} alt="" />
        </div>
        {/*  */}
        <div className="boardItem">
          <img id="no13" src={boardState.gamePlay["no13"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="no12" src={boardState.gamePlay["no12"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="no11" src={boardState.gamePlay["no11"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="no10" src={boardState.gamePlay["no10"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="no9" src={boardState.gamePlay["no9"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="no8" src={boardState.gamePlay["no8"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="no7" src={boardState.gamePlay["no7"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="a6" src={boardState.gamePlay["a6"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="no49" src={boardState.gamePlay["no49"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="no48" src={boardState.gamePlay["no48"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="no47" src={boardState.gamePlay["no47"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="no46" src={boardState.gamePlay["no46"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="no45" src={boardState.gamePlay["no45"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="no44" src={boardState.gamePlay["no44"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="no43" src={boardState.gamePlay["no43"]} alt="" />
        </div>
        {/*  */}
        <div className="boardItem">
          <img id="no14" src={boardState.gamePlay["no14"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="b1" src={boardState.gamePlay["b1"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="b2" src={boardState.gamePlay["b2"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="b3" src={boardState.gamePlay["b3"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="b4" src={boardState.gamePlay["b4"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="b5" src={boardState.gamePlay["b5"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="b6" src={boardState.gamePlay["b6"]} alt="" />
        </div>
        <div className="boardItem">
          <img src={Winner} alt="" />
        </div>
        <div className="boardItem">
          <img id="d6" src={boardState.gamePlay["d6"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="d5" src={boardState.gamePlay["d5"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="d4" src={boardState.gamePlay["d4"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="d3" src={boardState.gamePlay["d3"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="d2" src={boardState.gamePlay["d2"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="d1" src={boardState.gamePlay["d1"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="no42" src={boardState.gamePlay["no42"]} alt="" />
        </div>
        {/*  */}
        <div className="boardItem">
          <img id="no15" src={boardState.gamePlay["no15"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="no16" src={boardState.gamePlay["no16"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="no17" src={boardState.gamePlay["no17"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="no18" src={boardState.gamePlay["no18"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="no19" src={boardState.gamePlay["no19"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="no20" src={boardState.gamePlay["no20"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="no21" src={boardState.gamePlay["no21"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="c6" src={boardState.gamePlay["c6"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="no35" src={boardState.gamePlay["no35"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="no36" src={boardState.gamePlay["no36"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="no37" src={boardState.gamePlay["no37"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="no38" src={boardState.gamePlay["no38"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="no39" src={boardState.gamePlay["no39"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="no40" src={boardState.gamePlay["no40"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="no41" src={boardState.gamePlay["no41"]} alt="" />
        </div>
        {/*  */}
        <div className="boardItem player2Area">
          <img
            data-index={2}
            id="player-planet-2"
            src={PlayerPlanet2}
            alt=""
            onClick={handleChangeDices}
          />
        </div>
        <div className="boardItem">
          <img id="no22" src={boardState.gamePlay["no22"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="c5" src={boardState.gamePlay["c5"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="no34" src={boardState.gamePlay["no34"]} alt="" />
        </div>
        <div className="boardItem player3Area">
          <img
            data-index={3}
            id="player-planet-3"
            src={PlayerPlanet3}
            alt=""
            onClick={handleChangeDices}
          />
        </div>
        {/*  */}
        <div className="boardItem">
          <img id="no23" src={boardState.gamePlay["no23"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="c4" src={boardState.gamePlay["c4"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="no33" src={boardState.gamePlay["no33"]} alt="" />
        </div>
        {/*  */}
        <div className="boardItem">
          <img id="no24" src={boardState.gamePlay["no24"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="c3" src={boardState.gamePlay["c3"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="no32" src={boardState.gamePlay["no32"]} alt="" />
        </div>
        {/*  */}
        <div className="boardItem">
          <img id="no25" src={boardState.gamePlay["no25"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="c2" src={boardState.gamePlay["c2"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="no31" src={boardState.gamePlay["no31"]} alt="" />
        </div>
        {/*  */}
        <div className="boardItem">
          <img id="no26" src={boardState.gamePlay["no26"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="c1" src={boardState.gamePlay["c1"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="no30" src={boardState.gamePlay["no30"]} alt="" />
        </div>
        {/*  */}
        <div className="boardItem">
          <img id="no27" src={boardState.gamePlay["no27"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="no28" src={boardState.gamePlay["no28"]} alt="" />
        </div>
        <div className="boardItem">
          <img id="no29" src={boardState.gamePlay["no29"]} alt="" />
        </div>
      </div>
    </div>
  );
};

export default GamePlay;