import { Box, Button, styled, TextField } from "@mui/material";
import { useState } from "react";
import { ImUpload } from "react-icons/im";

const SignUp = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

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
      <Button
        sx={{
          display: "flex",
          gap: "4px",
          background: "none",
          color: "grey",
          boxShadow: 0,
          "&:hover" : {
            backgroundColor : "#D6E8CE"
          }
        }}
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<ImUpload />}
      >
        <span>Upload Logo</span>
        <VisuallyHiddenInput
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </Button>
      <TextField id="name" label="Restaurant Name" variant="outlined" />
      <TextField id="email" label="Email" variant="outlined" />
      <TextField id="password" label="Password" variant="outlined" />
      <Button variant="contained" sx={{ backgroundColor: "#006E1A" }}>
        Create Account
      </Button>
    </Box>
  );
};

export default SignUp;
