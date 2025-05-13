import { useInfiniteQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { getMoviesByGenre } from "../../api/movies";
import { MovieCard } from "../../components/MovieCard/MovieCard";
import { TMovie } from "../../types/Movie";
import styles from "./MovielListByGenre.module.scss";


import { Button } from "../../ui/Button/Button";
import { MovieListByGenreLoader } from "./Loader/MovieListByGenreLoader";

type GenreParam = {
  genre: string | undefined;
};

const LIMIT = 15;

export const MovieListByGenre = () => {
  const { genre } = useParams<GenreParam>();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isSuccess,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["movies", genre],
    queryFn: getMoviesByGenre,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0 || lastPage.length < LIMIT) {
        return undefined;
      }
      return allPages.length + 1;
    },
    retry: 2,
  });
  console.log(data);

  return (
    <>
      {isLoading && <MovieListByGenreLoader type="first" />}
      {isFetchingNextPage && <MovieListByGenreLoader />}
      {isSuccess && (
        <>
          <div>
            <Link className={styles.backlink} to="../genres">
              &lt; {genre}
            </Link>
          </div>
          <div className={styles.container}>
            <ul className={styles.filmList}>
              {data.pages.map((page: TMovie[]) =>
                page.map((item: TMovie) => (
                  <li key={item.id}>
                    <MovieCard
                      id={item.id}
                      url={item.posterUrl}
                      alt={item.title}
                    />
                  </li>
                ))
              )}
            </ul>
            <Button
              type="button"
              style="primary"
              disabled={!hasNextPage}
              onClick={() => fetchNextPage()}
            >
              Показать еще
            </Button>
          </div>
        </>
      )}
    </>
  );
};
