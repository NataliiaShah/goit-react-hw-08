import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useId, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import style from "../LoginForm/LoginForm.module.css";
import styleRegist from "./RegistrationForm.module.css";
import { RiLockPasswordLine, RiUser3Line } from "react-icons/ri";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { register } from "../../redux/auth/operations";
import { initialValuesSignUp } from "../../redux/auth/constants"
import loginBoy from "../../assets/img/sign-up/signup.png";
import loginLamp from "../../assets/img/sign-in/lampshade.png";

const validation = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
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

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const emailId = useId();
  const passwordId = useId();
  const nickId = useId();
  const [openPassword, setOpenPassword] = useState(false);

  const handleSubmit = (values, actions) => {
    dispatch(register(values));
    actions.resetForm();
  };

  const handelClick = () => {
    setOpenPassword((prevState) => !prevState);
  };

  return (
    <section className={style.bgLogin}>
      <div className={`${style.bgPosition} ${styleRegist.LogUpForm}`}>
        <div data-aos="fade-right" className={styleRegist.thumbFormRegist}>
          <h2 className={style.titleLogin}>Sign-Up</h2>
          <Formik
            initialValues={initialValuesSignUp}
            onSubmit={handleSubmit}
            validationSchema={validation}
          >
            {({ errors, touched }) => (
              <Form className={style.containerForm}>
                <div className={style.thumb}>
                  <Field
                    className={`${style.formInput} ${
                      errors.name && touched.name && style.errorNickname
                    }`}
                    type="text"
                    name="name"
                    id={nickId}
                    placeholder=" "
                  />
                  <label className={style.formLabel} htmlFor={nickId}>
                    Username
                  </label>
                  <RiUser3Line className={style.iconInput} size="20" />
                </div>
                <ErrorMessage
                  className={style.errorSpan}
                  name="name"
                  component="span"
                />

                <div className={style.thumb}>
                  <Field
                    className={`${style.formInput} ${
                      errors.email && touched.email && style.errorEmail
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
                      errors.password && touched.password && style.errorPassword
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
                <button className={styleRegist.buttonSignup} type="submit">
                  Sign Up
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <div className={styleRegist.bgImgForm}></div>
        <img
          data-aos="fade-left"
          className={styleRegist.loginBoy}
          src={loginBoy}
          alt="loginBoy"
        />
        <img
          data-aos="fade-down"
          className={styleRegist.loginLamp}
          src={loginLamp}
          alt="loginLamp"
        />
      </div>
    </section>
  );
};

export default RegistrationForm;