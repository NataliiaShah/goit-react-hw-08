import { useDispatch } from "react-redux";
import { useAuth } from "../../hooks/useAuth";
import { logOut } from "../../redux/auth/operations";
import { Avatar } from "@mui/material";
import style from "./UserMenu.module.css";

const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  return (
    <div className={style.userMenu}>
      <Avatar className={style.avatar}>{user.name.charAt(0)}</Avatar>
      <p className={style.welcomText}>Welcom, {user.name}</p>
      <button
        className={style.btnLogOut}
        type="button"
        onClick={() => dispatch(logOut())}
      >
        Sign Out
      </button>
    </div>
  );
};

export default UserMenu;