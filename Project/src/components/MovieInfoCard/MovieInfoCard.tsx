import { Button } from "../../ui/Button/Button";
import { Raiting } from "../../ui/Raiting/Raiting";

import "./MovieInfoCard.css";
import { querieMovies } from "../../api/querieMovies";
import { TMovie } from "../../types/Movie";
import { FC } from "react";
import { Like } from "../../assets/Like";
import { Refresh } from "../../assets/Refresh";
import { Link } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { addFavourites, deleteFavourites } from "../../api/favourites";

import { TProfile } from "../../types/Profile";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setIsOpenModal, setProfile } from "../LoginComponent/authSlice";
import { setIsOpenTrailer } from "../Trailer/trailerSlice";
import { Trailer } from "../Trailer/Trailer";

export type TMovieCard = {
  movie: TMovie;
  type: "random" | "info";
};

export const MovieInfoCard: FC<TMovieCard> = ({ movie, type }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, isOpenModal } = useSelector(
    (state: RootState) => state.auth
  );
  const { isOpenTrailer } = useSelector((state: RootState) => state.trailer);

  function handleUpdateClick() {
    querieMovies.invalidateQueries({ queryKey: ["randomMovie"] });
  }

  const likeMutation = useMutation({
    mutationFn: () => addFavourites(movie.id.toString()),
    onSuccess: () => {
      const updatedProfile = querieMovies.getQueryData<TProfile>(["user"]);

      if (updatedProfile) {
        dispatch(
          setProfile({
            ...updatedProfile,
            favorites: [
              ...(updatedProfile.favorites || []),
              movie.id.toString(),
            ],
          })
        );
      }

      querieMovies.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handleOpenClick = () => {
    dispatch(setIsOpenTrailer(!isOpenTrailer));
  };

  const removeFavourite = useMutation({
    mutationFn: () => deleteFavourites(movie.id),
    onSuccess: () => {
      if (profile) {
        dispatch(
          setProfile({
            ...profile,
            favorites: profile.favorites?.filter(
              (id) => id !== movie.id.toString()
            ),
          })
        );
      }
      querieMovies.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handleRemove = () => {
    removeFavourite.mutate();
  };

  const isFavourite = () => {
    return profile?.favorites?.includes(movie.id.toString()) ?? false;
  };

  const handleLikeClick = () => {
    if (profile === undefined) {
      dispatch(setIsOpenModal(!isOpenModal));

      return;
    }
    likeMutation.mutate();
  };

  return (
    <div>
      {isOpenTrailer !== undefined && (
        <Trailer trailerURL={movie.trailerYoutubeId} />
      )}
      <div className="card-container">
        <div className="content">
          <div className="content__text">
            <Raiting movie={movie} />
            <p className="content__descr">{movie.plot}</p>
          </div>
          <ul className="content__command-list">
            <li className="content__command-item">
              <Button type="button" style="primary" onClick={handleOpenClick}>
                Трейлер
              </Button>
            </li>
            <li className="content__command-item">
              {type === "random" && (
                <Link to={`../movie/${movie.id}`}>
                  <Button type="button" style="secondary">
                    О фильме
                  </Button>
                </Link>
              )}
            </li>
            <li className="content__command-item">
              <Button
                onClick={isFavourite() ? handleRemove : handleLikeClick}
                value={movie.id}
                style="icon"
                type="button"
              >
                <Like isFavourite={isFavourite()} />
              </Button>
            </li>
            <li className="content__command-item">
              {type === "random" && (
                <Button type="submit" style="icon" onClick={handleUpdateClick}>
                  <Refresh />
                </Button>
              )}
            </li>
          </ul>
        </div>
        <div className="card__img-container">
          <img className="movie-img" src={movie.posterUrl} alt="" />
        </div>
      </div>
      {type === "info" && (
        <div className="info">
          <h3 className="info__title">О фильме</h3>
          <div className="dot-container">
            <div className="dot-leader">
              <span className="label">Язык оригинала</span>
              <span className="dotten"></span>
              <span className="value">
                {movie.language ? movie.language : "Нет информации"}
              </span>
            </div>
            <div className="dot-leader">
              <span className="label">Бюджет</span>
              <span className="dotten"></span>
              <span className="value">
                {movie.budget ? movie.budget : "Нет информации"}
              </span>
            </div>
            <div className="dot-leader">
              <span className="label">Сумма выручки </span>
              <span className="dotten"></span>
              <span className="value">
                {movie.revenue ? movie.revenue : "Нет информации"}
              </span>
            </div>
            <div className="dot-leader">
              <span className="label">Режиссер</span>
              <span className="dotten"></span>
              <span className="value">
                {movie.director ? movie.director : "Нет информации"}
              </span>
            </div>
            <div className="dot-leader">
              <span className="label">Продакшен</span>
              <span className="dotten"></span>
              <span className="value">
                {movie.production ? movie.production : "Нет информации"}
              </span>
            </div>
            <div className="dot-leader">
              <span className="label">Награды</span>
              <span className="dotten"></span>
              <span className="value">
                {movie.awardSummary ? movie.awardSummary : "Нет информации"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
