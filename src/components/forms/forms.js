// import React from "react";
// import { Formik } from "formik";
// import "./styles.css";

// //The Gist - formik keeps track ofyour form's state and then exposes it plus a few re-useable methods and handlers.
// // Don't think we need this???

// const Basic = () => (
//   <div>
//     <h1>Anywhere in your app!</h1>
//     <Formik
//       initialValues={{ review: "" }}
//       validate={(values) => {
//         const errors = {};
//         if (!values.review) {
//           errors.review = "Required";
//         } else if (
//           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.review)
//         ) {
//           errors.review = "not enough characters";
//         }
//         return errors;
//       }}
//       onSubmit={(values, { setSubmitting }) => {
//         setTimeout(() => {
//           alert(JSON.stringify(values, null, 2));
//           setSubmitting(false);
//         }, 400);
//       }}
//     >
//       {({
//         values,
//         errors,
//         touched,
//         handleChange,
//         handleBlur,
//         handleSubmit,
//         isSubmitting,
//         /* and other goodies */
//       }) => (
//         <form onSubmit={handleSubmit}>
//           <input
//             type="review"
//             name="review"
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.email}
//           />
//           {errors.review && touched.review && errors.review}
//           <input
//             type="review"
//             name="review"
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.review}
//           />
//           {errors.review && touched.review && errors.review}
//           <button type="submit" disabled={isSubmitting}>
//             Submit
//           </button>
//         </form>
//       )}
//     </Formik>
//   </div>
// );

// export default Basic;
