import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./components/Header/Header";
import "./styles.css";
import { Box, keyframes, Paper, Typography } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

function App() {
  const location = useLocation();
  const isDefaultPage = location.pathname === "/";

  const rotateAnimation = keyframes`
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(180deg); }
`;

  const iconStyle = {
    height: "75%",
    width: "auto",
    color: "#2196f3",
    animation: `${rotateAnimation} 4s linear infinite`,
  };

  return (
    <div>
      <Header />

      {isDefaultPage && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="80vh"
        >
          <ShoppingBagIcon sx={iconStyle} />

          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography fontSize={24}>Welcome to the Online Shop!</Typography>
          </Paper>
        </Box>
      )}

      <Outlet />
    </div>
  );
}

export default App;
