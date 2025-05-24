import styles from "./AuthModal.module.scss";
import { Button } from "../../../ui/Button/Button";
import { LoginForm } from "../LoginForm.tsx/LoginForm";
import Logo from "../../../assets/marusya--black.svg";
import User from "../../../assets/user.svg";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import { NavLink } from "react-router";

import { useProfile } from "../../../hooks/useProfile";
import { CloseButton } from "../../../ui/CloseButton/CloseButton";
import { useDispatch, useSelector } from "react-redux";

import { setAuthType, setIsOpenModal } from "../authSlice";
import type { RootState, AppDispatch } from "../../../store";
import { Wrapper } from "../../../ui/Wrapper/Wrapper";

export const AuthModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, isOpenModal, authType } = useSelector(
    (state: RootState) => state.auth
  );

  const handleOpenClick = () => {
    dispatch(setIsOpenModal(!isOpenModal));
  };

  const { status, data } = useProfile();

  const handleTypeClick = () => {
    const newType = authType === "register" ? "auth" : "register";
    dispatch(setAuthType(newType));
  };

  return (
    <>
      {profile === undefined && (
        <>
          <div className={styles.authDesctop}>
            <Button style="auth" type="button" onClick={handleOpenClick}>
              Войти
            </Button>
          </div>
          <div className={styles.authMobile}>
            <Button style="mobile" type="button" onClick={handleOpenClick}>
              <img src={User} alt="" />
            </Button>
          </div>
        </>
      )}
      {status === "success" && (
        <NavLink className={"link"} to={"/profile"}>
          <div className={styles.authDesctop}>
            <Button style="auth" type="button">
              {data.name}
            </Button>
          </div>
          <div className={styles.authMobile}>
            <Button style="mobile" type="button">
              <img src={User} alt="" />
            </Button>
          </div>
        </NavLink>
      )}

      {isOpenModal !== undefined && (
        <Wrapper isOpenModal={isOpenModal}>
          <div
            className={`${styles.modal} ${
              isOpenModal ? styles.modalActive : styles.modalDisabled
            } ${authType === "register" && "form-auth--register"}`}
          >
            <div className={styles.header}>
              <img className={styles.logo} src={Logo} alt="" />
            </div>
            <CloseButton handleOpenClick={handleOpenClick} />
            {authType === "auth" ? (
              <LoginForm handleTypeClick={handleTypeClick} />
            ) : (
              <RegisterForm handleTypeClick={handleTypeClick} />
            )}
          </div>
        </Wrapper>
      )}
    </>
  );
};
