import axios from "axios";

import { TMovie } from "../types/Movie";
import { QueryFunctionContext } from "@tanstack/react-query";

const API_URL = "https://cinemaguide.skillbox.cc";

export const getRandomMovie = async (): Promise<TMovie> => {
  const response = await axios.get(`${API_URL}/movie/random`);
  return await response.data;
};

export const getTop10Movies = async (): Promise<TMovie[]> => {
  const response = await axios.get(`${API_URL}/movie/top10`);
  return await response.data;
};

export const getGenres = async () => {
  const response = await axios.get(`${API_URL}/movie/genres`);
  return await response.data;
};

type TFetchMovie = {
  pageParam: number;
  queryKey: QueryFunctionContext["queryKey"];
};

export const getMoviesByGenre = async ({
  pageParam = 1,
  queryKey,
}: TFetchMovie) => {
  const [, genre] = queryKey;
  const params: URLSearchParams = new URLSearchParams({
    genre: typeof genre === "string" ? genre : "",
    count: "15",
    page: pageParam.toString(),
  });

  const response = await fetch(
    `https://cinemaguide.skillbox.cc/movie?${params}`
  );

  if (!response.ok) throw new Error("Ошибка загрузки фильмов");
  return response.json();
};

export const getMovieByID = async (id: string | undefined) => {
  const response = await axios.get(`${API_URL}/movie/${id}`);
  return await response.data;
};

export const getMovieByTitle = async (title: string | undefined) => {
  const response = await axios.get(`${API_URL}/movie/?title=${title}&count=5`);
  return await response.data;
};
