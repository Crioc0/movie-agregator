import { useMutation } from "@tanstack/react-query";
import { logout } from "../../api/users";
import { Button } from "../../ui/Button/Button";
import "./SettingsPage.css";
import styles from "./SettingsPage.module.scss";
import { useNavigate } from "react-router-dom";
import { querieMovies } from "../../api/querieMovies";

import { useFirstLetters } from "../../hooks/useFirstLetters";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setProfile } from "../../components/LoginComponent/authSlice";
import { Mail } from "../../assets/Mail";

export const SettingsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      querieMovies.removeQueries({ queryKey: ["user"] });
      dispatch(setProfile(undefined));
      navigate("/");
    },
  });

  const handleClick = () => {
    logoutMutation.mutate();
  };

  const firstLetters = useFirstLetters(
    profile?.name || "",
    profile?.surname || ""
  );

  return (
    <div className={styles.container}>
      <ul className={styles.settingsList}>
        <li className={styles.settingsItem}>
          <div className={styles.leftBlock}>{firstLetters}</div>
          <ul>
            <li>Имя Фамилия</li>
            <li>
              {profile?.name} {profile?.surname}
            </li>
          </ul>
        </li>
        <li className={styles.settingsItem}>
          <div className={styles.leftBlock}>
            <Mail />
          </div>
          <ul>
            <li>Электронная почта</li>
            <li>{profile?.email}</li>
          </ul>
        </li>
      </ul>

      <Button onClick={handleClick} style="primary" type="button">
        Выйти
      </Button>
    </div>
  );
};
