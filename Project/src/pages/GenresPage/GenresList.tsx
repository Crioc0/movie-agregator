import { useQuery } from "@tanstack/react-query";
import { getGenres } from "../../api/movies";
import { GenreCard } from "../../components/GenreCard/GenreCard";

import "./GenresPage.css";
import { Link } from "react-router";
import { CardListLoader } from "../../ui/Loaders/CardListLoader/CardListLoader";

export const GenresPage = () => {
  const { status, data } = useQuery({
    queryKey: ["genres"],
    queryFn: () => getGenres(),
    refetchOnWindowFocus: false,
  });

  switch (status) {
    case "pending":
      return <CardListLoader type="genreList" />;
    case "success":
      return (
        <>
          <ul className="genre-list">
            {data.map((genre: string, index: number) => {
              return (
                <li className="genre-item">
                  <Link key={index} to={`/genres/${genre}`}>
                    <GenreCard genre={genre} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      );
  }
};
