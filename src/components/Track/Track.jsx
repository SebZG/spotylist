import styles from "./Track.module.css";

const Track = (props) => {

   const addTrack = () => {
      props.onAdd(props.track);
   }

   const removeTrack = () => {
      props.onRemove(props.track);
   }

   const renderAction = () => {
      if (props.isRemoval) {
         return (
            <button className={styles["Track-action"]} onClick={removeTrack}> - </button>
         );
      } else {
         return (
            <button className={styles["Track-action"]} onClick={addTrack}> + </button>
         );
      }
   }


   return (
      <div className={styles.Track}>
         <div className={styles["Track-information"]}>
            <h3>{props.track.name}</h3>
            <p>{props.track.artist} | {props.track.album}</p>
         </div>
         {renderAction()}
      </div>
   )
}

export default Track;