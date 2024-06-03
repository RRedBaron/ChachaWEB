import { Box, Typography } from "@mui/material";

const About = () => {
  return (
    <Box
      component={"section"}
      minHeight={"220px"}
      bgcolor={"#DDDDDD"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-evenly"}
    >
      <Typography maxWidth={"300px"} fontSize={"22px"}>
        <Box
          component={"span"}
          display={"inline"}
          fontSize={"26px"}
          fontWeight={"700"}
        >
          Грузинська
          <br />
        </Box>
        кухня поряд
      </Typography>
      <Typography maxWidth={"400px"} fontSize={"18px"}>
        Унікальна можливість насолодитися справжньою грузинською кухнею в серці
        міста. Від багатошарових хачапурі до ароматних хінкалі. Кожна страва
        віддзеркалює багатовікові традиції і гостинність країни.
      </Typography>
    </Box>
  );
};

export default About;
