import { Drawer, Typography, styled } from "@mui/material";

export const StyledDrawer = styled(Drawer)(() => ({
  width: 240,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: 240,
    boxSizing: "border-box",
  },
}));

export const StyledTypography = styled(Typography)(() => ({
  fontWeight: "900",
  fontSize: "1.5rem",
  margin: "10px",
  padding: "10px",
  color: "#2CA4D8",
  fontFamily: "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
}));
