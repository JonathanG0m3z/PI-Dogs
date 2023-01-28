import styles from './Card.module.css';
import defualtImg from '../../images/defaultDog.jpg';

export default function Card({race,img,imperialWeight,metricWeight,temperaments}) {
    return(
        <div className={styles.container}>
            <h1 className={styles.race}>{race}</h1>
            <img className={styles.img} src={img || defualtImg} alt="" />
            <div className={styles.data}>
                <h2>Weight:</h2>
                <label className={styles.label} htmlFor="">{metricWeight} kg or {imperialWeight} lb</label>
                <h2>Temperaments:</h2>
                <label className={styles.label} htmlFor="">{temperaments}</label>
            </div>
        </div>
    )
}