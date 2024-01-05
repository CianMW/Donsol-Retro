'use client'
import { useState } from 'react'
import { MainMenu } from '../MainMenu.tsx/MainMenu'
import styles from './DonsolController.module.css'


export function DonsolController(){
const [cardState, setCardState]=useState<boolean>(true)
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
            <img onClick={()=> setCardState(!cardState)}src={`${cardState ? '/cards/Clubs/Clubs_card_01.png': '/cards/Backs/back_0.png'}`} width={'80px'} height={'160px'} style={{cursor:'pointer'}}/>
            <img src={'/cards/Clubs/Clubs_card_01.png'} width={'80px'} height={'160px'} />
            <img src={'/cards/Clubs/Clubs_card_01.png'} width={'80px'} height={'160px'} />
            <img src={'/cards/Clubs/Clubs_card_01.png'} width={'80px'} height={'160px'} />
        </div>
    </div>
    )
}