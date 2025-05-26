import { TMovie } from "../../types/Movie";

import styles from "./Raiting.module.scss";
import Star from "../../assets/star.svg";

type TInfo = {
  movie: TMovie;
  size?: string;
};

const runtime = (time: number) => {
  const minutes = time % 60;
  const hour = (time - minutes) / 60;
  return { minutes, hour };
};

export const Raiting = ({ movie, size }: TInfo) => {
  const duration = runtime(movie.runtime);
  let color = "green";
  if (movie.tmdbRating < 4) {
    color = "red";
  } else if (movie.tmdbRating < 6) {
    color = "yellow";
  }
  return (
    <>
      <ul
        className={`${styles.list} ${size !== undefined && styles.listSmall}`}
      >
        <li>
          <div
            style={{ background: color }}
            className={`${styles.raiting} ${
              size !== undefined && styles.raitingSmall
            }`}
          >
            <img className={styles.star} src={Star} alt="" />
            <span >{movie.tmdbRating}</span>
          </div>
        </li>
        <li>
          <span className={styles.info}>{movie.releaseYear}</span>
        </li>
        <li>
          <span className={styles.info}>{movie.genres[0]}</span>
        </li>
        <li>
          <span className={styles.info}>
            {duration.hour} час {duration.minutes} мин
          </span>
        </li>
      </ul>
      <h2
        className={`${styles.title}  ${
          size !== undefined && styles.titleSmall
        }`}
      >
        {movie.title}
      </h2>
    </>
  );
};
