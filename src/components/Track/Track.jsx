import { useState } from 'react';

import styles from "./Track.module.css";

const Track = (props) => {
   const [isPlaying, setIsPlaying] = useState(false);
   const [audio, setAudio] = useState(null);

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

   const handlePlay = () => {
      if (audio) {
         if (isPlaying) {
            audio.pause();
            // props.audio.currentTime = 0; // Set the current time to 0
            setIsPlaying(false);
         } else {
            audio.play();
         }
         setIsPlaying(!isPlaying);
      } else {
         const newAudio = new Audio(props.track.preview_url);
         newAudio.play();
         setAudio(newAudio);
         setIsPlaying(true);
      }
   }

   return (
      <div className={styles.Track}>
         <div className={styles["Track-information"]}>
            <h3>{props.track.name}</h3>
            <p>{props.track.artist} | {props.track.album}</p>
            <button
               onClick={handlePlay}
               disabled={!props.track.preview_url}
            >
               {isPlaying ? "Pause" : "Play"}
            </button>
         </div>
         {renderAction()}
      </div>
   )
}

export default Track;