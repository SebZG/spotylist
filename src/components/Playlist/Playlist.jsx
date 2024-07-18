import styles from "./Playlist.module.css";

const Playlist = () => {
   return (
      <div className={styles.Playlist}>
         <input type="text" defaultValue={"New playlist"} />
         {/* Add TrackList */}
         <button className={styles["Playlist-save"]}>
            SAVE TO SPOTIFY
         </button>
      </div>
   )
}
export default Playlist;