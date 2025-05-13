import { Button } from "../../../ui/Button/Button";
import { useMutation } from "@tanstack/react-query";
import {
  RegisterFormData,
  registerSchema,
  registerUser,
} from "../../../api/users";


import styles from "../Form.module.scss";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "../../../ui/FormField/FormField";
import { Mail } from "../../../assets/Mail";
import { UserIcon } from "../../../assets/UserIcon";
import { PasswordIcon } from "../../../assets/PasswordIcon";
import { FC } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../../store";

interface IRegisterForm {
  handleTypeClick: () => void;
}

export const RegisterForm: FC<IRegisterForm> = ({ handleTypeClick }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const { authType } = useSelector((state: RootState) => state.auth);

  const registerMutation = useMutation({
    mutationFn: (userData: RegisterFormData) => registerUser(userData),
  });
  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data);
  };

  if (registerMutation.isSuccess) {
    return (
      <>
        <h2 className={styles.form__title}>Регистрация завершена</h2>
        <p className={styles.form__descr}>
          Используйте вашу электронную почту для входа
        </p>
        <Button type="submit" style="primary" onClick={handleTypeClick}>
          Войти
        </Button>
      </>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.form__title}>Зарегистрироваться</h2>
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
          icon={<UserIcon errorMessage={errors.name?.message} />}
          errorMessage={errors.name?.message}
        >
          <input
            {...register("name")}
            type="text"
            className={styles.form__input}
            placeholder="Имя"
          />
        </FormField>
        <FormField
          icon={<UserIcon errorMessage={errors.surname?.message} />}
          errorMessage={errors.surname?.message}
        >
          <input
            {...register("surname")}
            type="text"
            className={styles.form__input}
            placeholder="Фамилия"
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
            autoComplete="new-password"
          />
        </FormField>

        <FormField
          icon={<PasswordIcon errorMessage={errors.confirmPassword?.message} />}
          errorMessage={errors.confirmPassword?.message}
        >
          <input
            {...register("confirmPassword")}
            type="password"
            className={styles.form__input}
            placeholder="Подтвердите пароль"
            autoComplete="new-password"
          />
        </FormField>

        {registerMutation.isError && (
          <div className="error-message server-error">
            Ошибка регистрации: {(registerMutation.error as Error).message}
          </div>
        )}
        <Button
          type="submit"
          style="primary"
          disabled={isSubmitting || registerMutation.isPending}
        >
          {registerMutation.isPending ? "Регистрация..." : "Зарегистрироваться"}
        </Button>
      </form>

      <Button type="button" style="withoutBorder" onClick={handleTypeClick}>
        {authType == "auth" ? "Регистрация" : "Уже есть аккаунт"}
      </Button>
    </div>
  );
};
