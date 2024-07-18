import styles from "./Track.module.css";

const Track = () => {
   return (
      <div className={styles.Track}>
         <div className={styles["Track-information"]}>
            {/* <h3> Track Name </h3> */}
            {/* <p> Track Artist | Track Album </p> */}
         </div>
         {/* <button class="Track-action"><!-- + or - will go here --></button> */}
      </div>
   )
}
export default Track;