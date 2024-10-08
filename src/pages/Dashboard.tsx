import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';


const Dashboard: React.FC = () => {

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          height: 'full-height',
          background: 'linear-gradient(45deg, #ffcc00, #ff9900, #ff6600, #ff3300)',
          backgroundSize: '400% 400%',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;
