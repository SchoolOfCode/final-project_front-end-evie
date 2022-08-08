import React, { useState, memo } from "react";
//FastField, ErrorMessage formik extra import could use after
import { withFormik, Form, } from "formik";
import * as Yup from "yup";
import ModalWithForm from "../forms/modalWithForm";
import "./styles.css";
const Schema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .required("Required Name!"),
  email: Yup.string()
    .email("Invalid email Email!")
    .required("Required")
});
const FormMain = ({ refModal }) => {
  const [open, setOpen] = useState(false);
  return (
    <Form>
      <ModalWithForm
        isOpen={open}
        refModal={refModal}
        handleClose={() => setOpen(false)}
      />
      <button
        className="button-modal"
        type="button"
        onClick={() => setOpen(true)}
      >
        Modal
      </button>
    </Form>
  );
};
const enhanceWithFormik = withFormik({
  validationSchema: Schema,
  handleSubmit: values => {
    console.log(values);
  }
});
export default enhanceWithFormik(memo(FormMain));