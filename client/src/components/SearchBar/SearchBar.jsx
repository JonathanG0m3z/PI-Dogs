import styles from "./SearchBar.module.css"
import React from "react";

export default function SearchBar(props) {
   const [characterId, setCharacterId] = React.useState("");
   return (
      <div>
         <input onChange={(event)=>setCharacterId(event.target.value)} className={styles.inputSearch} type='search' />
         <button className={styles.buttonSearch} onClick={()=> props.onSearch(characterId)}>Agregar</button>
      </div>
   );
}
