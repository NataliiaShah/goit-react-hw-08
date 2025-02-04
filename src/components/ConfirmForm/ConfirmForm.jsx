import style from "./ConfirmForm.module.css";

const ConfirmForm = ({ onClick, setVisible }) => {
  return (
    <>
      <p className={style.modalDelete}>
        Do you really want to delete the contact?
      </p>
      <div className={style.thumbBtnAction}>
        <button className={style.btnAction} type="button" onClick={onClick}>
          Yes
        </button>
        <button
          className={style.btnAction}
          type="button"
          onClick={() => setVisible(false)}
        >
          No
        </button>
      </div>
    </>
  );
};

export default ConfirmForm;