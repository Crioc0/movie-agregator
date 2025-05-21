import styles from "./MovieMainCardLoader.module.scss";

export const MovieMainCardLoader = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeletonContent}>
        <div className={styles.skeletonRaiting}></div>
        <div className={styles.skeletonTitle}></div>
        <div className={styles.skeletonText}></div>
        <div className={styles.skeletonCommand}>
          <div className={styles.skeletonButton}></div>
          <div className={styles.skeletonButton}></div>
        </div>
      </div>
      <div className={styles.skeletonImage}>
        <div className={styles.skeletonImageContent}></div>
      </div>
    </div>
  );
};
