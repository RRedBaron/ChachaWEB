import { AppBar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "@mui/material/styles/styled";

export const StyledAppBar = styled(AppBar)`
  padding: 5px 140px;
  background-color: #8b2331;
  align-items: center;
  flex-direction: row;
  top: 0;
  z-index: 998;

  @media (max-width: 1200px) {
    padding: 5px 100px;
  }

  @media (max-width: 768px) {
    padding: 5px 20px;
  }
`;

export const StyledLogoText = styled(Typography)`
  font-size: 32px;
`;

export const SignInWrapper = styled("div")`
  display: flex;
  align-items: center;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.01);
  }
`;

export const StyledSignInText = styled(Typography)`
  font-size: 18px;
`;

export const LogInIconWrapper = styled("div")`
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
