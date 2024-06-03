import { Box, Typography } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Contacts = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={2}
      sx={{
        "@media (max-width: 900px)": {
          alignItems: "center",
        },
      }}
    >
      <Typography variant="h6" color={"#FFFFFF"} mb={2}>
        Наші контакти
      </Typography>
      <Box display={"flex"} alignItems={"center"}>
        <CallIcon sx={{ color: "#FFFFFF" }} />
        <Typography variant="subtitle1" sx={{ color: "#FFFFFF" }} ml={2}>
          +38 098 765 43 21
        </Typography>
      </Box>
      <Box display={"flex"} alignItems={"center"}>
        <MailOutlineIcon sx={{ color: "#FFFFFF" }} />
        <Typography variant="subtitle1" sx={{ color: "#FFFFFF" }} ml={2}>
          chachaclub@gmail.com
        </Typography>
      </Box>
      <Box display={"flex"} alignItems={"center"}>
        <LocationOnIcon sx={{ color: "#FFFFFF" }} />
        <Typography variant="subtitle1" sx={{ color: "#FFFFFF" }} ml={2}>
          м. Львів, вул. Левандівська, 13
        </Typography>
      </Box>
    </Box>
  );
};

export default Contacts;
