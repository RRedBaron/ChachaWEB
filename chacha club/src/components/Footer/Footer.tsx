import { Box, Typography } from "@mui/material";
import Contacts from "./Contacts/Contacts";
import Schedule from "./Schedule/Schedule";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#8b2331",
        padding: "30px 150px",
        position: "sticky",
        top: "100%",

        "@media (max-width: 1200px)": {
          padding: "30px 100px",
        },

        "@media (max-width: 900px)": {
          padding: "30px 50px",
        },
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        sx={{
          "@media (max-width: 900px)": {
            flexDirection: "column",
          },
        }}
      >
        <Contacts />
        <Schedule />
      </Box>
      <Box textAlign={"center"} mt={4}>
        <Typography variant="subtitle1" sx={{ color: "#FFFFFF" }}>
          Copyright © 2024 by ChachaClub. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
