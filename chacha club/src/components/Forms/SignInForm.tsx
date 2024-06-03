import { Formik, Form, Field } from "formik";
import { Button, TextField, Box, Typography } from "@mui/material";
import { signInValidationSchema } from "../../validation/schemas";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { loginUser, fetchUser, resetError } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useEffect, useState } from "react";

const SignInForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error } = useAppSelector((state) => state.user);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    turnstile.render("#captcha-container", {
      sitekey: import.meta.env.VITE_SITE_KEY,
      theme: "light",
      callback: function (token) {
        setToken(token);
      },
    });

    return () => {
      dispatch(resetError());
    };
  }, []);

  const handleSubmit = async (values: any) => {
    const data = {
      username: values.username,
      password: values.password,
      captchaToken: token,
    };

    await dispatch(loginUser(data)).then((res) => {
      if (res.payload) {
        dispatch(fetchUser());
        navigate("/");
      }
    });
  };

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={signInValidationSchema}
    >
      {({ values, handleChange, errors, touched }) => (
        <Box
          sx={{
            px: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Form style={{ width: "100%" }}>
            <Field
              as={TextField}
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              error={touched.username && Boolean(errors.username)}
              helperText={touched.username && errors.username}
            />
            <Field
              as={TextField}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
            <div
              id="captcha-container"
              style={{ height: "69px", marginTop: "10px" }}
            ></div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                py: 1.5,
                mt: 2,
                mb: 2,
                bgcolor: "#8b2331",
                "&:hover": {
                  bgcolor: "#8b2331",
                },
                borderRadius: "5px",
              }}
            >
              Sign In
            </Button>
            {error && (
              <Typography color="error" variant="body1" mb={2}>
                {error}
              </Typography>
            )}
          </Form>
        </Box>
      )}
    </Formik>
  );
};

export default SignInForm;
