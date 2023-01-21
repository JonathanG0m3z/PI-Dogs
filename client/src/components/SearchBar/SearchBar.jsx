import styles from "./SearchBar.module.css"
import React from "react";

export default function SearchBar(props) {
   const [wanted, setWanted] = React.useState("");
   const [acceptableInput, setAcceptableInput] = React.useState(true);

   const validation = (wanted)=>{
      if(wanted.length<=3) setAcceptableInput(false);
      else {
         props.onSearch(wanted);
         setAcceptableInput(true);
      }
   };

   return (
      <>
      {!acceptableInput?<p className={styles.p}>Insufficient information</p>:''}
      <div>
         <input value={wanted} onChange={(event)=>setWanted(event.target.value)}
          className={acceptableInput?styles.inputSearch:styles.inputSearchFailed} type='search' />
         <button className={styles.buttonSearch} onClick={()=>validation(wanted)}>Buscar</button>
      </div>
      </>
   );
}
