import styles from "./MovieCard.module.scss";
import { useMutation } from "@tanstack/react-query";
import { deleteFavourites } from "../../api/favourites";
import { querieMovies } from "../../api/querieMovies";
import { Link } from "react-router";
import { Cross } from "../../assets/Cross";
import { useEffect, useState } from "react";

type TFilmCard = {
  url: string;
  position?: number | null;
  alt: string;
  type?: "favoutite";
  id: number;
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

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      setIsLoading(false);
    };
  }, [url]);

  return (
    <div className={styles.card}>
      {type && (
        <button className={styles.delete} onClick={handleRemove}>
          <Cross />
        </button>
      )}
      <Link to={`/movie/${id}`}>
        {position !== null && <div className={styles.position}>{position}</div>}
        {url !== null && isLoading ? (
          <div className={styles.placeholder}></div>
        ) : (
          <img
            className={url !== null ? styles.image : styles.noImage}
            src={url}
            alt={alt}
          />
        )}
      </Link>
    </div>
  );
};
