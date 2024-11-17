import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Box } from '@mui/material';

const NotFoundPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Typography variant="h3" sx={{ color: '#6D4C41', marginBottom: '20px' }}>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '30px' }}>
        Oops! The page you are looking for does not exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        sx={{ backgroundColor: '#6D4C41' }}
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
