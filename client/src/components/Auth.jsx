import React from 'react'
import { Formik, Form, useField } from 'formik';
import * as Yup from "yup";

const Auth = () => {
  const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input className="text-input" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };
  return (
    <div>
      <>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: ""
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(2, "Length must be between 2 and 15 characters")
              .max(15, "Length must be between 2 and 15 characters")
              .required("Required"),
            email: Yup.string()
              .email("Invalid email addresss`")
              .required("Required"),
            password: Yup.string()
              .min(8, "Length must be between 8 and 128 characters")
              .max(128, "Length must be between 8 and 128 characters")
              .required("Required")
          })}
          onSubmit={async (values, { setSubmitting }) => {
            await new Promise(r => setTimeout(r, 500));
            setSubmitting(false);
          }}
        >
          <Form>
            <MyTextInput label="Name" name="name" type="text" placeholder="Enter your name" />
            <MyTextInput label="Email Address" name="email" type="email" placeholder="name@adress.com" />
            <MyTextInput label="Password" name="password" type="text" placeholder="Enter your password" />
            <button type="submit">Sign up</button>
          </Form>
        </Formik>
      </>
    </div>
  )
}

export default Auth