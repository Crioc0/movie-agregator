import styles from "./MovieListByGenreLoader.module.scss";

type TProps = {
  type?: "first";
};

export const MovieListByGenreLoader = ({ type }: TProps) => {
  const skeletonItems = Array(10).fill(null);
  return (
    <>
      {type === "first" && <h1 className={styles.skeletonTitle}></h1>}
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
