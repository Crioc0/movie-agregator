import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "../api/users";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { setProfile } from "../components/LoginComponent/authSlice";

export const useProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile } = useSelector((state: RootState) => state.auth);

  const { data, status } = useQuery({
    queryKey: ["user"],
    queryFn: fetchMe,
    retry: 0,
    enabled: !profile,
  });

  useEffect(() => {
    if (data && !profile) {
      dispatch(setProfile(data));
    }
  }, [data, profile, dispatch]);

  return { status, data };
};
