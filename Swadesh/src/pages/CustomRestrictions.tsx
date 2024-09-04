import React from "react";
import { Box } from "@mui/material";

import CustomRestriction from "../components/CustomCategoryRestriction/CustomRestriction";
import Navbar from "../components/AddToMenu/Navbar";
const CustomRestrictions = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#f5fffa",
        padding: "1rem 1rem",
      }}
    >
      <Navbar />
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5fffa",
        }}
      >
        <CustomRestriction />
      </Box>
    </Box>
  );
};

export default CustomRestrictions;
