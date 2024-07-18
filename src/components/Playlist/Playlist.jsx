import TrackList from "../TrackList/TrackList";

import styles from "./Playlist.module.css";

const Playlist = (props) => {
   return (
      <div className={styles.Playlist}>
         <input type="text" defaultValue={"New playlist"} />
         <TrackList tracks={props.playlistTracks} />
         <button className={styles["Playlist-save"]}>
            SAVE TO SPOTIFY
         </button>
      </div>
   )
}
export default Playlist;