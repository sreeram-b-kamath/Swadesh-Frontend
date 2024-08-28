import React from 'react';
import { Box } from '@mui/material';

import CustomRestriction from '../components/CustomCategoryRestriction/CustomRestriction';
const CustomRestrictions = () => {
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
      
      
       
        <CustomRestriction/>

    </Box>
  );
}

export default CustomRestrictions;
