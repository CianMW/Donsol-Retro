import { Card, GameData } from '@/types'
import styles from './GameMat.module.css'
import { GameContext } from '../Context/GameContext';
import { useContext } from 'react';


export function GameMat(){

    const {
        updateGameData,
        currentRoom,
        deck,
        playerHealth,
        equippedShield,
        previousShieldValue,
        isPreviousRoomEscaped,
        gameMode,
        gameStatus
      } = useContext(GameContext);

    return(<div className={`standard-dialog ${styles.matWrapper}`}>
        <h1 style={{textAlign:'center'}}>Game Mat</h1>
        <div className={`${styles.rowWrapper}`}>
        <div>
            {/* The Top Row  */}
            {/* Health */}
            {/* Shield */}
            {/* Rooms cleared */}
            {/* Cards Remaining */}
        </div>
        <div className={styles.activeRoomContainer}>
            {/* The middle row 4 card container */}
            {currentRoom &&currentRoom.map((card:Card) =>  
             <img
        //   onClick={() => setCardState(!cardState)}
          src={`${card.imageUrl
          }`}
          width={"80px"}
          height={"160px"}
          style={{ cursor: "pointer" }}
        />)}
        </div>
        <div>
            {/* Options */}
            {/* 1  card remaining = Next room */}
            <button className={'btn'}>Next Room</button>
            {/* >=1 card remaining = escape room */}
            <button className={'btn'}>Escape Room</button>
        </div>
        </div>
    </div>)
}