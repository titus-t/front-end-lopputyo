import { CssBaseline, Container, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, Outlet } from "react-router";

function App() {
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Personal Trainer
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Customers
          </Button>
          <Button color="inherit" component={Link} to="/trainings">
            Trainings
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </>
  );
}

export default App;