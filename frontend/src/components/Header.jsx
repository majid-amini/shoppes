import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

const Header = () => {
  return (
    <div>
      <div className="mobile">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="static"
            sx={{ backgroundColor: "white", boxShadow: "none" }}
          >
            <Toolbar>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, color: "black", fontWeight: "bold" }}
              >
                Shoppes
              </Typography>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
              >
                <img src="/images/menu.png" alt="menu-icon" />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Box>
      </div>
      <div className="desktop"></div>
    </div>
  );
};

export default Header;
