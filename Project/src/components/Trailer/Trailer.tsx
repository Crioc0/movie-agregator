import { useDispatch, useSelector } from "react-redux";
import { Wrapper } from "../../ui/Wrapper/Wrapper";
import "./Trailer.css";
import { RootState, AppDispatch } from "../../store";
import { CloseButton } from "../../ui/CloseButton/CloseButton";
import { setIsOpenTrailer } from "./trailerSlice";
import { FC } from "react";

interface ITrailer {
  trailerURL: string;
}

export const Trailer: FC<ITrailer> = ({ trailerURL }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isOpenTrailer } = useSelector((state: RootState) => state.trailer);
  const handleOpenClick = () => {
    dispatch(setIsOpenTrailer(!isOpenTrailer));
  };
  if (isOpenTrailer) {
    return (
      <Wrapper isOpenModal={isOpenTrailer}>
        <div className="trailer-contaner">
          <iframe
            src={trailerURL}
            width={`100%`}
            height={`100%`}
            allow="accelerometer; autoplay; encrypted-media; gyroscope"
          ></iframe>
          <CloseButton handleOpenClick={handleOpenClick} />
        </div>
      </Wrapper>
    );
  }
};
