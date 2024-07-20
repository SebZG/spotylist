import Track from "../Track/Track";
// import TrackList from "../TrackList/TrackList";

import styles from "./SearchResults.module.css";

const SearchResults = (props) => {

   return (
      <div className={styles.SearchResults}>
         <h2>Results</h2>
         {/* <TrackList
            tracks={props.searchResults}
            onAdd={props.onAdd}
            isRemoval={false}
         /> */}
         {props.tracks.map((track) => (
            <Track
               key={track.id}
               track={track}
               onAdd={props.onAdd}
            />
         ))}
      </div>
   )
}

export default SearchResults;