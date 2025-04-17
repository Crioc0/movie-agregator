import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../src/components/LoginComponent/authSlice";
import trailerReducer from "../src/components/Trailer/trailerSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    trailer: trailerReducer,
  },
});

// Автоматически определяем RootState
export type RootState = ReturnType<typeof store.getState>;

// Тип для dispatch
export type AppDispatch = typeof store.dispatch;
