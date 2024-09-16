import React from 'react';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { Box, Button, Typography, Grid, ThemeProvider, createTheme } from '@mui/material';
import { useLocation, useNavigate } from "react-router-dom";
import { useRegistrationStore } from '../../Store/useRegisterStore';
import { useLoginStore } from '../../Store/useLoginStore'; // Import login store

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
  const [error, setError] = React.useState<string | null>(null); // Added state for error handling
  const { state } = useLocation(); // Fetch state passed from the previous page
  const navigate = useNavigate();

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

  const { verifyOtpAndCompleteLogin } = useLoginStore(); // Use login OTP verification function

  const handleChange = (newValue: any) => {
    setOtp(newValue);
  };

  React.useEffect(() => {
    if (state && state.mode === 'register') {
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

  const handleSubmit = () => {
    setError(null); // Reset error state
    setStoreOtp(otp); // Set the OTP in the store

    if (state?.mode === 'register') {
      // Registration flow
      registerUser()
        .then(() => {
          console.log('OTP verified and user registered successfully');
          onSubmit(otp); // Notify parent component on successful registration
          navigate('/'); // Navigate to the base page
        })
        .catch((error) => {
          console.error('Error verifying OTP and registering user:', error);
          setError('Failed to register. Please try again.'); // Show error
        });
    } else if (state?.mode === 'login') {
      // Login flow: Verify OTP for login
      const { email } = state;
      verifyOtpAndCompleteLogin(otp, email)
        .then(() => {
          console.log('OTP verified and login successful');
          
          const role = localStorage.getItem('role');

          // Redirect based on role
          if (role === '1') {
            navigate('/add-to-menu'); // Navigate to add-to-menu page
          } else if (role === '0') {
            navigate('/'); // Navigate to base page
          }
        })
        .catch((error: any) => {
          console.error('Error verifying OTP for login:', error);
          setError('Failed to verify OTP. Please check your OTP and try again.'); // Show error
        });
    }
  };

  const handleResendOtp = () => {
    // Placeholder for Resend OTP logic
    console.log('Resend OTP clicked');
    // You can implement an API call to resend the OTP here
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

          {/* Display Error Message */}
          {error && (
            <Grid item xs={12}>
              <Typography variant="body1" align="center" sx={{ color: 'red', marginBottom: '20px' }}>
                {error}
              </Typography>
            </Grid>
          )}

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
              <a href="#" onClick={handleResendOtp} style={{ textDecoration: 'underline', color: theme.palette.text.secondary }}>
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
