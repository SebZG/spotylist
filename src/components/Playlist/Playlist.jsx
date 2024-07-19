import TrackList from "../TrackList/TrackList";

import styles from "./Playlist.module.css";

const Playlist = (props) => {

   return (
      <div className={styles.Playlist}>
         <input type="text" defaultValue={"Playlist Name"} />
         <TrackList
            tracks={props.playlistTracks}
            onRemove={props.onRemove}
            isRemoval={true}
         />
         <button className={styles["Playlist-save"]}>
            SAVE TO SPOTIFY
         </button>
      </div>
   )
}
export default Playlist;