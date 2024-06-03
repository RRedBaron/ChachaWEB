import { Box, Typography } from "@mui/material";
import CategoryTabs from "../CategoryTabs/CategoryTabs";

const Menu = () => {
  return (
    <Box
      sx={{
        minHeight: "117vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
      py={5}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          backgroundImage: "url('/preloader-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <Box>
        <Typography
          variant="h2"
          textAlign="center"
          fontFamily={"Regular Vibes"}
          color={"white"}
          fontSize={"102px"}
          fontWeight={500}
        >
          Menu
        </Typography>
      </Box>

      <CategoryTabs />
    </Box>
  );
};

export default Menu;
