import { Box, Toolbar } from "@mui/material";
import {
  StyledAppBar,
  SignInWrapper,
  StyledSignInText,
  LogInIconWrapper,
} from "./HeaderStyles.ts";
import BrunchDiningIcon from "@mui/icons-material/BrunchDining";
import { Link } from "react-router-dom";
import SimplePopper from "../UserPopper/UserPopper.tsx";
import { useAppSelector } from "../../hooks/useAppSelector.ts";

const Header = () => {
  const username = useAppSelector((state) => state.user.user.username);

  return (
    <StyledAppBar position="absolute">
      <Toolbar
        sx={{
          width: "100%",
          justifyContent: "space-between",
          paddingLeft: "0",
          paddingRight: "0",
          paddingY: "5px",
        }}
      >
        <Box component={"div"} sx={{ display: "flex", alignItems: "center" }}>
          <Link to={"/"}>
            <img
              src={"/assets/logo.png"}
              alt={"Chacha Club"}
              width={"100%"}
              height={"80px"}
            />
          </Link>
        </Box>

        {username && <SimplePopper userName={username} />}
        {!username && (
          <Link to={"/login"}>
            <SignInWrapper>
              <LogInIconWrapper>
                <BrunchDiningIcon />
              </LogInIconWrapper>
              <StyledSignInText>Увійти</StyledSignInText>
            </SignInWrapper>
          </Link>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
