import { useState } from 'react';
import styles from './SelectTemp.module.css';
import axios from 'axios';
import { useEffect } from 'react';

export default function SelectTemp(props) {
    const [temperaments, setTemperaments] = useState([]);
    const [search, setSearch] = useState("");
    const [addable, setAddable] = useState(false);
    const [deletable, setDeletable] = useState(false);
    const[temperamentId, setTemperamentId] = useState();
    
    if(!temperaments.length){
        axios.get('http://localhost:3001/temperaments')
        .then((res)=>setTemperaments(res.data)); 
    }
    
    const handleSelect = (event)=>{
        const {value} = event.target;
        setSearch(value);
        setAddable(true);
    };
    const handleSearch = (event)=>{
        const {value} = event.target;
        setSearch(value);
        setTemperaments(temperaments.filter(
            temperament=>temperament.temperament.toLowerCase().includes(value.toLowerCase())
            ));
        setAddable(false);
    };
    const handleAdd = (event)=>{
        event.preventDefault();
        if(addable) {
            props.addTemperament(search,temperamentId);
            setSearch("");
            setTemperamentId();
            setTemperaments([]);
        }
        setAddable(false);
        setDeletable(true);
    };
    const handleDelete = ()=>{
        setDeletable(false);
        props.deleteTemps();
    };
    const handleId = (event)=>setTemperamentId(event.target.id);
    useEffect(()=>{},[search, temperaments]);
    return(
        <>
            <div className={styles.divSelect}>
                <div>
                    <button onClick={handleDelete} disabled={!deletable} className={styles.delete}><b>X</b></button>
                   <input onChange={handleSearch}  value={search} autoComplete='off' type="text" id="search" placeholder="Search..." />
                   <button disabled={!addable} onClick={handleAdd} className={styles.add}><b>+</b></button>
                </div>
                
                <select onChange={handleSelect} multiple>
                    {temperaments.map(temperament=>{
                return(
                  <>
                    <option onClick={handleId} value={temperament.temperament} id={temperament.id}>
                        {temperament.temperament}
                    </option>
                  </>
                ) 
              })}
                </select> 
            </div>
        </>
    )
}