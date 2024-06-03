import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto",
  },
  palette: {
    primary: {
      main: "#1E1E20",
    },
    secondary: {
      main: "#3f51b5",
    },
    text: {
      primary: "#FFFFFF",
    },
  },
});

export default theme;
