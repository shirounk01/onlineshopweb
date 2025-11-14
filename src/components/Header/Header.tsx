import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import type { FC } from "react";
import AdbIcon from "@mui/icons-material/Adb";
import React from "react";
import { Link } from "react-router-dom";

const homeObj = { route: "", name: "Home" };
const prodObj = { route: "products", name: "Products" };

const routes = [homeObj, prodObj];

export const Header: FC = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
    console.log(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const styleBox = {
    flexGrow: 1,
    display: { xs: "flex", md: "none" },
    fontSize: "50px",
  };

  const styleButton = {
    my: 2,
    color: "white",
    display: "block",
    fontSize: "16px",
    fontWeight: "bold",
  };

  const styleAppBar = {
    backgroundColor: "green",
  };

  return (
    <AppBar style={styleAppBar} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={styleBox}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {routes.map((obj) => (
                <MenuItem key={obj.route} onClick={handleCloseNavMenu}>
                  <Link style={{ textDecoration: "none" }} to={`/${obj.route}`}>
                    <Typography textAlign="center">{obj.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {routes.map((obj) => (
              <Link
                key={obj.route}
                style={{ textDecoration: "none", color: "white" }}
                to={`/${obj.route}`}
              >
                <Button onClick={handleCloseNavMenu} sx={styleButton}>
                  {obj.name}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
