import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useId, useState } from "react";
import { logIn } from "../../redux/auth/operations";
import { initialValuesSignIn } from "../../redux/auth/constants";
import { ErrorMessage, Field, Form, Formik } from "formik";
import style from "./LoginForm.module.css";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import loginBoy from "../../assets/img/sign-in/signin.png";
import loginLamp from "../../assets/img/sign-in/lampshade.png";

const validation = Yup.object().shape({
  email: Yup.string().email().required("Required"),
  password: Yup.string()
    .required("Required")
    .min(8)
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
      "Password must contain at least one number, one uppercase and one lowercase letter."
      // Пароль повинен містити щонайменше одну цифру, одну велику та одну малу літеру.
    ),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const emailId = useId();
  const passwordId = useId();
  const [openPassword, setOpenPassword] = useState(false);

  const handleSubmit = (values, actions) => {
    dispatch(logIn(values));
    actions.resetForm();
  };
  const handelClick = () => {
    setOpenPassword((prevState) => !prevState);
  };

  return (
    <section className={style.bgLogin}>
      <div className={`${style.bgPosition} ${style.LogInForm}`}>
        <div data-aos="fade-right" className={style.thumbForm}>
          <h2 className={style.titleLogin}>Welcome back</h2>
          <Formik
            initialValues={initialValuesSignIn}
            onSubmit={handleSubmit}
            validationSchema={validation}
          >
            {({ errors, touched }) => (
              <Form className={style.containerForm}>
                <div className={style.thumb}>
                  <Field
                    className={`${style.formInput} ${
                      errors.email && touched.email && style.error
                    }`}
                    type="email"
                    name="email"
                    id={emailId}
                    placeholder=" "
                  />
                  <label className={style.formLabel} htmlFor={emailId}>
                    Email
                  </label>
                  <MdOutlineMailOutline className={style.iconInput} size="20" />
                </div>
                <ErrorMessage
                  className={style.errorSpan}
                  name="email"
                  component="span"
                />
                <div className={style.thumb}>
                  <Field
                    className={`${style.formInput} ${
                      errors.password && touched.password && style.error
                    }`}
                    type={openPassword ? "text" : "password"}
                    name="password"
                    id={passwordId}
                    placeholder=" "
                  />
                  <label className={style.formLabel} htmlFor={passwordId}>
                    Password
                  </label>
                  <RiLockPasswordLine className={style.iconInput} size="20" />
                  {openPassword ? (
                    <FaRegEye
                      className={style.iconInputPassword}
                      onClick={handelClick}
                      size="25"
                    />
                  ) : (
                    <FaRegEyeSlash
                      className={style.iconInputPassword}
                      size="25"
                      onClick={handelClick}
                    />
                  )}
                </div>
                <ErrorMessage
                  className={style.errorSpan}
                  name="password"
                  component="span"
                />
                <button className={style.buttonLogin} type="submit">
                  Sign In
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <div className={style.bgImgForm}></div>
        <img
          data-aos="fade-left"
          className={style.loginBoy}
          src={loginBoy}
          alt="loginBoy"
        />
        <img
          data-aos="fade-down"
          className={style.loginLamp}
          src={loginLamp}
          alt="loginLamp"
        />
      </div>
    </section>
  );
};

export default LoginForm;