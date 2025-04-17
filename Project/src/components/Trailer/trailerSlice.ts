import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Trailer = {
  isOpenTrailer: boolean | undefined;
};

const initialState: Trailer = {
  isOpenTrailer: undefined,
};

const trailerSlice = createSlice({
  name: "trailer",
  initialState,
  reducers: {
    setIsOpenTrailer: (state, action: PayloadAction<boolean | undefined>) => {
      state.isOpenTrailer = action.payload;
    },
  },
});

export const { setIsOpenTrailer } = trailerSlice.actions;
export default trailerSlice.reducer;
