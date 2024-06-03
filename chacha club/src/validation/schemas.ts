import * as yup from "yup";

export const signUpValidationSchema = yup.object({
  email: yup.string().email("Invalid email address").required("Required"),
  username: yup.string().required("Required"),
  password: yup.string().required("Required"),
  confirm: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Required"),
});

export const signInValidationSchema = yup.object({
  username: yup.string().required("Required"),
  password: yup.string().required("Required"),
});
