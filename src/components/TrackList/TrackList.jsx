import Track from "../Track/Track";
import styles from "./TrackList.module.css";

const TrackList = (props) => {

   return (
      <div className={styles.TrackList}>
         {props.tracks.map((track) => (
            <Track
               key={track.id}
               track={track}
               onAdd={props.onAdd}
               isRemoval={props.isRemoval}
               onRemove={props.onRemove}
            />
         ))}

      </div>
   )
}
export default TrackList;