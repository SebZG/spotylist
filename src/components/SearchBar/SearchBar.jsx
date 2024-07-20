import { useState, useEffect } from 'react';

import styles from "./SearchBar.module.css";

const SearchBar = (props) => {
   const [term, setTerm] = useState(localStorage.getItem("searchTerm") || "");

   const handleTermChange = (e) => {
      setTerm(e.target.value);
   }

   const search = () => {
      props.onSearch(term);
   }

   useEffect(() => {
      localStorage.setItem("searchTerm", term);
   }, [term]);

   useEffect(() => {
      props.onSearch(term);

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);


   return (
      <div className={styles.SearchBar}>
         <input
            type="text"
            placeholder="Enter a Song, Album, or Artist"
            value={term}
            onChange={handleTermChange}
         />
         {props.errorMessage && props.errorMessage}
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