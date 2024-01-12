import { Card } from '@/types';
import styles from './ActiveCard.module.css'

interface Props{
    imageUrl:string;
    handleCardSelection: () => void;
}

export function ActiveCard({imageUrl, handleCardSelection}:Props){



    return (
        <div onClick={() => handleCardSelection()} className={styles.cardWrapper}>
            <img className={styles.cardImage} src={imageUrl}/>
        </div>
    )
}