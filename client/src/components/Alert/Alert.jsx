import styles from  './Alert.module.css';
import checked from '../../icons/checkAnimated.svg';

export default function Alert({ success, message, show, closeAlert }) {
  return (
    <>
    <div className={show ? styles.displayBlock : styles.displayNone}>
      <section className={styles.alertMain}>
        <div className={styles.divClose}>
          <button className={styles.closeButton} type="button" onClick={closeAlert}><b>X</b></button>
        </div>
        <div className={styles.container}>
          <img className={styles.icon} src={success?checked:''} alt="" />
          <p>{message}</p>
        </div>
        <button onClick={closeAlert} className={styles.button}>OK</button>
      </section>
    </div>
    </>
    
  );
}