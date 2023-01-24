import gif from '../../images/loading-dog.gif';
import styles from './Loading.module.css';
import errorImage from '../../images/error.jpg';
import React from 'react';

class Loading extends React.Component {
    state={
        error: false,
    }
    render (){
        const {error} = this.state;
        setTimeout(()=>this.setState({ error: true}),4000);
        return(
            <>
                {error?<img className={styles.error} src={errorImage} alt="" />:<img className={styles.loadingGif} src={gif} alt="" />} 
            </>
        )
    }
    
}

export default Loading;