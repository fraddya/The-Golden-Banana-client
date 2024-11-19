import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';

const WelcomeScreen: React.FC<{ onContinue: () => void }> = ({ onContinue }) => {
  const playerName = sessionStorage.getItem('userName') || 'Player';

  useEffect(() => {
    const timer = setTimeout(onContinue, 3000); // Show welcome screen for 3 seconds
    return () => clearTimeout(timer);
  }, [onContinue]);

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        backgroundImage: `url(./images/background.png)`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        textAlign: 'center',
        color: '#FFD600',
        flexDirection: 'column',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker overlay for better contrast
          zIndex: 1,
        },
      }}
    >

      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          animation: 'fadeInScale 2s ease forwards', // Animation for fade and scale
          '@keyframes fadeInScale': {
            '0%': { opacity: 0, transform: 'scale(0.8)' },
            '100%': { opacity: 1, transform: 'scale(1)' },
          },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 'bold',
            marginBottom: '20px',
            fontFamily: 'Comic Sans MS',
            color: '#FFD600',
          }}
        >
          🍌 Welcome, {playerName}! 🍌
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontFamily: 'Comic Sans MS',
            color: '#FFD600',
            maxWidth: '80%',
            lineHeight: '1.5',
          }}
        >
          Get ready for an exciting adventure!
        </Typography>
      </Box>
    </Box>
  );
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(false);
  const playerName = sessionStorage.getItem('userName') || 'Player';

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/'); // Redirect to login page if no token is found
    } else if (!sessionStorage.getItem('welcomeShown')) {
      setShowWelcome(true);
      sessionStorage.setItem('welcomeShown', 'true'); // Set flag to show welcome screen only once
    }
  }, [navigate]);

  const handlePlayClick = () => navigate('/play');
  const handleQuitClick = () => {
    sessionStorage.clear();
    navigate('/');
  };
  const handleScoreboardClick = () => navigate('/leaderboard');

  const handleUpdateProfileClick = () => {
    navigate('/profile');
  };

  if (showWelcome) {
    return <WelcomeScreen onContinue={() => setShowWelcome(false)} />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundPosition: 'center',
        backgroundSize: '100% 100%',
        backgroundImage: `url(./images/background.png)`,
        backgroundColor: '#E3F9A6',
        outline: '4px solid #C69C6D',
        borderRadius: '25px',
      }}
    >

      <Box
        sx={{
          position: 'absolute',
          right: '8%',
          top: '4%',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: '#6D4C41',
            fontFamily: 'Comic Sans MS',
            fontWeight: 'bold',
          }}
        >
          Hello
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: '#6D4C41',
            fontFamily: 'Comic Sans MS',
            fontWeight: 'bold',
          }}
        >
          {playerName} !
        </Typography>
      </Box>

      <Button
      onClick={() => handleUpdateProfileClick()}
        sx={{
          position: 'absolute',
          right: '1%',
          top: '4%',
          height: '6%',
          width: '6%',
          background: 'url(./images/button/wood_profile.png) no-repeat left bottom',
          backgroundSize: 'contain',
          //animation: 'moveUpDown 2s infinite alternate',
          // '@keyframes moveUpDown': {
          //   '0%': { transform: 'translateY(0)' },
          //   '100%': { transform: 'translateY(-12px)' },
          // },
        }}
      />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          backgroundColor: 'rgba(255, 242, 117, 0.5)',
          padding: '30px',
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0px 0px 20px rgba(255, 195, 0, 0.6)',
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
            backgroundColor: 'rgba(255, 242, 117, 0.5)',
            padding: '30px',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)',
            boxShadow: '0px 0px 20px rgba(255, 195, 0, 0.9)',
            width: '70%',
            height: '50%',
            border: '10px solid #714424',
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
              backgroundColor: '#FFD600',
              color: '#6D4C41',
              marginBottom: '15px',
              padding: '12px 0',
              borderRadius: '10px',
              fontSize: '18px',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#FFEB3B' },
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
            }}
            onClick={handlePlayClick}
          >
            Play 🍌
          </Button>
          <Button
            sx={{
              display: 'block',
              width: '100%',
              backgroundColor: '#FFD600',
              color: '#6D4C41',
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
            Scoreboard 🍍
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
