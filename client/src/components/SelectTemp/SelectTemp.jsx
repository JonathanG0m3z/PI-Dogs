import styles from './SelectTemp.module.css';

export default function SelectTemp(props) {
    return(
        <>
            <div className={styles.divSelect}>
                <div>
                   <input type="text" id="search" placeholder="Search..." />
                   <button className={styles.add}><b>+</b></button>
                </div>
                
                <select id="select" multiple>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                    <option value="option4">Option 4</option>
                </select> 
            </div>
        </>
    )
}