import React, { useEffect, useState } from 'react';
import Cards from '../Cards/Cards';
import styles from './Home.module.css';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import { addBreeds, filterBreeds } from '../../redux/actions';
import Loading from '../Loading/Loading';
import Paginator from '../Paginator/Paginator';
import Nav from '../Nav/Nav';

export default function Home(props){
    const dispatch = useDispatch();
    const [breeds, setBreeds] = useState([]);
    const [page, setPage] = useState(1);
    const [pageChange, setPageChange] = useState(true);
    const [filtered, setFiltered] = useState(false);

    const allBreeds = useSelector((state)=>state.breeds);
    const filteredBreeds = useSelector((state)=>state.filteredBreeds);

    const cardsPerPage = 8;

    const fetchBreeds = ()=>{
        if(!allBreeds.length){
            axios.get('http://localhost:3001/dogs')
            .then((res)=>dispatch(addBreeds(res.data))); 
        }
        
    };

    const onSearch = (wanted)=>{
            axios.get(`http://localhost:3001/dogs?name=${wanted}`)
            .then((res)=>dispatch(filterBreeds(res.data)));
            setFiltered(true);
            setPageChange(true);
    };

    useEffect(()=>{
        fetchBreeds();
        if(allBreeds.length&&pageChange&&!filtered){
            setPageChange(false);
            setBreeds(allBreeds.slice(page*cardsPerPage-cardsPerPage,cardsPerPage*page));
        }
        if(filteredBreeds.length&&pageChange&&filtered){
            setPageChange(false);
            setBreeds(filteredBreeds.slice(page*cardsPerPage-cardsPerPage,cardsPerPage*page));
            setPage(1);
        }
    },[page,breeds,allBreeds,filtered]);
        return(
            <>  
                <Nav onSearch={onSearch} />
                <Paginator setPage={setPage}
                setPageChange={setPageChange}
                cardsPerPage={cardsPerPage}
                page={page}
                dataLength={filtered?filteredBreeds.length:allBreeds.length}
                />
                {filtered?filteredBreeds.length?<Cards breeds={filteredBreeds} />: <Loading />:allBreeds.length?<Cards breeds={breeds} />: <Loading />}
            </>
                    
                )
};