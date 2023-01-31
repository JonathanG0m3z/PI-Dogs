import React from "react";
import { Link } from "react-router-dom";
import logo from '../../images/dog.png';
import styles from './Main.module.css';
import img1 from '../../images/wallpaper1.jpeg';
import img2 from '../../images/wallpaper2.jpg';
import img3 from '../../images/wallpaper3.jpg';
import rightArrow from '../../icons/rightArrow.svg';
import leftArrow from '../../icons/leftArrow.svg';

class Main extends React.Component{
    constructor(props){
        super(props)
    }
    state = {
        imageIndex: 0,
    }
    render(){
        const backgrounds = [img1,img2,img3];

        const changeImage = (event) => {
            const id = Number(event.target.id);
            const index = (this.state.imageIndex + id) % backgrounds.length;
            if(index===-1) this.setState({imageIndex: 2});
            else this.setState({imageIndex: index});
          }
        return(
            <>
            <div style={{ backgroundImage: `url(${backgrounds[this.state.imageIndex]})`}} className={styles.body}>
                <img className={styles.arrows} id='-1' onClick={changeImage} src={leftArrow} alt="" />
                <img className={styles.arrows} id='1' onClick={changeImage} src={rightArrow} alt="" />
                {/* <label htmlFor="" className={styles.arrows} id='-1' onClick={changeImage}>Prev </label>
                <label htmlFor="" className={styles.arrows} id='1' onClick={changeImage}>Next</label> */}
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