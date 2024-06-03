import styled from "@mui/material/styles/styled";
import { Box, Button, Typography } from "@mui/material";

export const StyledIntro = styled(Box)`
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  min-height: 100vh;
  background-position: left; /* Change background-position to left */

  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-image 1s ease-in-out;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }
`;

export const IntroContentWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 0 160px;
  gap: 64px;
  z-index: 2;

  @media (max-width: 1200px) {
    padding: 0 100px;
  }

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

export const StyledIntroTitle = styled(Typography)`
  max-width: 880px;
  font-style: normal;
  font-size: 46px;
  line-height: 54px;
  color: #ffffff;
  text-shadow: 2px 2px 5px #000000;

  @media (max-width: 768px) {
    font-size: 32px;
    line-height: 40px;
  }
`;

export const StyledIntroSubtitle = styled(Typography)`
  max-width: 1120px;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 33px;

  color: #ffffff;
`;

export const StyledIntroButton = styled(Button)`
  width: 245px;
  height: 60px;
  color: #000;
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 35px;

  background: #ffffff;
  border-radius: 12px;

  &:hover {
    background: #8b2331;
    color: #ffffff;
  }

  @media (max-width: 768px) {
    width: 180px;
    height: 50px;
    font-size: 20px;
    line-height: 30px;
  }
`;
