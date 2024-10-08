import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/userService';  // Import the loginUser function from your service

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const user = await loginUser(email, password);
      // console.log('Logged in user:', user);
      if (user.role === 'USER') {
        localStorage.setItem('userRole', user.role);
        localStorage.setItem('userName', user.firstName);
        navigate('/dashboard');
      }
      // navigate('/dashboard');
      setError("User Not Authorized");
    } catch (err: Error | any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: `url(./images/background.png)`,
        backgroundPosition: 'center',
        backgroundSize: '100% 100%',
        '::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.1)', // Adjust the opacity for darkness
            zIndex: 1,
         },
            zIndex: 2, // Ensure the content is above the overlay
        // animation: 'gradient 15s ease infinite',
        // '@keyframes gradient': {
        //   '0%': { backgroundPosition: '0% 50%' },
        //   '50%': { backgroundPosition: '100% 50%' },
        //   '100%': { backgroundPosition: '0% 50%' },
        // },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          right: '10%',
          bottom: '25%',
          height: '80%',
          width: '30%',
          background: 'url(./images/banana_man.png) no-repeat left bottom',
          backgroundSize: 'contain',
          animation: 'moveUpDown 2s infinite alternate',
          '@keyframes moveUpDown': {
            '0%': { transform: 'translateY(0)' },
            '100%': { transform: 'translateY(-20px)' },
          },
        }}
      />
      
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Paper
          elevation={3}
          sx={{
            padding: '30px',
            borderRadius: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        >
          <Typography variant="h3" gutterBottom align="center" sx={{ marginBottom: '10px', color: '#000', fontWeight: 'bold' }}>
            Login
          </Typography>
          <Box display="flex" justifyContent="center" mb={3}>
            <img src='./images/Main_logo.png' alt="Company Logo" style={{ height: '150px' }} />
          </Box>
          <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                marginBottom: '20px',
                input: { color: '#FFF' },
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#8D6E63', // border color when focused
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: '#000', // label color when focused
                },
              }}
              variant="outlined"
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                marginBottom: '20px',
                input: { color: '#FFF' },
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#8D6E63', // border color when focused
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: '#000', // label color when focused
                },
              }}
              variant="outlined"
            />
            {error && <Typography color="error" align="center" sx={{ marginBottom: '20px' }}>{error}</Typography>}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ padding: '10px 0', backgroundColor: '#000' }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
