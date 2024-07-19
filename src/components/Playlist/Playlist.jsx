import TrackList from "../TrackList/TrackList";

import styles from "./Playlist.module.css";

const Playlist = (props) => {

   const handleNameChange = (e) => {
      props.onNameChange(e.target.value);
   }

   return (
      <div className={styles.Playlist}>
         <input
            type="text"
            // defaultValue={"Playlist Name"}
            placeholder="Playlist Name..."
            onChange={handleNameChange}
         />
         <TrackList
            tracks={props.playlistTracks}
            onRemove={props.onRemove}
            isRemoval={true}
         />
         <button
            className={styles["Playlist-save"]}
            onClick={props.onSave}>
            SAVE TO SPOTIFY
         </button>
      </div>
   )
}

export default Playlist;