'use client'
import { MainMenu } from '../MainMenu.tsx/MainMenu'
import styles from './DonsolController.module.css'


export function DonsolController(){

    function quitApplication(){

    }
    return(
        <div className={`window ${styles.donsolWrapper}`} >
        <div className="title-bar"> 
            <button aria-label="Close" className="close" onClick={() =>quitApplication}></button>
            <h1 className="title">Donsol V1</h1>
            <button aria-label="Resize" className="resize"></button>
        </div>
        <div className="details-bar"> 
            <h1 className="title">Donsol V1</h1>
            <h1 className="title">Donsol V1</h1>
        </div>

        <div className="separator"></div>
        
        <div className={`window-pane ${styles.mainContent}`}>
            <MainMenu/>
        </div>
    </div>
    )
}