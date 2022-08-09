import React from "react";
import ReactDOM from "react-dom";
import { Formik, Field, Form } from "formik";

const StarRating = () => (
  <div>
    <Formik
      initialValues={{
        picked: "",
      }}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ values }) => (
        <Form>
          <div id="my-radio-group">
            Rate this Charge point out of five stars
          </div>
          <div role="group" aria-labelledby="my-radio-group">
            <label>
              <Field type="radio" name="picked" value="One" />
              One ⭐
            </label>
            <br />
            <label>
              <Field type="radio" name="picked" value="Two" />
              Two ⭐⭐
            </label>
            <br />
            <label>
              <Field type="radio" name="picked" value="Three" />
              Three ⭐⭐⭐
            </label>
            <br />
            <label>
              <Field type="radio" name="picked" value="Four" />
              Four ⭐⭐⭐⭐
            </label>
            <br />
            <label>
              <Field type="radio" name="picked" value="Five" />
              Five ⭐⭐⭐⭐⭐
            </label>
            <div>You star rated this: {values.picked}</div>
          </div>

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
);

export default StarRating;
ReactDOM.render(<StarRating />, document.getElementById("root"));
