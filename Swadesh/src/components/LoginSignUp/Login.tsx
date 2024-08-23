import { Box, Button, TextField } from "@mui/material";

const Login = () => {
  return (
    <Box
      sx={{
        height: "70%",
        width: "90%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <TextField id="email" label="Email" variant="outlined" />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <TextField id="password" label="Password" variant="outlined" />
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <a>Forgot Password?</a>
        </Box>
      </Box>
      <Button variant="contained" sx={{ backgroundColor: "#006E1A" }}>
        Login
      </Button>
    </Box>
  );
};

export default Login;
