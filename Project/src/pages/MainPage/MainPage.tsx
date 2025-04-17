import { useQueries } from "@tanstack/react-query";
import { getRandomMovie, getTop10Movies } from "../../api/movies";
import "./MainPage.css";
import { MovieInfoCard } from "../../components/MovieInfoCard/MovieInfoCard";
import { MovieCard } from "../../components/MovieCard/MovieCard";
import { CardListLoader } from "../../ui/Loaders/CardListLoader/CardListLoader";
import { CardInfoLoader } from "../../ui/Loaders/CardInfoLoader/CardInfoLoader";

export const MainPage = () => {
  const movieData = useQueries({
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
      {movieData[0].isLoading && <CardInfoLoader />}
      {movieData[0].isSuccess && (
        <MovieInfoCard movie={movieData[0].data} type="random" />
      )}
      <div className="container-top-10">
        <h2 className="title">Топ-10 фильмов</h2>
        {movieData[1].isLoading && <CardListLoader type="movieByGenreList" />}
        {movieData[1].isSuccess && (
          <ul className="film-list">
            {movieData[1].data.map((item, index) => {
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
