"use client";
import { useContext, useState } from "react";
import { MainMenu } from "../MainMenu.tsx/MainMenu";
import styles from "./DonsolController.module.css";
import { GameContext } from "../Context/GameContext";
import { initialiseGame } from "@/app/api/gameFunctions";
import { GameMat } from "../GameMat.tsx/GameMat";

export function DonsolController() {
  const [cardState, setCardState] = useState<boolean>(true);
  function quitApplication() {}

  const {
    updateGameData,
    deck,
    currentRoom,
    playerHealth,
    equippedShield,
    previousShieldValue,
    isPreviousRoomEscaped,
    gameMode,
    gameStatus,
    potionUsedPreviously
  } = useContext(GameContext);

  function startNewGame() {
    initialiseGame({
      deck: deck,
      currentRoom: currentRoom,
      playerHealth: playerHealth,
      equippedShield: equippedShield,
      previousShieldValue: previousShieldValue,
      isPreviousRoomEscaped: isPreviousRoomEscaped,
      gameMode: gameMode,
      updateGameData: updateGameData,
      gameStatus: gameStatus,
      potionUsedPreviously:potionUsedPreviously
    });
  }


  function resetDefault(){
    updateGameData({gameStatus:'menu'})

  }

  return (
    <div className={`window ${styles.donsolWrapper}`}>
      <div className="title-bar">
        <button
          aria-label="Close"
          className="close"
          onClick={() => quitApplication}
        ></button>
        <h1 className="title">Donsol V1</h1>
        <button aria-label="Resize" className="resize"></button>
      </div>
      <div className="details-bar">
        <h1 className="title">Donsol V1</h1>
        <h1 className="title">Donsol V1</h1>
      </div>

      <div className="separator"></div>

      <div className={`window-pane ${styles.mainContent}`}>
        {gameStatus === 'play' && <GameMat resetDefault={resetDefault} />}
        {gameStatus==='menu' && <MainMenu startNewGame={startNewGame} />}
        {/* {gameStatus ===} */}
      </div>
    </div>
  );
}
