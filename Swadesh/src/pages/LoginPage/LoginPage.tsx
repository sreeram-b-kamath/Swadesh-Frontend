import Box from "@mui/material/Box";
import BackgroundImage from "../../assets/SwadeshRegisterBackgroundImage.png";
import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import Login from "../../components/LoginSignUp/Login";
import SignUp from "../../components/LoginSignUp/SignUp";

const LoginPage = () => {
  const [tabValue, setTabValue] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover", // Ensures the image covers the entire box
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "75%",
          width: "40%",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: "30px",
        }}
      >
        <Tabs
          onChange={handleChange}
          sx={{ border: "1px solid black", borderRadius: "40px" }}
        >
          <Tab
            label="Login"
            sx={{
              textTransform: "none",
              backgroundColor: tabValue === 0 ? "#006E1A" : "transparent",
              color: tabValue === 0 ? "white" : "black",
            }}
          />
          <Tab
            label="Register"
            sx={{
              textTransform: "none",
              backgroundColor: tabValue === 1 ? "#006E1A" : "transparent",
              color: tabValue === 1 ? "white" : "black",
            }}
          />
        </Tabs>
        {tabValue === 0 && <Login />}
        {tabValue === 1 && <SignUp />}
      </Box>
    </Box>
  );
};

export default LoginPage;
