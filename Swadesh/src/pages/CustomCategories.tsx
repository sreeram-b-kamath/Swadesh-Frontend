import React from 'react';
import CustomCategory from '../components/CustomCategoryRestriction/CustomCategory';
import { Box } from '@mui/material';

const CustomCategories = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:"#F2FDEB"
     
      }}
    >
      
        <CustomCategory />

      
    </Box>
  );
}

export default CustomCategories;
