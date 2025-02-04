import clsx from "clsx";
import { useEffect, useState } from "react";
import style from "./ContainerModalForm.module.css";

const ContainerModalForm = ({ children, visible, setVisible }) => {
  const [modalVisible, setModalVisible] = useState(visible);
  const classStyle = clsx(style.backdrop, { [style.isOpen]: modalVisible });

  const handleModalClick = (event) => {
    if (event.target === event.currentTarget) {
      setVisible(false);
    }
  };

  useEffect(() => {
    setModalVisible(visible);
  }, [visible]);

  return (
    <div className={classStyle} onClick={handleModalClick}>
      <div className={style.modal}>{children}</div>
    </div>
  );
};

export default ContainerModalForm;