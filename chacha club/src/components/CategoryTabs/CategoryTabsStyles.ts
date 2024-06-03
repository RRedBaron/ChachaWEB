import { styled } from "@mui/system";
import { TabList } from "@mui/lab";
import { Tab } from "@mui/material";
import theme from "../../theme";
import { green } from "@mui/material/colors";
import { Opacity } from "@mui/icons-material";

export const StyledTabList = styled(TabList)(({ theme }) => ({
  maxWidth: 1344,
  margin: "0 auto",
}));

export const StyledTab = styled(Tab)({
  color: "#DDDDDD",
  fontSize: "1.5rem",
  textTransform: "none",
  opacity: 1,

  "&.Mui-selected": {
    color: "#8B2331",
  },
});
