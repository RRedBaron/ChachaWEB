import { Box, Paper, Typography } from "@mui/material";
import SignInForm from "../components/Forms/SignInForm";
import { Link } from "react-router-dom";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";

const SignIn = () => {
  return (
    <Box
      minHeight={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        backgroundImage: "url('/assets/auth-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "right",
      }}
    >
      <Paper elevation={6}>
        <Link to="/">
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"right"}
            mt={2}
            mr={3}
          >
            <Typography variant="subtitle1" color={"#8b2331"}>
              На головну
            </Typography>
            <ArrowRightAltOutlinedIcon />
          </Box>
        </Link>

        <Typography
          component="h2"
          variant="h5"
          fontWeight={"Bold"}
          textAlign={"center"}
          mt={3}
        >
          Вітаємо в ЧаЧа Клаб!
        </Typography>
        <SignInForm />
        <Typography
          variant="subtitle1"
          color={"#000"}
          textAlign={"center"}
          mb={3}
        >
          Не маєте акаунту? <Link to="/signup">Зареєструйтесь!</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default SignIn;
