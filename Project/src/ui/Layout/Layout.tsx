import { ReactNode } from "react";
import { Header } from "../Header/Header";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { MainPage } from "../../pages/MainPage/MainPage";

import { GenresPage } from "../../pages/GenresPage/GenresList";
import { MovieListByGenre } from "../../pages/MovieListByGenre/MovieListByGenre";
import { MovieInfoPage } from "../../pages/MovieInfoPage/MovieInfoPage";
import { ProfilePage } from "../../pages/ProfilePage/ProfilePage";
import { FavouriteMoviesPage } from "../../pages/FavouriteMoviesPage/FavouriteMoviesPage";
import { SettingsPage } from "../../pages/SettingsPage/SettingsPage";
import { Footer } from "../Footer/Footer";

export const Layout = (): ReactNode => {
  return (
    <>
      <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<MainPage key={"main-page"} />} />
            <Route path="/genres" element={<GenresPage />} />
            <Route path="/genres/:genre" element={<MovieListByGenre />} />
            <Route path="/movie/:id" element={<MovieInfoPage />} />
            <Route path="/profile" element={<ProfilePage />}>
              <Route
                index
                element={<Navigate to="/profile/settings" replace />}
              />
              <Route
                path="/profile/favourites"
                element={<FavouriteMoviesPage />}
              />
              <Route
                index
                path="/profile/settings"
                element={<SettingsPage />}
              />
            </Route>
          </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
};
