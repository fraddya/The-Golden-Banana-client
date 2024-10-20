import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Paper, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userService';  // Import the createUser function from your service

// Enum to represent GenderType options
enum GenderType {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [genderType, setGenderType] = useState<GenderType | ''>('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const newUser = {
        firstName,
        lastName,
        contactNo,
        genderType,
        email,
        passWord: password,
      };
      await createUser(newUser);
      navigate('/');
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
          backgroundColor: 'rgba(0, 0, 0, 0.1)', 
          zIndex: 1,
        },
        zIndex: 2,
      }}
    >
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
          <Typography variant="h3" gutterBottom align="center" sx={{ marginBottom: '10px', color: '#6D4C41', fontWeight: 'bold' }}>
            Register
          </Typography>
          <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              fullWidth
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              sx={{ marginBottom: '20px' }}
              variant="outlined"
            />
            <TextField
              label="Last Name"
              fullWidth
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              sx={{ marginBottom: '20px' }}
              variant="outlined"
            />
            <TextField
              label="Contact Number"
              fullWidth
              required
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              sx={{ marginBottom: '20px' }}
              variant="outlined"
            />
            <TextField
              label="Gender"
              select
              fullWidth
              required
              value={genderType}
              onChange={(e) => setGenderType(e.target.value as GenderType)}
              sx={{ marginBottom: '20px' }}
              variant="outlined"
            >
              <MenuItem value={GenderType.MALE}>Male</MenuItem>
              <MenuItem value={GenderType.FEMALE}>Female</MenuItem>
              <MenuItem value={GenderType.OTHER}>Other</MenuItem>
            </TextField>
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ marginBottom: '20px' }}
              variant="outlined"
            />
            {error && <Typography color="error" align="center" sx={{ marginBottom: '20px' }}>{error}</Typography>}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ padding: '10px 0', backgroundColor: '#6D4C41' }}
            >
              {loading ? 'Creating account...' : 'Register'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegisterPage;
