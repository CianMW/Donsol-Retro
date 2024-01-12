import { Card } from '@/types';
import styles from './UsedCard.module.css'

interface Props{
    imageUrl:string;
}

export function UsedCard({imageUrl}:Props){

    return (
        <div className={styles.cardWrapper}>
            <img className={styles.cardImage} src={imageUrl}/>
        </div>
    )
}