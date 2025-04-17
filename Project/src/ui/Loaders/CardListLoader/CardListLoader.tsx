import { FC } from "react";
import "./CardListLoader.css";

export type TMovieCard = {
  type: "genreList" | "movie" | "movieByGenreList";
};

export const CardListLoader: FC<TMovieCard> = ({ type }) => {
  let count = 10;
  if (type === "genreList") {
    count = 8;
  }
  const skeletonItems = Array(count).fill(null);
  return (
    <>
      {type === "movieByGenreList" && <h2 className="skeleton__title"></h2>}
      <div className={type !== "genreList" ? "skeleton" : "skeleton-genre"}>
        {skeletonItems.map((_, index) => (
          <div
            key={index}
            className={
              type !== "genreList"
                ? "skeleton__item"
                : "skeleton__item skeleton__item--genre"
            }
            aria-label="Loading..."
          />
        ))}
      </div>
    </>
  );
};
