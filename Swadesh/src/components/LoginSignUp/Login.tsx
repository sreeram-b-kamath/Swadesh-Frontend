import React from "react";
import { Box, Button, TextField, CircularProgress, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useLoginStore } from '../../Store/useLoginStore'; // Adjust the import path as needed

const Login = () => {
  const navigate = useNavigate(); // Initialize navigate
  const { loginUser, loginLoading, loginError, loginSuccess } = useLoginStore(); // Now correctly typed

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const success = await loginUser(values.email, values.password); // Call the loginUser action from the store
      if (success) {
        navigate('/add-to-menu'); // Navigate to the dashboard or another page upon success
      }
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        height: "70%",
        width: "90%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <TextField
        id="email"
        name="email"
        label="Email"
        variant="outlined"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <Box sx={{ display: "flex", flexDirection: "column", width: "48%" }}>
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <a href="#">Forgot Password?</a>
        </Box>
      </Box>
      {loginError && (
        <Typography color="error">{loginError}</Typography>
      )}
      <Button
        variant="contained"
        sx={{ backgroundColor: "#006E1A" }}
        type="submit"
        disabled={loginLoading}
      >
        {loginLoading ? <CircularProgress size={24} /> : 'Login'}
      </Button>
    </Box>
  );
};

export default Login;
