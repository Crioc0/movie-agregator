import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TProfile } from "../../types/Profile";

type AuthState = {
  profile: TProfile | undefined;
  isOpenModal: boolean | undefined;
  authType: "auth" | "register";
};

const initialState: AuthState = {
  profile: undefined,
  isOpenModal: undefined,
  authType: "auth",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<TProfile | undefined>) => {
      state.profile = action.payload;
    },
    setIsOpenModal: (state, action: PayloadAction<boolean | undefined>) => {
      state.isOpenModal = action.payload;
    },
    setAuthType: (state, action: PayloadAction<"auth" | "register">) => {
      state.authType = action.payload;
    },
  },
});

export const { setProfile, setIsOpenModal, setAuthType } = authSlice.actions;
export default authSlice.reducer;
