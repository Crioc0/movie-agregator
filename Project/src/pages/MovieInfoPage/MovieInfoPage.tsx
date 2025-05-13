import { useQuery } from "@tanstack/react-query";
import { getMovieByID } from "../../api/movies";
import { useParams } from "react-router";


import { MovieMainCard } from "../../components/MovieMainCard/MovieMainCard";
import { MovieMainCardLoader } from "../../components/MovieMainCard/MovieMainCardLoader/MovieMainCardLoader";

export const MovieInfoPage = () => {
  const param = useParams();
  const { status, data } = useQuery({
    queryKey: ["movie", param.id],
    queryFn: () => getMovieByID(param.id),
  });
  switch (status) {
    case "pending":
      return <MovieMainCardLoader />;
    case "success":
      return <MovieMainCard movie={data} type="info" />;
  }
};
