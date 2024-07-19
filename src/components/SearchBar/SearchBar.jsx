import styles from "./SearchBar.module.css";

const SearchBar = () => {
   
   return (
      <div>
         <div className={styles.SearchBar}>
            <input type="text" placeholder="Enter a Song, Album, or Artist" />
         </div>
         <button className={styles["SearchButton"]}>
            SEARCH
         </button>
      </div>
   )
}
export default SearchBar;