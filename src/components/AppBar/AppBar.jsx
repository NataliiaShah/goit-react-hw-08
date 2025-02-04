import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import AuthNav from "../AuthNav/AuthNav";
import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";
import style from "./AppBar.module.css";
import clsx from "clsx";

import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const AppBar = () => {
  const { isLoggedIn } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={style.container}>
      <div data-aos="fade-down" className={style.navigation}>
        <div
          className={clsx(style.thumb, {
            [style.transparency]: scrolled,
          })}
        >
          <Navigation />
          {isLoggedIn ? <UserMenu /> : <AuthNav />}
        </div>
      </div>
    </header>
  );
};

export default AppBar;