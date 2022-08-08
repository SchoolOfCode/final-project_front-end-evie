import React, { memo } from "react";
import { withFormik, Form, FastField, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./styles.css";


const Schema = Yup.object().shape({
  login: Yup.string()
    .min(2, "Too Short!")
    .required("Required Login!"),
  password: Yup.string()
    .min(6, "Too Short!")
    .required("Required Password!")
});
const FormModal = () => {
  return (
    <Form>
      <div className="box">
        <label htmlFor="login">Login:</label>
        <FastField name="login" placeholder="login" />
        <span className="msg-error">
          <ErrorMessage name="login" />
        </span>
      </div>
      <div className="box">
        <label htmlFor="password">Password:</label>
        <FastField name="password" type="password" />
        <span className="msg-error">
          <ErrorMessage name="password" />
        </span>
      </div>
      <button className="button" type="submit">
        Send
      </button>
    </Form>
  );
};
const enhanceWithFormik = withFormik({
  mapPropsToValues: () => ({ login: "", password: "" }),
  validationSchema: Schema,
  handleSubmit: values => {
    console.log(values);
  }
});
export default enhanceWithFormik(memo(FormModal));