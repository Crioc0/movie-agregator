import { GenreCard } from "../../components/GenreCard/GenreCard";

import styles from "./GenresList.module.scss";
import { Link } from "react-router";

type TGenreList = {
  genreList: string[];
};

export const GenreList = ({ genreList }: TGenreList) => {
  return (
    <>
      <ul className={styles.genreList}>
        {genreList.map((genre: string, index: number) => {
          return (
            <li className={styles.genreItem}>
              <Link key={index} to={`/genres/${genre}`}>
                <GenreCard genre={genre} />
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};
