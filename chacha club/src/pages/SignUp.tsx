import { Grid, Paper, Typography } from "@mui/material";
import SignUpForm from "../components/Forms/SignUpForm";
import { Link } from "react-router-dom";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import Box from "@mui/material/Box";

const SignUp = () => {
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url('/assets/auth-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "right",
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        alignItems={"center"}
      >
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
        <SignUpForm />
      </Grid>
    </Grid>
  );
};

export default SignUp;
