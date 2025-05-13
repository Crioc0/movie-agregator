import { useQuery } from "@tanstack/react-query";
import { getGenres } from "../../api/movies";

import { GenreList } from "../../components/GenreList/GenreList";
import { GenreListLoader } from "../../components/GenreList/GenreListLoader/GenreListLoader";

export const GenresPage = () => {
  const { status, data } = useQuery({
    queryKey: ["genres"],
    queryFn: () => getGenres(),
    refetchOnWindowFocus: false,
  });

  switch (status) {
    case "pending":
      return <GenreListLoader />;
    case "success":
      return <GenreList genreList={data} />;
  }
};
