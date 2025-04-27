import { useQuery } from "@tanstack/react-query";
import { getMovieByID } from "../../api/movies";
import { useParams } from "react-router";
import { MovieInfoCard } from "../../components/MovieInfoCard/MovieInfoCard";
import { CardInfoLoader } from "../../ui/Loaders/CardInfoLoader/CardInfoLoader";

export const MovieInfoPage = () => {
  const param = useParams();
  const { status, data } = useQuery({
    queryKey: ["movie", param.id],
    queryFn: () => getMovieByID(param.id),
  });
  switch (status) {
    case "pending":
      return <CardInfoLoader />;
    case "success":
      return <MovieInfoCard movie={data} type="info" />;
  }
};
