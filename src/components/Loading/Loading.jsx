import styles from "./Loading.module.css"

const Loading = () => {
   return (
      <div className={styles["loading-screen"]}>
         <div className={styles["loading-spinner"]}></div>
         <p>Saving playlist...</p>
      </div>
   );
};

export default Loading;