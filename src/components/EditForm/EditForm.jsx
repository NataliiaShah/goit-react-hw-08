import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import style from "./EditForm.module.css";

const EditForm = ({ updateContact, setVisible, contact }) => {
  const [formData, setFormData] = useState({ name: "", number: "" });
  const [errors, setErrors] = useState({ name: "", number: "" });

  useEffect(() => {
    if (contact) {
      setFormData({ name: contact.name, number: contact.number });
    }
  }, [contact]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "number" && !/^\d{3}-\d{3}-\d{4}$/.test(value)) {
      setErrors({ ...errors, number: "Invalid phone number format" });
    } else {
      setErrors({ ...errors, number: "" });
    }
  };

  const handleUpdateClick = () => {
    updateContact({ id: contact.id, ...formData });
    setVisible(false);
  };

  const isFormValid = () => {
    return Object.values(errors).every((error) => error === "");
  };

  return (
    <>
      <div className={style.thumbInputEdit}>
        <TextField
          className={style.input}
          id="outlined-basic"
          label="Name"
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <TextField
          id="outlined-basic"
          label="Phone"
          variant="outlined"
          name="number"
          value={formData.number}
          onChange={handleInputChange}
          error={!!errors.number}
          helperText={errors.number}
        />
      </div>
      <div className={style.thumbBtnEdit}>
        <button
          className={style.btnActionEdit}
          type="button"
          onClick={handleUpdateClick}
          disabled={!isFormValid()}
        >
          Update
        </button>
        <button
          className={style.btnActionEdit}
          type="button"
          onClick={() => setVisible(false)}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default EditForm;