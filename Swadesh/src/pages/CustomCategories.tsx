import React from "react";
import CustomCategory from "../components/CustomCategoryRestriction/CustomCategory";
import { Box } from "@mui/material";
import Navbar from "../components/AddToMenu/Navbar";

const CustomCategories = () => {
  return (
    <>
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
          <CustomCategory />
        </Box>
      </Box>
    </>
  );
};

export default CustomCategories;
