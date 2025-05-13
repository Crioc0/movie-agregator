import styles from "./GenreListLoader.module.scss";

export const GenreListLoader = () => {
  const skeletonItems = Array(8).fill(null);
  return (
    <>
      {/* <h2 className={styles.skeletonTitle}></h2> */}
      <div className={styles.skeleton}>
        {skeletonItems.map((_, index) => (
          <div
            key={index}
            className={styles.skeletonItem}
            aria-label="Loading..."
          />
        ))}
      </div>
    </>
  );
};
