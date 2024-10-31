import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handlePlayClick = () => {
    navigate('/play');
  };

  const handleQuitClick = () => {
    navigate('/');
  };

  const handleScoreboardClick = () => {
    navigate('/leaderboard');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundPosition: 'center',
        backgroundSize: '100% 100%',
        backgroundImage: `url(./images/background.png)`,
        backgroundColor: '#E3F9A6',
        // '::before': {
        //   content: '""',
        //   position: 'absolute',
        //   top: 0,
        //   left: 0,
        //   width: '100%',
        //   height: '100%',
        //   backgroundColor: 'rgba(0, 0, 0, 0.1)', // Adjust the opacity for darkness
        //   //zIndex: 1,
        // },
        //zIndex: 2,
        outline: '4px solid #C69C6D', // Light brown outline
        borderRadius: '25px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          backgroundColor: 'rgba(255, 242, 117, 0.5)', // Banana yellow theme
          padding: '30px',
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0px 0px 20px rgba(255, 195, 0, 0.6)', // Soft yellow glow
          width: '60%',
          height: '60%',
          backgroundImage: `url(./images/wood_2.png)`,
          border: '10px solid #000',
          backgroundSize: 'cover',
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            backgroundColor: 'rgba(255, 242, 117, 0.5)', // Banana yellow theme
            padding: '30px',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)',
            boxShadow: '0px 0px 20px rgba(255, 195, 0, 0.9)', // Soft yellow glow  0px 0px 20px rgba(255, 195, 0, 0.8)
            width: '70%',
            height: '50%',
            border: '10px solid #714424',
            //outline: '5px solid #8D6E63', // Light brown/dark yellow outline for separation
          }}
        >
          <Typography
            variant="h2"
            sx={{ color: '#6D4C41', fontWeight: 'bold', marginBottom: '20px', fontFamily: 'Comic Sans MS' }}
          >
            🍌 Main Menu 🍌
          </Typography>
          <Button
            sx={{
              display: 'block',
              width: '100%',
              backgroundColor: '#FFD600', // Banana yellow for buttons
              color: '#6D4C41', // Brown text
              marginBottom: '15px',
              padding: '12px 0',
              borderRadius: '10px',
              fontSize: '18px',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#FFEB3B' }, // Lighter yellow on hover
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)', // Add some button shadow
            }}
            onClick={handlePlayClick} // Navigate to LevelSelection
          >
            Play 🍌
          </Button>
          <Button
            sx={{
              display: 'block',
              width: '100%',
              backgroundColor: '#FFD600', // Same banana yellow
              color: '#6D4C41', // Brown text
              marginBottom: '15px',
              padding: '12px 0',
              borderRadius: '10px',
              fontSize: '18px',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#FFEB3B' },
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
            }}
            onClick={handleScoreboardClick}
          >
            Scoreboard  🍍
          </Button>
          <Button
            sx={{
              display: 'block',
              width: '100%',
              backgroundColor: '#FFD600',
              color: '#6D4C41',
              padding: '12px 0',
              borderRadius: '10px',
              fontSize: '18px',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#FFEB3B' },
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
            }}
            onClick={handleQuitClick}
          >
            Quit Game 🌴
          </Button>
        </Box>
      </Box>
      <Outlet />
    </Box>
  );
};

export default Dashboard;
