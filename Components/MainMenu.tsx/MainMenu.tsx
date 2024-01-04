import styles from './MainMenu.module.css'


export function MainMenu(){

    return(<div className={`standard-dialog ${styles.mainMenuWrapper}`}>
        <h1>Welcome to donsol Retro</h1>
        <div className={`${styles.buttonContainer}`}>

        <button className={`btn`}>New Game</button>
        <button className={`btn`}>Settings</button>
        <button className={`btn`}>About</button>
        </div>
    </div>)
}