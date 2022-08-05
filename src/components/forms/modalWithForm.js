import React, { memo } from "react";
import Modal from "react-responsive-modal";
import FormModal from "./form-modal";
import "./styles.css";
const ModalWithForm = ({ isOpen, handleClose, refModal }) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      center
      container={refModal.current}
      focusTrapped
    >
      <FormModal />
    </Modal>
  );
};
export default memo(ModalWithForm);