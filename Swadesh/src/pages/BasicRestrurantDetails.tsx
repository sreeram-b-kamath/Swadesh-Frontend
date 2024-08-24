import { Box, Typography, Button } from "@mui/material";
import React,{useState} from "react";
import TextField from "@mui/material/TextField";
import BasicDetailImg from "../assets/BasicDetailsBackground.png";

const BasicRestrurantDetails = () => {

    const[OwnerName,setOwnerName]=useState('');
    const[Address,setAddress]=useState('');
    const[ContactName,setContactName]=useState('');

    const handleOwnerNameChange = (e) => setOwnerName(e.target.value);
    const handleAddressChange = (e) => setAddress(e.target.value);
    const handleContactNameChange = (e) => setContactName(e.target.value);

    const handleConfirmClick = () => {
        console.log('Owner Name:', OwnerName);
        console.log('Address:', Address);
        console.log('Contact Name:', ContactName);
      };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${BasicDetailImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 4,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: 2,
       
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h5" sx={{ mb: 3 ,color:"black"}} >
          Add Basic Details
        </Typography>
        <TextField
          id="outlined-owner-name"
          label="Add Owner Name"
          variant="outlined"
          sx={{ mb: 2 }}
          onChange={handleOwnerNameChange}
        />
        <TextField
          id="outlined-address"
          label="Add Address"
          variant="outlined"
          sx={{ mb: 2 }}
          onChange={handleAddressChange}
        />
        <TextField
          id="outlined-contact-name"
          label="Add Contact Number"
          variant="outlined"
          onChange={handleContactNameChange}
        />
        <Button variant="contained" sx={{ m: 2, backgroundColor: "#006E1A" }} onClick={handleConfirmClick}>
          Confirm
        </Button>
      </Box>
    </Box>
  );
};

export default BasicRestrurantDetails;
