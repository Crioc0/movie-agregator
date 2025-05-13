import { FC } from "react";
import { Button } from "../../../ui/Button/Button";

import styles from "../Form.module.scss";
import { useMutation } from "@tanstack/react-query";
import { loginSchema, loginUser, TLoginFormData } from "../../../api/users";
import { querieMovies } from "../../../api/querieMovies";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "../../../ui/FormField/FormField";
import { Mail } from "../../../assets/Mail";
import { PasswordIcon } from "../../../assets/PasswordIcon";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { setIsOpenModal } from "../authSlice";

interface IRegisterForm {
  handleTypeClick: () => void;
}

export const LoginForm: FC<IRegisterForm> = ({ handleTypeClick }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const dispatch = useDispatch<AppDispatch>();
  const { isOpenModal, authType } = useSelector(
    (state: RootState) => state.auth
  );

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess() {
      dispatch(setIsOpenModal(!isOpenModal));
      querieMovies.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const onSubmit = (data: TLoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <FormField
          icon={<Mail errorMessage={errors.email?.message} />}
          errorMessage={errors.email?.message}
        >
          <input
            {...register("email")}
            type="email"
            className={styles.form__input}
            placeholder="Электронная почта"
            autoComplete="email"
          />
        </FormField>
        <FormField
          icon={<PasswordIcon errorMessage={errors.password?.message} />}
          errorMessage={errors.password?.message}
        >
          <input
            {...register("password")}
            type="password"
            className={styles.form__input}
            placeholder="Пароль"
            autoComplete="current-password"
          />
        </FormField>

        {loginMutation.isError && (
          <div className="error-message server-error">
            Ошибка авторизации: {(loginMutation.error as Error).message}
          </div>
        )}

        <Button
          type="submit"
          style="primary"
          disabled={isSubmitting || loginMutation.isPending}
        >
          {loginMutation.isPending ? "Выполняется вход..." : "Войти"}
        </Button>
      </form>
      <Button type="button" style="withoutBorder" onClick={handleTypeClick}>
        {authType == "auth" ? "Регистрация" : "Уже есть аккаунт"}
      </Button>
    </div>
  );
};
