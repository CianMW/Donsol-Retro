import { Card } from '@/types';
import styles from './ActiveCard.module.css'
import { useEffect, useState } from 'react';

interface Props{
    imageUrl:string;
    handleCardSelection: () => void;
}

export function ActiveCard({imageUrl, handleCardSelection}:Props){
    const [cardState, setCardState] = useState<boolean>(false)

    function selectCard(){
        if(cardState && imageUrl){
        return;
        }
            setCardState(true)
            handleCardSelection();
    }

    useEffect(() => {
        if(!imageUrl){

            setCardState(false)
        }
   
    }, [imageUrl])
    

    return (
        <div onClick={() => selectCard()} className={styles.cardWrapper}>
            <div className={`${styles.card} ${cardState ||!imageUrl && styles.flipped}`}>

            <div className={`${styles.front} ${styles.face}`} style={{backgroundImage:`url(${imageUrl}`}}></div>
            <div className={`${styles.back} ${styles.face}`} style={{backgroundImage:`url(${'./cards/backs/back_0.png'}`}}></div>
            </div>
        </div>
    )
}