import { Card, GameData } from "@/types";
import styles from "./GameMat.module.css";
import { GameContext } from "../Context/GameContext";
import { useContext, useEffect, useState } from "react";
import { ActiveCard } from "../ActiveCard/ActiveCard";
import {
    drawRoom,
  getCardValue,
  handleMonster,
  handlePotion,
  handleShield,
} from "@/app/api/gameFunctions";
import { UsedCard } from "../UsedCard/UsedCard";

export function GameMat() {
const [nextRoomDisabled, setNextRoomDisabled]= useState<boolean>(true)

  const {
    updateGameData,
    currentRoom,
    deck,
    playerHealth,
    equippedShield,
    previousShieldValue,
    isPreviousRoomEscaped,
    gameMode,
    gameStatus,
    potionUsedPreviously,
  } = useContext(GameContext);

  useEffect(() => {
    const roomsLeft:number = currentRoom.filter(room => room).length
    if(roomsLeft <=1 && nextRoomDisabled){
        setNextRoomDisabled(false);
    } else {
        setNextRoomDisabled(true);
    }

  }, [currentRoom, deck])
  


  function checkGameStatus() {
    if (playerHealth > 0 && deck.length > 0) {
      return;
    }
    if (playerHealth > 0 && deck.length <= 0) {
      updateGameData({ gameStatus: "win" });
    }
  }

  function handleCardSelection(card: Card, index: number) {
    let gameDataValue: Partial<GameData> = {};
    if (card.suit === "Hearts") {
      gameDataValue = handlePotion(potionUsedPreviously, card, playerHealth);
    }
    if (card.suit === "Diamonds") {
      gameDataValue = handleShield(card, equippedShield, previousShieldValue);
    }

    if (
      card.suit === "Clubs" ||
      card.suit === "Spades" ||
      card.suit === "Joker"
    ) {
      let cardVal = getCardValue(card);
      let postFightValues: Partial<GameData> = {};
      postFightValues = {
        ...handleMonster(card, playerHealth, equippedShield),
      };
      if (
        equippedShield !== null &&
        previousShieldValue !== null &&
        cardVal >= previousShieldValue
      ) {
        postFightValues.equippedShield = null;
        postFightValues.previousShieldValue = null;
      } else {
        postFightValues.previousShieldValue = cardVal;
      }
      gameDataValue = { ...postFightValues };
    }

    gameDataValue.currentRoom = [...currentRoom];
    gameDataValue.currentRoom[index] = null;

    if( gameDataValue.currentRoom.filter(room => room).length <=0){
        // Get the next set of rooms
        const {room:newRoom, remainingDeck} = drawRoom(deck)
        gameDataValue.currentRoom = newRoom;
        gameDataValue.deck = remainingDeck
    }
    updateGameData(gameDataValue);

  }

  function getNextRoom(){
    if( currentRoom.filter(room => room).length <=1){
        let remainingCard = currentRoom.filter(room => room)
        let gameDataValue:Partial<GameData> ={};
        const {room:newRoom, remainingDeck} = drawRoom(deck)
        gameDataValue.currentRoom = newRoom;
        gameDataValue.deck = remainingDeck
        if(remainingCard.length > 0 && remainingCard[0]){
            gameDataValue.deck.push(remainingCard[0])
        }
        updateGameData(gameDataValue)
    }
  }

  return (
    <div className={`standard-dialog ${styles.matWrapper}`}>
      <h1 style={{ textAlign: "center" }}>Game Mat</h1>
      <div className={`${styles.rowWrapper}`}>
        <div>
          {/* The Top Row  */}
          {/* Health */}
          <span>
            <b>Health :</b>
            {playerHealth}
          </span>
          {/* Shield */}
          <span>
            <b>Equipped Shield :</b>
            {equippedShield}
          </span>
          {/* Rooms cleared */}
          <span>
            <b>Last Monster :</b>
            {previousShieldValue}
          </span>
          {/* Cards Remaining */}
          <span>
            <b>Deck :</b>
            {deck.length}
          </span>
        </div>
        <div className={styles.activeRoomContainer}>
          {/* The middle row 4 card container */}

          {currentRoom &&
            currentRoom.map((card: Card | null, index) => {
              if (card) {
                return (
                  <ActiveCard
                    key={index}
                    imageUrl={card.imageUrl}
                    handleCardSelection={() => handleCardSelection(card, index)}
                  />
                );
              } else {
                return <UsedCard imageUrl={"/cards/backs/back_0.png"} />;
              }
            })}
        </div>

        <div>
          {/* Options */}
          {/* 1  card remaining = Next room */}
          <button className={"btn"} disabled={nextRoomDisabled} onClick={() => getNextRoom()}>Next Room</button>
          {/* >=1 card remaining = escape room */}
          <button className={"btn"}>Escape Room</button>
        </div>
      </div>
    </div>
  );
}
