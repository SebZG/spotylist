import styles from "./Track.module.css";

const Track = (props) => {

   const renderAction = () => {
      return (
         <button className={styles["Track-action"]}>{props.isRemoval ? "-" : "+"}</button>
      )
   }

   return (
      <div className={styles.Track}>
         <div className={styles["Track-information"]}>
            <h3>{props.track.name}</h3>
            <p>{props.track.artist} | {props.track.album}</p>
         </div>
         {/* <button class="Track-action"><!-- + or - will go here --></button> */}
      </div>
   )
}
export default Track;