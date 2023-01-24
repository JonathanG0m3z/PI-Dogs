import styles from "./SearchBar.module.css"
import React from "react";
import { useSelector } from "react-redux";

export default function SearchBar(props) {
   const [string, setString] = React.useState("");
   const stringRedux = useSelector(state=>state.filtered.wanted);
   const wanted = string===""?stringRedux:string;
   
   const [acceptableInput, setAcceptableInput] = React.useState(true);
   
   const validation = (wanted)=>{
      if(wanted.length<=3) setAcceptableInput(false);
      else {
         props.onSearch(wanted);
         setAcceptableInput(true);
      }
   };

   const clearFilter = ()=>{
      setAcceptableInput(true);
      props.clearFilter();
   };

   return (
      <>
      {!acceptableInput?<p className={styles.p}>Insufficient information</p>:''}
      <div>
         <input value={wanted} onChange={(event)=>setString(event.target.value)}
         className={acceptableInput?styles.inputSearch:styles.inputSearchFailed} type='search' />
          {wanted!==""?<button onClick={clearFilter} className={styles.xButton}>X</button>:''}        
         <button className={styles.buttonSearch} onClick={()=>validation(wanted)}>Search</button>
      </div>
      </>
   );
}
