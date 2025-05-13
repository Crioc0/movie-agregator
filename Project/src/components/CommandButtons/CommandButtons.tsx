import styles from "./CommandButtons.module.scss";
import { Button } from "../../ui/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { querieMovies } from "../../api/querieMovies";
import { setIsOpenTrailer } from "../Trailer/trailerSlice";

import { TMovie } from "../../types/Movie";
import useAddFavourite from "../../hooks/useAddFavourite";
import useRemoveFavourite from "../../hooks/useRemoveFavourite";
import { setIsOpenModal } from "../LoginComponent/authSlice";
import { Link } from "react-router";
import { Like } from "../../assets/Like";
import { Refresh } from "../../assets/Refresh";

type TCommandButtons = {
  type: "random" | "info";
  data: TMovie;
};

export const CommandButtons = ({ type, data }: TCommandButtons) => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, isOpenModal } = useSelector(
    (state: RootState) => state.auth
  );
  const { isOpenTrailer } = useSelector((state: RootState) => state.trailer);

  const handleUpdateClick = () => {
    querieMovies.invalidateQueries({ queryKey: ["randomMovie"] });
  };

  const handleOpenTrailer = () => {
    dispatch(setIsOpenTrailer(!isOpenTrailer));
  };

  const likeMutation = useAddFavourite();
  const removeMutation = useRemoveFavourite();

  const isFavourite = () => {
    return profile?.favorites?.includes(data?.id?.toString() ?? "") ?? false;
  };

  const handleLikeClick = () => {
    if (!profile) {
      dispatch(setIsOpenModal(!isOpenModal));
      return;
    }
    if (data?.id) {
      likeMutation.mutate(data.id);
    }
  };

  const handleRemoveClick = () => {
    if (!profile) {
      dispatch(setIsOpenModal(!isOpenModal));
      return;
    }
    if (data?.id) {
      removeMutation.mutate(data.id);
    }
  };
  return (
    <>
      <ul className={styles.commandList}>
        <li className={styles.commandItem}>
          <Button type="button" style="primary" onClick={handleOpenTrailer}>
            Трейлер
          </Button>
        </li>
        <li className={styles.commandItem}>
          {type === "random" && (
            <Link to={`../movie/${data.id}`}>
              <Button type="button" style="secondary">
                О фильме
              </Button>
            </Link>
          )}
        </li>
        <li className={styles.commandItem}>
          <Button
            onClick={isFavourite() ? handleRemoveClick : handleLikeClick}
            value={data.id}
            style="icon"
            type="button"
          >
            <Like isFavourite={isFavourite()} />
          </Button>
        </li>
        <li className={styles.commandItem}>
          {type === "random" && (
            <Button type="submit" style="icon" onClick={handleUpdateClick}>
              <Refresh />
            </Button>
          )}
        </li>
      </ul>
    </>
  );
};
