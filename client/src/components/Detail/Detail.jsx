import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Nav from "../Nav/Nav";
import styles from './Detail.module.css';
import Loading from '../Loading/Loading';
import defualtImg from '../../images/defaultDog.jpg';

export default function Detail(props) {
    const [information, setInformation] = useState();

    const search = useLocation().search;
    const id = new URLSearchParams(search).get('id');
    useEffect(()=>{
        if(information===undefined) axios.get(`http://localhost:3001/dogs/${id}`)
        .then((res)=>setInformation(res.data));
    },[information])
    return(
        <>
        <Nav />
        {information===undefined?<Loading />:<div>
            <h1 className={styles.tittle}>{information?.name}</h1>
        <div className={styles.container}>
            <div className={styles.divImg}>
                <img className={styles.img} src={information?.image?.url || defualtImg} alt="" />
            </div>
            <div className={styles.divData}>
                <p><b>Weight:</b> {information?.weight.metric} <i>kg</i> or {information?.weight.imperial} <i>lb</i></p>
                <p><b>Height:</b> {information?.height.metric} <i>cm</i> or {information?.height.imperial} <i>inch</i></p>
                <p><b>Life span:</b> {information?.life_span}</p>
                <p><b>Origin:</b> {information?.origin!==undefined?information.origin:"unknown"}</p>
                <p><b>Bred for:</b> {information?.bred_for!==undefined?information?.bred_for:"unknown"}</p>
                <p><b>Temperament:</b> {information?.temperament}</p>
            </div>
        </div>
        </div>}
        </>
        
    )
}