import gif from '../../images/loading-dog.gif';
import styles from './Loading.module.css';

export default function Loading(props) {
    return(
        <img className={styles.loadingGif} src={gif} alt="" />
    )
}