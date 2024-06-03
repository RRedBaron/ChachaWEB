import { Typography, Button, Box } from "@mui/material";
import JugIcon from "../components/JugIcon/JugIcon";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";

const Wrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});

const Heading = styled(Typography)({
  fontSize: "16rem",
  color: "gray",
  display: "flex",
  alignItems: "center",
  "@media screen and (max-width: 768px)": {
    fontSize: "9rem",
  },
});

const JugIconStyled = styled(JugIcon)({
  stroke: "gray",
  height: "14rem",
  width: "auto",
  "@media screen and (max-width: 768px)": {
    height: "7.7rem",
  },
});

const Description = styled(Typography)({
  fontSize: "1.5rem",
  fontFamily: "Satoshi 500",
  color: "gray",
  textAlign: "center",
  "@media screen and (max-width: 768px)": {
    fontSize: "1rem",
  },
});

const GoBackButton = styled(Button)({
  marginTop: "1.5rem",
  fontFamily: "Satoshi 700",
  backgroundColor: "#2e2e31",
  color: "gray",
  textTransform: "uppercase",
  borderRadius: "0.5rem",
  padding: "0 1rem",
  letterSpacing: "1px",
  fontSize: "1.3rem",
  height: "2.5rem",
  "&:hover": {
    backgroundColor: "gray",
    color: "#dddddd",
  },
  "@media screen and (max-width: 768px)": {
    fontSize: "1rem",
    height: "1.8rem",
  },
});

const NotFound = () => {
  function goBack() {}

  return (
    <Wrapper component={"section"}>
      <Heading variant="h1">
        4
        <JugIconStyled />4
      </Heading>
      <Description>Сторінка, яку ви шукаєте, не існує.</Description>
      <GoBackButton onClick={goBack}>
        <Link to={"/"}>На головну</Link>
      </GoBackButton>
    </Wrapper>
  );
};

export default NotFound;
