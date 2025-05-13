import { useQueries } from "@tanstack/react-query";
import { getRandomMovie, getTop10Movies } from "../../api/movies";

import styles from "./MainPage.module.scss";
import { MovieCard } from "../../components/MovieCard/MovieCard";
// import { CardListLoader } from "../../ui/Loaders/CardListLoader/CardListLoader";
import { MovieMainCard } from "../../components/MovieMainCard/MovieMainCard";

import { MovieListByGenreLoader } from "../MovieListByGenre/Loader/MovieListByGenreLoader";
import { MovieMainCardLoader } from "../../components/MovieMainCard/MovieMainCardLoader/MovieMainCardLoader";

export const MainPage = () => {
  const [randomMovie, top10Movies] = useQueries({
    queries: [
      {
        queryKey: ["randomMovie"],
        queryFn: () => getRandomMovie(),
        refetchOnWindowFocus: false,
        staleTime: Infinity,
      },
      {
        queryKey: ["top10"],
        queryFn: () => getTop10Movies(),
        refetchOnWindowFocus: false,
        staleTime: Infinity,
      },
    ],
  });

  return (
    <>
      {randomMovie.isLoading && <MovieMainCardLoader />}
      {randomMovie.isSuccess && (
        <MovieMainCard movie={randomMovie.data} type="random" />
      )}
      <div className={styles.container}>
        <h2 className={styles.title}>Топ-10 фильмов</h2>
        {top10Movies.isLoading && <MovieListByGenreLoader />}
        {top10Movies.isSuccess && (
          <ul className={styles.list}>
            {top10Movies.data.map((item, index) => {
              return (
                <li key={item.id}>
                  <MovieCard
                    id={item.id}
                    url={item.posterUrl}
                    alt={item.title}
                    position={index + 1}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};
