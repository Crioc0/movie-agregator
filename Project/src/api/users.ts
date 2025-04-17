import axios from "axios";
import { z } from "zod";
const API_URL = "https://cinemaguide.skillbox.cc";

export const loginSchema = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
});

export type TLoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    email: z.string().email("Некорректный email"),
    name: z.string().min(2, "Имя должно быть не менее 2 символов"),
    surname: z.string().min(2, "Фамилия должна быть не менее 2 символов"),
    password: z
      .string()
      .min(8, "Пароль должен быть не менее 8 символов")
      .regex(/[A-Z]/, "Должна быть хотя бы одна заглавная буква")
      .regex(/[0-9]/, "Должна быть хотя бы одна цифра"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export const registerUser = async ({
  email,
  password,
  name,
  surname,
}: RegisterFormData) => {
  try {
    await axios.post(`${API_URL}/user`, {
      email: email,
      password: password,
      name: name,
      surname: surname,
    });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      if (e.response?.status === 409) {
        throw new Error("Такой email уже существует");
      }
    }
    throw new Error("Ошибка при подключении к серверу");
  }
};

export const getErrorMessage = (error: Error) => {
  if (error.message.includes("409")) {
    return "Пользователь с таким email уже существует";
  }
  if (error.message.includes("400")) {
    return "Некорректные данные для регистрации";
  }
  return "Ошибка при регистрации. Попробуйте позже";
};

export const loginUser = async ({
  email,
  password,
}: TLoginFormData): Promise<void> => {
  await axios.post(
    `${API_URL}/auth/login`,
    {
      email: email,
      password: password,
    },
    {
      withCredentials: true,
    }
  );
};

export const fetchMe = async () => {
  try {
    const promise = await axios.get(`${API_URL}/profile`, {
      withCredentials: true,
    });
    return await promise.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      if (e.response?.status === 401) {
        throw new Error("Ошибка при подключении к серверу");
      }
    }
  }
};

export const logout = async () => {
  try {
    await axios.get(`${API_URL}/auth/logout`, {
      withCredentials: true,
    });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      if (e.response?.status === 404) {
        throw new Error("Ошибка при подключении к серверу");
      }
    }
  }
};
