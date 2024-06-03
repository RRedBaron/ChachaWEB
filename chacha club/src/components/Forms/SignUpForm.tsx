import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import OutdoorGrillOutlinedIcon from "@mui/icons-material/OutdoorGrillOutlined";
import { Formik, Form, Field } from "formik";
import { signUpValidationSchema } from "../../validation/schemas";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  fetchUser,
  loginUser,
  registerUser,
  resetError,
} from "../../redux/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useEffect, useState } from "react";
import { setCookie } from "../../utils/cookie";

const SignUpForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.user);
  const [token, setToken] = useState<string>("");

  const handleSubmit = async (values: any) => {
    let user = {
      email: values.email,
      username: values.username,
      password: values.password,
      captchaToken: token,
    };
    await dispatch(registerUser(user)).then((res) => {
      if (res.payload) {
        setCookie("token", res.payload.access_token, 7);
        dispatch(fetchUser()).then(() => {
          navigate("/");
        });
      }
    });
  };

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

  return (
    <Formik
      initialValues={{
        email: "",
        username: "",
        password: "",
        confirm: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={signUpValidationSchema}
    >
      {({ values, handleChange, errors, touched }) => (
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Avatar sx={{ mb: 2, bgcolor: "#8b2331" }}>
            <OutdoorGrillOutlinedIcon />
          </Avatar>
          <Typography component="h2" variant="h5" fontWeight={"Bold"}>
            Вітаємо в ЧаЧа Клаб!
          </Typography>
          <Typography component="h4" variant="subtitle1">
            Зареєструйтеся, або <Link to="/login">увійдіть</Link> в свій акаунт,
            щоб продовжити
          </Typography>
          <Form>
            <Field
              as={TextField}
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email"
              type="email"
              id="email"
              autoComplete="email"
              autoFocus
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
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
            <Field
              as={TextField}
              margin="normal"
              required
              fullWidth
              name="confirm"
              label="Confirm password"
              type="password"
              id="confirm"
              autoComplete="current-password"
              error={touched.confirm && Boolean(errors.confirm)}
              helperText={touched.confirm && errors.confirm}
            />

            {error && (
              <Typography
                sx={{
                  color: "red",
                  fontSize: "0.8rem",
                  mt: 1,
                  mb: 1,
                }}
              >
                {error}
              </Typography>
            )}
            <div
              id="captcha-container"
              style={{ height: "69px", marginTop: "10px" }}
            ></div>
            {loading ? (
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
                Loading...
              </Button>
            ) : (
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
                Sign Up
              </Button>
            )}
          </Form>
        </Box>
      )}
    </Formik>
  );
};

export default SignUpForm;
