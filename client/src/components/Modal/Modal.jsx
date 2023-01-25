import styles from "./Modal.module.css";
import axios from 'axios';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFilterByTemperament, deleteAll, filterByDataSource } from "../../redux/actions";
import { useEffect } from "react";


export default function Modal({show, switchModal}){

  const [temperaments, setTemperaments] = useState([]);
  const [load, setLoad] = useState(false);
  const filters = useSelector(state=>state.filterByTemperament);
  const dataSource = useSelector(state=>state.filterByDataSource);

  const dispatch = useDispatch();

    if(!temperaments.length){
        axios.get('http://localhost:3001/temperaments')
        .then((res)=>setTemperaments(res.data)); 
    }

    const handleChangeSelect = (event)=>{
      const {value} = event.target;

      if((filters[0]==="All"&&value!=="All")||
        (filters[0]!=="All"&&value==="All")
      ) dispatch(deleteAll());

      dispatch(addFilterByTemperament(value));
      setLoad(!load);
    };

    const handleDataSource = (event)=>{
      dispatch(filterByDataSource(event.target.id));
    };

    const applyFilters = ()=>{
      console.log("Filters: ", filters);
      console.log("Data sources:", dataSource);
    };

    useEffect(()=>{},load)

    return(
        <div className={show ? styles.displayBlock : styles.displayNone}>
      <section className={styles.modalMain}>
        <div className={styles.divClose}>
          <button className={styles.closeButton} type="button" onClick={switchModal}><b>X</b></button>
        </div>
        <h1>Filters:</h1>
        <div className={styles.container}>
          <div className={styles.container2}>
            <h2>Filter by temperament</h2>
            <select onChange={handleChangeSelect} className={styles.select} id="temperaments_select">
              <option value="All">{filters.some(element=>element==='All')?'✅':''} All</option>
              {temperaments.map(temperament=>{
                return(
                  <>
                    <option className={styles.selectOption} value={temperament.id}>{
                      filters.some(element=>element==temperament.id)?'✅':''} {temperament.temperament}
                    </option>
                  </>
                ) 
              })}
            </select>
            
          </div>
          <div className={styles.container2}>
            <h2>Filter by data source</h2>
            {/* <input type="checkbox" id='both' />
            <label htmlFor="both">Both</label> */}
            <input defaultChecked={dataSource.some(data=>data==='api')} onChange={handleDataSource} type="checkbox" id='api' />
            <label htmlFor="api">External API</label>
            <input defaultChecked={dataSource.some(data=>data==='db')} onChange={handleDataSource} type="checkbox" id='db' />
            <label htmlFor="db">Database</label>
          </div>
        </div>
        <button onClick={applyFilters} className={styles.button}>Apply filters</button>
      </section>
    </div>
    )
};