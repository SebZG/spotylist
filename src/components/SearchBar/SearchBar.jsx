import { useState, useEffect } from 'react';

import styles from "./SearchBar.module.css";

const SearchBar = (props) => {
   const [term, setTerm] = useState("");

   const handleTermChange = (e) => {
      setTerm(e.target.value);
   }

   const search = (e) => {
      // e.preventDefault();
      props.onSearch(term);
   }

   useEffect(() => {
      localStorage.setItem("searchTerm", term);
   }, [term]);

   return (
      <div className={styles.SearchBar}>
         <input
            type="text"
            placeholder="Enter a Song, Album, or Artist"
            value={term}
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