import styles from './Create.module.css';
import Card from "../Card/Card";
import SelectTemp from '../SelectTemp/SelectTemp';
import MiniInput from '../MiniInput/MiniInput';
import Nav from "../Nav/Nav";

export default function Create(props) {
    return(
        <>
        <Nav />
            <h1>Create breed form</h1>
            <div className={styles.container}>
                <div className={styles.divForm}>
                    <form action="">
                        <label for="name">Breed name:</label>
                        <input className={styles.input} autoComplete='off' type="text" id="name" />
                        <br />
                        <MiniInput whatData="Weight" units={['kg','lb']} exchange={2.20462} />
                        <br />
                        <MiniInput whatData="Height" units={['cm','inch']} exchange={0.393701} />
                        <br />
                        <label for="number">Life span:</label>
                        <div className={styles.divLife}>
                            <input autoComplete='off' className={styles.input} type="number" id="life_span" />
                            <label htmlFor="">years</label>  
                        </div>
                        <SelectTemp />
                        <br />
                        <input className={styles.input} type="submit" value="Create breed" />
                    </form>
                </div>
                <div className={styles.divCard}>
                    <Card />
                </div>
            </div>
            
        </>
        
    )
}