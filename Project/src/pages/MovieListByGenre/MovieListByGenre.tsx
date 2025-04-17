import { useInfiniteQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import { getMoviesByGenre } from "../../api/movies";
import { MovieCard } from "../../components/MovieCard/MovieCard";
import { TMovie } from "../../types/Movie";

import "./MovieListByGenre.css";
import { CardListLoader } from "../../ui/Loaders/CardListLoader/CardListLoader";
import { Button } from "../../ui/Button/Button";

type GenreParam = {
  genre: string | undefined;
};

const LIMIT = 15;

export const MovieListByGenre = () => {
  const { genre } = useParams<GenreParam>();
  const { data, fetchNextPage, hasNextPage, isLoading, isSuccess } =
    useInfiniteQuery({
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

  return (
    <>
      {isLoading && <CardListLoader type="movieByGenreList" />}
      {isSuccess && (
        <>
          <div>
            <Link className="backlink" to="../genres">
              &lt; {genre}
            </Link>
          </div>
          <div className="genre-page">
            <ul className="film-list genre-page__film-list">
              {data.pages.map((page) =>
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
