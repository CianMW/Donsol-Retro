import styles from './MainMenu.module.css'

interface Props{
    startNewGame: () => void;
}

export function MainMenu({startNewGame}:Props){

    return(<div className={`standard-dialog ${styles.mainMenuWrapper}`}>
        <h1>Welcome to donsol Retro</h1>
        <div className={`${styles.buttonContainer}`}>

        <button className={`btn`} onClick={() => startNewGame()}>New Game</button>
        <button className={`btn`}>Settings</button>
        <button className={`btn`}>About</button>
        </div>
    </div>)
}