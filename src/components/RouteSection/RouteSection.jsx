import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../Layout";
import RestrictedRoute from "../RestrictedRoute";
import PrivateRoute from "../PrivateRoute";

const Home = lazy(() => import("../../pages/Home/Home"));
const Register = lazy(() => import("../../pages/Register"));
const Login = lazy(() => import("../../pages/Login"));
const Contacts = lazy(() => import("../../pages/Contacts/Contacts"));
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage")
);

const RouteSection = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<Register />}
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute redirectTo="/contacts" component={<Login />} />
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute redirectTo="/login" component={<Contacts />} />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default RouteSection;