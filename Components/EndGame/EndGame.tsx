
import { GameData } from '@/types'
import styles from './EndGame.module.css'

interface Props{
    gameData:GameData;
    startNewGame:() => void;
}

export function EndGame({gameData, startNewGame}:Props){


    return(<div className={styles.endGameWrapper}>
        You {gameData.gameStatus}
        <button className={'btn'} onClick={() => startNewGame()}> Play Again ?</button>
    </div>)
}