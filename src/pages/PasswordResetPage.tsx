import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Paper, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../services/userService';

const PasswordResetPage: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // For the success dialog
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const userId = sessionStorage.getItem('userId'); // Get the logged-in user's ID
      if (userId) {
        await updateUser(Number(userId), { passWord: newPassword });
        setOpen(true); // Open the success dialog
      }
    } catch (err: Error | any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle closing the dialog and redirecting to the login page
  const handleClose = () => {
    setOpen(false);
    navigate('/'); // Redirect to login page
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
        zIndex: 2,
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
      
      <Container maxWidth="sm">
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
            Reset Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="New Password"
              type="password"
              fullWidth
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              sx={{
                marginBottom: '20px',
                input: { color: '#FFF' },
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#8D6E63',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: '#000',
                },
              }}
              variant="outlined"
            />
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{
                marginBottom: '20px',
                input: { color: '#FFF' },
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#8D6E63',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: '#000',
                },
              }}
              variant="outlined"
            />
            {error && <Typography color="error" align="center">{error}</Typography>}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ padding: '10px 0', backgroundColor: '#6D4C41' }}
            >
              {loading ? 'Updating...' : 'Reset Password'}
            </Button>
          </Box>
        </Paper>
      </Container>

      {/* Success Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth sx={{
        '& .MuiDialog-paper': {
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0px 0px 20px rgba(255, 195, 0, 0.6)',
          backgroundColor: 'rgba(255, 242, 117, 0.5)',
        },
      }}>
        <DialogTitle>Password Reset Successful</DialogTitle>
        <DialogContent>
          <Typography>Your password has been reset successfully. Please log in with your new password.</Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button
            onClick={handleClose}
            color="primary"
            variant="contained"
            sx={{
              backgroundColor: '#6D4C41', // Brown background
              color: '#fff', 
              '&:hover': {
                backgroundColor: '#5D4037', // Darker brown on hover
              },
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PasswordResetPage;
