import { useMutation } from "@tanstack/react-query";
import { addFavourites } from "../api/favourites";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { setProfile } from "../components/LoginComponent/authSlice";
import { querieMovies } from "../api/querieMovies";
import { TProfile } from "../types/Profile";

export default function useAddFavourite(id: number) {
  const dispatch = useDispatch<AppDispatch>();

  const likeMutation = useMutation({
    mutationFn: () => addFavourites(id.toString()),
    onSuccess: () => {
      const updatedProfile = querieMovies.getQueryData<TProfile>(["user"]);

      if (updatedProfile) {
        dispatch(
          setProfile({
            ...updatedProfile,
            favorites: [...(updatedProfile.favorites || []), id.toString()],
          })
        );
      }

      querieMovies.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return likeMutation;
}
