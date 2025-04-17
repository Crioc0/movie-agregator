import axios from "axios";

const API_URL = "https://cinemaguide.skillbox.cc";

export const addFavourites = async (id: string) => {
  try {
    await axios.post(
      `${API_URL}/favorites`,
      { id: id },
      {
        withCredentials: true,
      }
    );
    return id;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      if (e.response?.status === 409) {
        throw new Error("Такой email уже существует");
      }
    }
    throw new Error("Ошибка при подключении к серверу");
  }
};

export const getFavourites = async () => {
  try {
    const promise = await axios.get(`${API_URL}/favorites`, {
      withCredentials: true,
    });
    return promise.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      if (e.response?.status === 409) {
        throw new Error("Такой email уже существует");
      }
    }
    throw new Error("Ошибка при подключении к серверу");
  }
};

export const deleteFavourites = async (movieId: number | undefined) => {
  try {
    const promise = await axios.delete(`${API_URL}/favorites/${movieId}`, {
      withCredentials: true,
    });
    return promise.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      if (e.response?.status === 409) {
        throw new Error("Такой email уже существует");
      }
    }
    throw new Error("Ошибка при подключении к серверу");
  }
};
