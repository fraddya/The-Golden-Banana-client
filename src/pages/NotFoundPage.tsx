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
        backgroundColor: 'rgba(255, 242, 117, 0.7)',
      }}
    >
        <Box
        sx={{
          position: 'absolute',
          right: '10%',
          bottom: '25%',
          height: '80%',
          width: '30%',
          background: 'url(./images/banana_notfound.png) no-repeat left bottom',
          backgroundSize: 'contain',
          animation: 'moveUpDown 2s infinite alternate',
          '@keyframes moveUpDown': {
            '0%': { transform: 'translateY(0)' },
            '100%': { transform: 'translateY(-20px)' },
          },
        }}
      />
      
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
