import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import logo from "../assets/logo.svg";
import { StyledDrawer, StyledTypography } from "../theme";
import { sidebarData } from "../constants";
import Profile from "./Profile";

function DrawerComponent() {
  return (
    <>
      <StyledDrawer variant="permanent" anchor="left">
        <Box
          sx={{
            position: "relative",
            padding: "0 5px",
          }}
        >
          <Box
            sx={{
              background: "#ffbf3f",
              position: "absolute",
              top: "25%",
              bottom: "25%",
              left: "9%",
              borderRadius: "8px",
              padding: "2px 5px",
            }}
          >
            <img src={logo} alt="logo" />
          </Box>
          <Box sx={{ marginLeft: "2.5em" }}>
            <StyledTypography component="h1">School Space</StyledTypography>
          </Box>
        </Box>
        <Divider />
        <List>
          {sidebarData.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
          <Box
            sx={{
              position: "fixed",
              bottom: 0,
            }}
          >
            <Profile />
          </Box>
        </List>
      </StyledDrawer>
      {/* <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      /> */}
    </>
  );
}

export default DrawerComponent;
