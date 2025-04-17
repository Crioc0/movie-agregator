import "./MovieCard.css";

import { useMutation } from "@tanstack/react-query";
import { deleteFavourites } from "../../api/favourites";
import { querieMovies } from "../../api/querieMovies";
import { Link } from "react-router";
import { Cross } from "../../assets/Cross";

type TFilmCard = {
  url: string;
  position?: number | null;
  alt: string;
  type?: "favoutite";
  id?: number;
};

export const MovieCard = ({
  url,
  alt,
  position = null,
  type,
  id,
}: TFilmCard) => {
  const removeFavoutite = useMutation({
    mutationFn: () => deleteFavourites(id),
    onSuccess() {
      querieMovies.invalidateQueries({ queryKey: ["favourites"] });
    },
  });

  const handleRemove = () => {
    removeFavoutite.mutate();
  };

  return (
    <div className="card">
      {type && (
        <button className="card__delete" onClick={handleRemove}>
          <Cross />
        </button>
      )}
      <Link to={`/movie/${id}`}>
        {position !== null && <div className="position">{position}</div>}
        <img
          className={url !== null ? "card__image" : "card__withoutIMG"}
          src={url}
          alt={alt}
        />
      </Link>
    </div>
  );
};
