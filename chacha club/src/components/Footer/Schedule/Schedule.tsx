import { Box, Typography } from "@mui/material";

const Schedule = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={2}
      justifyContent={"flex-end"}
      textAlign={"right"}
      sx={{
        "@media (max-width: 900px)": {
          display: "none",
        },
      }}
    >
      <Typography variant="h6" color={"#FFFFFF"} mb={2}>
        Робочий час
      </Typography>
      <Typography variant="subtitle1" sx={{ color: "#FFFFFF" }}>
        Понеділок - п'ятниця: 08:00 - 23:00
      </Typography>
      <Typography variant="subtitle1" sx={{ color: "#FFFFFF" }}>
        Субота: 10:00 - 22:00
      </Typography>
      <Typography variant="subtitle1" sx={{ color: "#FFFFFF" }}>
        Неділя: 10:00 - 20:00
      </Typography>
    </Box>
  );
};

export default Schedule;
