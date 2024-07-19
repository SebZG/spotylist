import { useState } from 'react';

import styles from "./SearchBar.module.css";

const SearchBar = (props) => {
   const [term, setTerm] = useState("");

   const handleTermChange = (e) => {
      setTerm(e.target.value);
   }

   const search = () => {
      props.onSearch(term);
   }

   return (
      <div className={styles.SearchBar}>
         <input
            type="text"
            placeholder="Enter a Song, Album, or Artist"
            onChange={handleTermChange}

         />
         <button
            className={styles.SearchButton}
            onClick={search}
         >
            SEARCH
         </button>
      </div>
   )
}
export default SearchBar;