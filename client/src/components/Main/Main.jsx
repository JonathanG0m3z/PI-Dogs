import React from "react";
import { Link } from "react-router-dom";
import logo from '../../images/dog.png';
import styles from './Main.module.css';

class Main extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <>
            <div className={styles.body}>
                <div className={styles.container}>
                    <h1 className={styles.h1}>Henry Dogs</h1>
                    <img className={styles.logo} src={logo} alt="" /><br />
                    <Link to="/home">
                    <button className={styles.button}>Home</button> 
                    </Link>  
                </div>
                    
            </div>
                
            </>
            
        )
    }
}

export default Main;