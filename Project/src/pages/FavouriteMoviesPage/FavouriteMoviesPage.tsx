import { useQuery } from "@tanstack/react-query";
import { getFavourites } from "../../api/favourites";
import { MovieCard } from "../../components/MovieCard/MovieCard";
import { TMovie } from "../../types/Movie";

export const FavouriteMoviesPage = () => {
  const { data, status } = useQuery({
    queryKey: ["favourites"],
    queryFn: getFavourites,
  });

  switch (status) {
    case "success":
      return (
        <>
          <ul className="film-list">
            {data.map((item: TMovie) => (
              <li key={item.id}>
                <MovieCard
                  id={item.id}
                  type="favoutite"
                  url={item.posterUrl}
                  alt={item.title}
                />
              </li>
            ))}
          </ul>
        </>
      );
  }
};
