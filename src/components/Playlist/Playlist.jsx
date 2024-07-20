import TrackList from "../TrackList/TrackList";
import Loading from "../Loading/Loading";

import styles from "./Playlist.module.css";

const Playlist = (props) => {

   const handleNameChange = (e) => {
      props.onNameChange(e.target.value);
   }

   return (
      <div className={styles.Playlist}>
         <input
            type="text"
            value={props.playlistName}
            placeholder="Playlist Name..."
            onChange={handleNameChange}
         />
         <button
            className={styles["Playlist-save"]}
            onClick={props.onSave}>
            SAVE TO SPOTIFY
         </button>
         <br />
         {props.isSaving ? <Loading /> :
            props.errorMessage ? <p className={styles.errorMessage}>{props.errorMessage}</p> :
               <br />
         }
         <br />
         <TrackList
            tracks={props.playlistTracks}
            onRemove={props.onRemove}
            isRemoval={true}
         />
      </div>
   )
}

export default Playlist;