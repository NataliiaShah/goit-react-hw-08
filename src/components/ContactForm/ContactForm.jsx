import { ErrorMessage, Field, Form, Formik } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import { BsPhone, BsPerson } from "react-icons/bs";

import css from "./ContactForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import { initialValues } from "../../redux/contacts/constants";
import { selectIsAddingContact } from "../../redux/contacts/selectors";
import { CircularProgress } from "@mui/material";

export const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .matches(
      /^\d{3}-\d{3}-\d{4}$/,
      "Invalid phone number format (xxx-xxx-xxxx)"
    )
    .required("Required"),
});

const ContactForm = () => {
  const dispatch = useDispatch();
  const addingContact = useSelector(selectIsAddingContact);

  const nameId = useId();
  const numberId = useId();

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values));
    !addingContact && actions.resetForm();
  };

  return (
    <div
      data-aos="fade-up"
      data-aos-anchor-placement="top-center"
      className={css.thumbForm}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={FeedbackSchema}
      >
        {({ errors, touched }) => (
          <Form className={css.containerForm}>
            <label className={css.formLabel} htmlFor={nameId}>
              Name
            </label>

            <div className={css.thumb}>
              <Field
                className={`${css.formInput} ${
                  errors.name && touched.name && css.errorName
                }`}
                type="text"
                name="name"
                id={nameId}
                placeholder="Name"
              />
              <BsPerson className={css.iconInput} size="20" />
            </div>
            <ErrorMessage
              className={css.errorSpan}
              name="name"
              component="span"
            />

            <label className={css.formLabel} htmlFor={numberId}>
              Phone
            </label>

            <div className={css.thumb}>
              <Field
                className={`${css.formInput} ${
                  errors.number && touched.number && css.errorNumber
                }`}
                type="text"
                name="number"
                id={numberId}
                placeholder="xxx-xxx-xxxx"
                maxLength={12}
              />
              <BsPhone className={css.iconInput} size="20" />
            </div>
            <ErrorMessage
              className={css.errorSpan}
              name="number"
              component="span"
            />

            <button className={css.buttonAdd} type="submit">
              {addingContact ? (
                <CircularProgress className={css.progress} size={15} />
              ) : (
                "Add Contact"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;