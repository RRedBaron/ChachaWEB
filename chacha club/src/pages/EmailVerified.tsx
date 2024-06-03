import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { logout } from "../redux/slices/userSlice";
import Header from "../components/Header/Header";

const EmailVerified = () => {
  const { token } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/verify/${token}`);
    dispatch(logout());
  }, []);

  return (
    <>
      <Header />
      <Box
        minHeight={"100vh"}
        pt={"150px"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography variant={"h3"} color={"white"}>
          Email підтверджено
        </Typography>
        <Typography variant={"h5"} mt={3} color={"white"}>
          Увійдіть в свій акаунт для продовження
        </Typography>
        <Link to={"/login"}>
          <Button
            variant={"contained"}
            onClick={() => {
              dispatch(logout());
            }}
            sx={{
              mt: 3,
              px: 3,
              backgroundColor: "#8b2331",

              "&:hover": {
                backgroundColor: "#8b2331",
              },
            }}
          >
            До авторизації
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default EmailVerified;
