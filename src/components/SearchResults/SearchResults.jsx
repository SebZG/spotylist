import TrackList from "../TrackList/TrackList";

import styles from "./SearchResults.module.css";

const SearchResults = (props) => {
   return (
      <diva className={styles.SearchResults}>
         <TrackList tracks={props.searchResults} />
      </diva>
   )
}
export default SearchResults;