import React, { memo } from "react";
import { withFormik, Form, FastField, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./styles.css";

const Schema = Yup.object().shape({
  review: Yup.string().min(5, "Too Short!"),
  //password: Yup.string().min(6, "Too Short!").required("Required Password!"),
});
const FormModal = () => {
  return (
    <Form>
      <label htmlFor="Review Section">Review Section</label>
      <div className="box">
        <FastField
          className="textarea"
          name="review-section"
          placeholder="please type review here"
        />
        <FastField
          className="textarea"
          name="review-section"
          placeholder="a box for something else"
        />
        <span className="msg-error">
          <ErrorMessage name="review" />
        </span>
      </div>

      <button className="button" type="submit">
        Send
      </button>
    </Form>
  );
};
const enhanceWithFormik = withFormik({
  mapPropsToValues: () => ({ review: "" }),
  validationSchema: Schema,
  handleSubmit: (values) => {
    console.log(values);
  },
});
export default enhanceWithFormik(memo(FormModal));
