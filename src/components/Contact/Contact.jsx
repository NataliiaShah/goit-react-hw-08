import { BsPhone, BsPerson, BsTrash } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";

import css from "./Contact.module.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact, updateContact } from "../../redux/contacts/contactsOps";
import ConfirmForm from "../ConfirmForm/ConfirmForm";
import { useState } from "react";
import EditForm from "../EditForm/EditForm";
import ContainerModalForm from "../ContainerModalForm/ContainerModalForm";
import {
  selectIsDeletingContact,
  selectIsEditingContact,
} from "../../redux/contacts/selectors";
import { CircularProgress } from "@mui/material";

const Contact = ({ data: { id, number, name } }) => {
  const dispatch = useDispatch();

  const [confirm, setConfirm] = useState(false);
  const [update, setUpadate] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);

  const isDeleteContact = useSelector(selectIsDeletingContact) === id;
  const isEditContact = useSelector(selectIsEditingContact) === id;

  const handleDeleteItem = () => {
    dispatch(deleteContact(id));
    setConfirm(false);
  };

  const handleUpdateContact = (updatedData) => {
    dispatch(updateContact(updatedData));
  };

  return (
    <>
      <div data-aos="zoom-out" className={css.containerContac}>
        <div className={css.thumbContact}>
          <h2 className={css.nameContact}>
            <BsPerson className={css.iconContact} size="22" />
            {name}
          </h2>
          <p className={css.numberContact}>
            <BsPhone className={css.iconContact} size="22" />
            {number}
          </p>
        </div>

        <div className={css.thumbBtn}>
          <button className={css.buttonAction} onClick={() => setConfirm(true)}>
            {isDeleteContact ? (
              <CircularProgress size={15} />
            ) : (
              <>
                <BsTrash className={css.iconContact} size="15" /> Delete
              </>
            )}
          </button>
          <button
            className={css.buttonAction}
            onClick={() => {
              setCurrentContact({ id, name, number });
              setUpadate(true);
            }}
          >
            {isEditContact ? (
              <CircularProgress size={15} />
            ) : (
              <>
                <FaRegEdit className={css.iconContact} size="15" /> Edit
              </>
            )}
          </button>
        </div>
      </div>

      <ContainerModalForm visible={confirm} setVisible={setConfirm}>
        <ConfirmForm onClick={handleDeleteItem} setVisible={setConfirm} />
      </ContainerModalForm>

      <ContainerModalForm visible={update} setVisible={setUpadate}>
        <EditForm
          updateContact={handleUpdateContact}
          contact={currentContact}
          setVisible={setUpadate}
        />
      </ContainerModalForm>
    </>
  );
};

export default Contact;