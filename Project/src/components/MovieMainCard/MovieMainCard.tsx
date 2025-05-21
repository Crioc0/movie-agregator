import styles from "./MovieMainCard.module.scss";

import { TMovie } from "../../types/Movie";
import { Raiting } from "../../ui/Raiting/Raiting";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Trailer } from "../Trailer/Trailer";
import { FC, useEffect, useState } from "react";
import { CommandButtons } from "../CommandButtons/CommandButtons";

export type TRandomCard = {
  movie: TMovie;
  type: "random" | "info";
};

export const MovieMainCard: FC<TRandomCard> = ({ movie, type }) => {
  const { isOpenTrailer } = useSelector((state: RootState) => state.trailer);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = movie.posterUrl;
    img.onload = () => {
      setIsLoading(false);
    };
  }, [movie.posterUrl]);

  return (
    <div>
      {isOpenTrailer && <Trailer trailerURL={movie.trailerYoutubeId} />}
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <div className={styles.info}>
            <Raiting movie={movie} />
            <p className={styles.descr}>{movie.plot}</p>
          </div>
          <CommandButtons type={type} data={movie} />
        </div>
        <div className={styles.imageContainer}>
          {movie.posterUrl !== null && isLoading ? (
            <div className={styles.placeholder}></div>
          ) : (
            <img
              className={movie.posterUrl !== null ? styles.image : styles.noImage}
              src={movie.posterUrl}
              alt={movie.title}
            />
          )}
        </div>
      </div>
      {type === "info" && (
        <>
          <h3 className={styles.aboutTitle}>О фильме</h3>
          <div className={styles.dotContainer}>
            {[
              { label: "Язык оригинала", value: movie.language },
              { label: "Бюджет", value: movie.budget },
              { label: "Сумма выручки", value: movie.revenue },
              { label: "Режиссер", value: movie.director },
              { label: "Продакшен", value: movie.production },
              { label: "Награды", value: movie.awardSummary },
            ].map((item, index) => (
              <div key={index} className={styles.dotLeader}>
                <span className={styles.label}>{item.label}</span>
                <span className={styles.dotten}></span>
                <span className={styles.value}>
                  {item.value ? item.value : "Нет информации"}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
