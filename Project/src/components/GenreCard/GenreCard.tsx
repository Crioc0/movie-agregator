import styles from "./GenreCard.module.scss";

type TGenre = {
  genre: string;
};

export const GenreCard = ({ genre }: TGenre) => {
  return (
    <div className={styles.card}>
      <img className={styles.img} src={`/assets/${genre}.jpg`} alt={genre} />
      <p className={styles.descr}>{genre}</p>
    </div>
  );
};
