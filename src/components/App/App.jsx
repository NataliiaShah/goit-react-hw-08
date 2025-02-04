import { useEffect } from "react";
import RouteSection from "../RouteSection/RouteSection";
import { refreshUser } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";
import { useAuth } from "../../hooks/useAuth";
import { LinearProgress } from "@mui/material";

import AOS from "aos";
AOS.init();

function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  return isRefreshing ? (
    <LinearProgress />
  ) : (
    <>
      <RouteSection />
    </>
  );
}

export default App;