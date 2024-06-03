import { Popper, Button, Box, Divider, Paper, Icon } from "@mui/material";
import { useState } from "react";
import { StyledUserPopper } from "./UserPopperStyles";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { logout } from "../../redux/slices/userSlice";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const UserPopper = ({ userName }: { userName: string | null }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return (
    <Box>
      <StyledUserPopper
        aria-describedby={anchorEl ? "simple-popper" : undefined}
        onClick={handleClick}
      >
        {userName}
      </StyledUserPopper>
      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        placement="bottom-end"
        id="simple-popper"
        sx={{
          zIndex: 1000,
          backgroundColor: "#DDD",
          borderRadius: "5px",
        }}
      >
        <Paper
          elevation={12}
          sx={{
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            width: "200px",
          }}
        >
          <Button>
            <Icon
              sx={{
                marginRight: "10px",
                width: "20px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AccountCircleOutlinedIcon />
            </Icon>
            <Link to={"/"}>Profile</Link>
          </Button>

          <Divider />
          <Button
            onClick={() => {
              dispatch(logout());
              window.location.reload();
            }}
          >
            <Icon
              sx={{
                marginRight: "10px",
                width: "20px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PowerSettingsNewOutlinedIcon />
            </Icon>
            Logout
          </Button>
        </Paper>
      </Popper>
    </Box>
  );
};

export default UserPopper;
