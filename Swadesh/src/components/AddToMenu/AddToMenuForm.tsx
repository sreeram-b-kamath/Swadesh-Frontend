import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

export const AddToMenuForm = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("file uploaded", file.name);
    }
  };
  return (
    <>
      <Box sx={{ color: "#446732", fontWeight: "bold", marginTop: "10px" }}>
        Add to your menu
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          padding: "10px",
        }}
      >
        <FormControl variant="outlined">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography
                sx={{ color: "grey", fontSize: "13px", marginBottom: "10px" }}
              >
                Your Dish's Name
              </Typography>
              <TextField
                sx={{
                  "& .MuiInputLabel-root": {
                    fontSize: "12px",
                    color: "#446732",
                  },
                  "& .MuiInputBase-root": {
                    fontSize: "13px",
                  },
                }}
                id="outlined-basic"
                label="Example:Idli Sambar"
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography
                sx={{ color: "grey", fontSize: "13px", marginBottom: "10px" }}
              >
                Price
              </Typography>
              <TextField
                sx={{
                  "& .MuiInputLabel-root": {
                    fontSize: "12px",
                    color: "#446732",
                  },
                  "& .MuiInputBase-root": {
                    fontSize: "13px",
                  },
                }}
                id="outlined-basic"
                label="Example:140"
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography
                sx={{ color: "grey", fontSize: "13px", marginBottom: "10px" }}
              >
                Select category
              </Typography>
              <FormControl fullWidth variant="outlined">
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{ fontSize: "12px", color: "#446732" }}
                >
                  Select options
                </InputLabel>
                <Select
                  sx={{
                    color: "#446732",
                    fontSize: "13px",
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Select Category"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography
                sx={{ color: "grey", fontSize: "13px", marginBottom: "10px" }}
              >
                Select Restrictions
              </Typography>
              <FormControl fullWidth variant="outlined">
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{ fontSize: "12px", color: "#446732" }}
                >
                  Select options
                </InputLabel>
                <Select
                  sx={{
                    color: "#446732",
                    fontSize: "13px",
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Select Category"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography
                sx={{ color: "grey", fontSize: "13px", marginBottom: "10px" }}
              >
                Upload Dish's image
              </Typography>
              <Button
                sx={{
                  color: "#446732",
                  fontSize: "13px",
                  backgroundColor: "honeydew",
                  "&:active": {
                    backgroundColor: "#446732",
                    color: "white",
                  },
                }}
                variant="contained"
                component="label"
                color="primary"
                fullWidth
              >
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageUpload}
                />
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </Box>
    </>
  );
};
