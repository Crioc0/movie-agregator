import { TMovie } from "../../types/Movie";
import "./Raiting.css";
import Star from "../../assets/star.svg";

type TInfo = {
  movie: TMovie;
  size?: string;
};

const runtime = (time) => {
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
        className={
          size === undefined ? "info-list" : `info-list info-list--${size}`
        }
      >
        <li>
          <div
            style={{ background: color }}
            className={
              size === undefined ? "raiting" : `raiting raiting--${size}`
            }
          >
            <img className="star" src={Star} alt="" />
            <span>{movie.tmdbRating}</span>
          </div>
        </li>
        <li>
          <span className="info">{movie.releaseYear}</span>
        </li>
        <li>
          <span className="info">{movie.genres[0]}</span>
        </li>
        <li>
          <span className="info">
            {duration.hour} час {duration.minutes} мин
          </span>
        </li>
      </ul>
      <h2
        className={
          size === undefined
            ? "movie-title"
            : `movie-title movie-title--${size}`
        }
      >
        {movie.title}
      </h2>
    </>
  );
};
