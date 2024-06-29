import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import defaultTheme from "../../themes/defaultTheme";

const Header = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            your-app-name
          </Typography>
          <Button
            color="primary"
            variant="contained"
            sx={{ marginRight: 1 }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button color="primary" variant="contained" onClick={handleRegister}>
            Register
          </Button>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
