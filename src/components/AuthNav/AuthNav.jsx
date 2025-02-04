import { NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";
import style from "./AuthNav.module.css";

const AuthNav = () => {
  const location = useLocation();
  const getMenuItemClass = (to) => {
    return to === location.pathname
      ? clsx(style.link, style.active)
      : style.link;
  };
  return (
    <div className={style.authMenu}>
      <NavLink className={getMenuItemClass("/register")} to="/register">
        Sign Up
      </NavLink>
      <NavLink className={getMenuItemClass("/login")} to="/login">
        Sign In
      </NavLink>
    </div>
  );
};

export default AuthNav;