import React, { useEffect, useState } from 'react';
import Cards from '../Cards/Cards';
import styles from './Home.module.css';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import { addBreeds } from '../../redux/actions';
import Loading from '../Loading/Loading';
import Paginator from '../Paginator/Paginator';

export default function Home(props){
    const dispatch = useDispatch();
    const [breeds, setBreeds] = useState([]);
    const [page, setPage] = useState(1);
    const [pageChange, setPageChange] = useState(true);
    const allBreeds = useSelector((state)=>state.breeds);

    const cardsPerPage = 8;

    const fetchBreeds = ()=>{
        if(!allBreeds.length){
            axios.get('http://localhost:3001/dogs')
            .then((res)=>dispatch(addBreeds(res.data))); 
        }
        
    };

    useEffect(()=>{
        fetchBreeds();
        if(allBreeds.length&&pageChange){
            setPageChange(false);
            setBreeds(allBreeds.slice(page*cardsPerPage-cardsPerPage,cardsPerPage*page));
        }
    },[page,breeds,allBreeds]);
        return(
            <>
            {console.log("Renderizando")}
                <Paginator setPage={setPage}
                setPageChange={setPageChange}
                cardsPerPage={cardsPerPage}
                page={page}
                />
                {allBreeds.length?<Cards breeds={breeds} />: <Loading />}
            </>
                    
                )
};