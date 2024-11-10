import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Card, CardContent, Button } from '@mui/material';
import { getLeaderBoards } from '../services/UserLevelProgressService'; // Make sure the API call is correctly implemented
import { useNavigate } from 'react-router-dom';

const LeaderBoard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaderBoard = async () => {
      try {
        const response = await getLeaderBoards();
        setLeaderboard(response.content); // Assuming "content" is the array of leaderboard data
      } catch (error) {
        console.error('Failed to fetch leaderboard data', error);
      }
    };

    fetchLeaderBoard();
  }, []);

  const handleHomeClick = () => {
    navigate('/dashboard');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url(./images/background.png)`,
        backgroundColor: '#E3F9A6',
        zIndex: 2,
        outline: '4px solid #C69C6D', // Light brown outline
        borderRadius: '25px',
        padding: '20px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          backgroundColor: 'rgba(255, 242, 117, 0.7)', // Banana yellow theme
          padding: '30px',
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0px 0px 20px rgba(255, 195, 0, 0.6)', // Soft yellow glow
          width: '60%',
          height: '80%',
          backgroundImage: `url(./images/wood_wall.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            textAlign: 'center',
            backgroundColor: 'rgba(255, 242, 117, 0.7)', // Banana yellow theme
            padding: '30px',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)',
            boxShadow: '0px 0px 20px rgba(255, 195, 0, 0.6)', // Soft yellow glow
            width: '90%',
            height: 'auto',
            marginBottom: '30px',
          }}
        >
          <Typography variant="h2" sx={{ color: '#6D4C41', fontWeight: 'bold', fontFamily: 'Comic Sans MS' }}>
            🍍 Leaderboard 🍍
          </Typography>
        </Box>

        <Button
        onClick={() => handleHomeClick()}
        sx={{
          position: 'absolute',
          right: '1%',
          bottom: '80%',
          height: '14%',
          width: '14%',
          background: 'url(./images/button/woden_home_button.png) no-repeat left bottom',
          backgroundSize: 'contain',
          animation: 'moveUpDown 2s infinite alternate',
          '@keyframes moveUpDown': {
            '0%': { transform: 'translateY(0)' },
            '100%': { transform: 'translateY(-12px)' },
          },
        }}
      />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            textAlign: 'center',
            backgroundColor: 'rgba(255, 242, 117, 0.7)', // Banana yellow theme
            padding: '30px',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)',
            boxShadow: '0px 0px 20px rgba(255, 195, 0, 0.6)', // Soft yellow glow
            width: '70%',
            height: 'auto',
            marginBottom: '30px',
          }}
        >
          {/* Display the top 3 players */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column', // Change to column to stack items vertically
              alignItems: 'center',
              width: '100%',
              gap: '20px',
            }}
          >
            {leaderboard.slice(0, 3).map((player, index) => (
              <Card
              key={index}
              sx={{
                backgroundColor: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : '#CD7F32',
                borderRadius: '15px',
                width: '80%',
                boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <CardContent>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#6D4C41' }}>
                  {index + 1} {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                </Typography>
                <Typography variant="h6" sx={{ color: '#6D4C41' }}>
                  {player.user.firstName} {player.user.lastName}
                </Typography>
                <Typography variant="h5" sx={{ color: '#6D4C41', fontWeight: 'bold' }}>
                  {player.marks} points
                </Typography>
              </CardContent>
            </Card>
            ))}
          </Box>
        </Box>

        {/* Display the rest of the leaderboard */}
        <Box sx={{ marginTop: '30px', width: '100%' }}>
          <List>
            {leaderboard.slice(3).map((player, index) => (
              <ListItem
                key={index + 3}
                sx={{
                  backgroundColor: '#FFF176', // Light yellow background for each item
                  marginBottom: '10px',
                  borderRadius: '10px',
                  padding: '15px',
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                }}
              >
                <ListItemText
                  primary={`${index + 4}. ${player.user.firstName} ${player.user.lastName}`}
                  secondary={`Score: ${player.marks}`}
                  primaryTypographyProps={{ fontWeight: 'bold', color: '#6D4C41' }}
                  secondaryTypographyProps={{ color: '#6D4C41' }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default LeaderBoard;
