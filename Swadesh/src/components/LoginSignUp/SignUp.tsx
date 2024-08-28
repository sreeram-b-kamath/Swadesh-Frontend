import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { ImUpload } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Resizer from 'react-image-file-resizer';
import { useOTPStore } from '../../Store/useOTPStore'; // Adjust the import path as needed

const resizeFile = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      'JPEG',
      100,
      0,
      (uri) => {
        if (typeof uri === 'string') {
          resolve(uri);
        } else {
          reject(new Error('Failed to resize the image'));
        }
      },
      'base64'
    );
  });

const SignUp = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const navigate = useNavigate();
  const signUpWithEmail = useOTPStore((state : any) => state.signUpWithEmail);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      logo:''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Restaurant Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
      logo: Yup.string().required('Logo is required'),
    }),
    onSubmit: async (values) => {
      await signUpWithEmail(values.email);
      const { name, email, password, logo } = values;
      navigate('/otp-verification', { state: { name, email, password, logo } });
    },
  });

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const image = await resizeFile(file);
        setSelectedFile(image);
        formik.setFieldValue('logo', image); // Update formik field with image
      } catch (error) {
        formik.setFieldError('logo', 'Failed to resize the image');
      }
    }
  };

  return (
    <Box
      sx={{
        height: '70%',
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
      component="form"
      onSubmit={formik.handleSubmit}
    >
      <Button
        sx={{
          display: 'flex',
          gap: '4px',
          background: 'none',
          color: 'grey',
          boxShadow: 0,
          '&:hover': {
            backgroundColor: '#D6E8CE',
          },
        }}
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<ImUpload />}
      >
        <span>Upload Logo</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </Button>
      {formik.errors.logo && formik.touched.logo && (
        <Typography color="error">{formik.errors.logo}</Typography>
      )}

      <TextField
        id="name"
        name="name"
        label="Restaurant Name"
        variant="outlined"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />

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

      <Button variant="contained" sx={{ backgroundColor: '#006E1A' }} type="submit">
        Create Account
      </Button>
    </Box>
  );
};

export default SignUp;
