import { useMutation } from "@tanstack/react-query";
import { deleteFavourites } from "../api/favourites";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { setProfile } from "../components/LoginComponent/authSlice";
import { querieMovies } from "../api/querieMovies";

export default function useRemoveFavourite() {
  const dispatch = useDispatch<AppDispatch>();
  const { profile } = useSelector((state: RootState) => state.auth);
  const removeFavourite = useMutation({
    mutationFn: (id: number) => deleteFavourites(id),
    onSuccess: () => {
      console.log("успешно");
      if (profile) {
        dispatch(
          setProfile({
            ...profile,
            favorites: profile.favorites?.filter((id) => id !== id.toString()),
          })
        );
      }
      querieMovies.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return removeFavourite;
}
