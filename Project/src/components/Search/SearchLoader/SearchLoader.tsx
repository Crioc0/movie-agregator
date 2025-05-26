import styles from './SearchLoader.module.scss'

export const SearchLoader = () => {
  const count = 5;
  const skeletonItems = Array(count).fill(null);

  return (
    <>
      <ul className={styles.movieListSkeleton}>
        {skeletonItems.map((_, index) => (
          <li key={index} className={styles.movieItemSkeleton} aria-label="Loading..." />
        ))}
      </ul>
    </>
  );
};
