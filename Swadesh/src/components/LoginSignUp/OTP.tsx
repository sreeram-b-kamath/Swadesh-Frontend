import React from 'react';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { Box, Button, Typography, Grid, ThemeProvider, createTheme } from '@mui/material';
import { useLocation, useNavigate } from "react-router-dom";
import { useRegistrationStore } from '../../Store/useRegisterStore';

interface OtpVerificationProps {
  onSubmit: (otp: string) => void;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF450F',
    },
    secondary: {
      main: '#1E1E2F',
    },
    background: {
      default: '#0D0D0D',
      paper: '#1E1E2F',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#FF4500',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h4: {
      fontWeight: 'bold',
      color: '#FF4500',
      letterSpacing: '2px',
    },
    body1: {
      color: '#FFFFFF',
      fontSize: '1.1rem',
    },
    body2: {
      color: '#FF4500',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0px 4px 20px rgba(255, 69, 0, 0.4)',
        },
      },
    },
  },
});

const OtpVerificationPage: React.FC<OtpVerificationProps> = ({ onSubmit }) => {
  const [otp, setOtp] = React.useState('');
  const { state } = useLocation();
  const navigate = useNavigate(); // Add useNavigate to handle navigation

  const {
    setOtp: setStoreOtp,
    registerUser,
    setEmail,
    setRestaurantName,
    setPassword,
    setLogo,
    setOwnerName,
    setContact,
    setAddress,
  } = useRegistrationStore();

  React.useEffect(() => {
    if (state) {
      const { name, email, password, logo, ownerName, contact, address } = state;
      setEmail(email);
      setRestaurantName(name);
      setPassword(password);
      setLogo(logo);
      setOwnerName(ownerName);
      setContact(contact);
      setAddress(address);
    }
  }, [state, setEmail, setRestaurantName, setPassword, setLogo, setOwnerName, setContact, setAddress]);

  const handleChange = (newValue: any) => {
    setOtp(newValue);
  };

  const handleSubmit = () => {
    setStoreOtp(otp); // Set the OTP in the store
    registerUser() // Call the API using the registerUser method
      .then(() => {
        console.log('OTP verified and user registered successfully');
        onSubmit(otp); // Notify parent component on successful registration
        navigate('/'); // Navigate back to the base page after successful registration
      })
      .catch((error) => {
        console.error('Error verifying OTP and registering user:', error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: 'linear-gradient(to bottom right, #0D0D0D, #1E1E2F)',
          padding: '20px',
        }}
      >
        <Grid
          container
          spacing={2}
          maxWidth="md"
          sx={{
            backgroundColor: 'background.paper',
            p: 4,
            borderRadius: 2,
            boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.8)',
            border: '1px solid #FF4500',
            textAlign: 'center',
          }}
        >
          <Grid item xs={12}>
            <Typography variant="h4" align="center">
              Verify Your Account
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" align="center" sx={{ marginBottom: '20px' }}>
              We've sent a one-time password (OTP) to your registered email address. Please enter the OTP below to verify your account.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <MuiOtpInput
              value={otp}
              onChange={handleChange}
              sx={{
                width: '100%',
                marginBottom: '20px',
                input: {
                  color: '#FF4500',
                  borderBottom: '2px solid #FF4500',
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
              sx={{
                padding: '12px',
                textTransform: 'none',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                '&:hover': {
                  backgroundColor: '#FF6347',
                },
              }}
            >
              Verify OTP
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" align="center" sx={{ marginTop: '10px' }}>
              Didn't receive the OTP? Check your spam folder or{' '}
              <a href="#" style={{ textDecoration: 'underline', color: theme.palette.text.secondary }}>
                resend OTP
              </a>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default OtpVerificationPage;
