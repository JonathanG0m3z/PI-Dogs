import React, { useEffect, useState } from 'react';
import Cards from '../Cards/Cards';
import styles from './Home.module.css';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import { addBreeds, filterBreeds, changeOrder, clearFilterRedux, setFiltered } from '../../redux/actions';
import Loading from '../Loading/Loading';
import Paginator from '../Paginator/Paginator';
import Nav from '../Nav/Nav';

export default function Home(props){
    const dispatch = useDispatch();
    const [breeds, setBreeds] = useState([]);
    const [page, setPage] = useState(1);
    const [pageChange, setPageChange] = useState(true);

    const allBreeds = useSelector((state)=>state.breeds);
    const filteredBreeds = useSelector((state)=>state.filteredBreeds);
    const orderForAll = useSelector(state=>state.orderAll);
    const orderForFiltered = useSelector(state=>state.orderFiltered);
    const filtered = useSelector(state=>state.filtered.isFiltered);

    const cardsPerPage = 8;

    const fetchBreeds = ()=>{
        if(!allBreeds.length){
            axios.get('http://localhost:3001/dogs')
            .then((res)=>dispatch(addBreeds(res.data))); 
        }
        
    };

    const onSearch = (wanted)=>{
            axios.get(`http://localhost:3001/dogs?name=${wanted}`)
            .then((res)=>{
                const data = res.data.map((breed)=>allBreeds.find((sameBreed)=>sameBreed.id==breed.id));
                dispatch(filterBreeds(
                    data.filter((breed)=>breed!=undefined)
                ));
            });
            dispatch(setFiltered(true, wanted));
            setPageChange(true);
            setPage(1);
    };

    const clearFilter = ()=>{
        dispatch(setFiltered(false));
        dispatch(filterBreeds([]));
        setPageChange(true);
        setPage(1);
        dispatch(clearFilterRedux());
    };

    const changeOrderBreeds = (type)=>{
        if(type==='ASC' || type==='DES') dispatch(changeOrder(filtered, type));
        //else 
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
        }
    },[page,breeds,allBreeds,filtered,filteredBreeds,pageChange]);
        return(
            <>  
                <Nav onSearch={onSearch}
                clearFilter={clearFilter}
                changeOrderBreeds={changeOrderBreeds}
                order={filtered?orderForFiltered:orderForAll}
                />

                <Paginator setPage={setPage}
                setPageChange={setPageChange}
                cardsPerPage={cardsPerPage}
                page={page}
                dataLength={filtered?filteredBreeds.length:allBreeds.length}
                />
                {filtered?filteredBreeds.length?<Cards breeds={breeds} />: <Loading />:allBreeds.length?<Cards breeds={breeds} />: <Loading />}
            </>
                    
                )
};