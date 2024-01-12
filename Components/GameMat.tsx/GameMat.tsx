import { Card, GameData } from '@/types'
import styles from './GameMat.module.css'
import { GameContext } from '../Context/GameContext';
import { useContext } from 'react';
import { ActiveCard } from '../ActiveCard/ActiveCard';
import { getCardValue, handleMonster, handlePotion, handleShield } from '@/app/api/gameFunctions';
import { UsedCard } from '../UsedCard/UsedCard';


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
        gameStatus,
        potionUsedPreviously
      } = useContext(GameContext);


      function checkGameStatus(){
        if(playerHealth >0 && deck.length >0){
            return
        }
        if(playerHealth > 0 && deck.length<=0){
           updateGameData({gameStatus: 'win'})
        }
        
      }

function handleCardSelection(card:Card, index:number) {
        let gameDataValue:Partial<GameData> = {};
        if(card.suit ==='Hearts'){
            gameDataValue = handlePotion(potionUsedPreviously,card, playerHealth);

        }
        if(card.suit ==='Diamonds'){
            gameDataValue = handleShield(card, equippedShield, previousShieldValue);

        }


        if(card.suit === 'Clubs'|| card.suit === 'Spades'|| card.suit === 'Joker'){
            let cardVal = getCardValue(card)
            let postFightValues:Partial<GameData> = {}
            postFightValues = {...handleMonster(card, playerHealth, equippedShield)};
              if (equippedShield !== null && previousShieldValue !== null && cardVal>= previousShieldValue) {
                postFightValues.equippedShield = null;  
                postFightValues.previousShieldValue= null
            } else{
                postFightValues.previousShieldValue= cardVal
            }
            gameDataValue = {...postFightValues}
        }
        
        gameDataValue.currentRoom = [...currentRoom]
        gameDataValue.currentRoom[index] = null;

        updateGameData(gameDataValue)

}



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
            
            {currentRoom &&currentRoom.map((card:Card|null, index) =>  {
               if(card){

                 return  <ActiveCard key={index} imageUrl={card.imageUrl} handleCardSelection={() =>handleCardSelection(card, index)}/>
                } else {
                    return <UsedCard imageUrl={'/cards/backs/back_0.png'} />

                }
                
            }
            )}
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