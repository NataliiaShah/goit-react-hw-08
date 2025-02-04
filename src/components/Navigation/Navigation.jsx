import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import style from "./Navigation.module.css";
import clsx from "clsx";

const Navigation = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const getMenuItemClass = (to) => {
    return to === location.pathname
      ? clsx(style.navLink, style.active)
      : style.navLink;
  };
  return (
    <nav className={style.navMenu}>
      <NavLink to="/" className={`${getMenuItemClass("/")} ${style.marRight}`}>
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink to="/contacts" className={getMenuItemClass("/contacts")}>
          Contacts
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;