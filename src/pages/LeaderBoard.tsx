import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { getLeaderBoards } from '../services/UserLevelProgressService'; // Make sure the API call is correctly implemented

const LeaderBoard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

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
          //justifyContent: 'center',
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
        }}
      >
        <Typography variant="h2" sx={{ color: '#6D4C41', fontWeight: 'bold', fontFamily: 'Comic Sans MS', marginBottom: '20px', padding: '40px' }}>
          🍍 Leaderboard 🍍
        </Typography>

        {/* Display the top 3 players */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          {leaderboard.slice(0, 3).map((player, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : '#CD7F32', // Gold, Silver, Bronze colors for top 3
                borderRadius: '15px',
                padding: '20px',
                width: '200px',
                textAlign: 'center',
                boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#6D4C41' }}>
                {index + 1} {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
              </Typography>
              <Typography variant="h6" sx={{ color: '#6D4C41' }}>
                {player.user.firstName} {player.user.lastName}
              </Typography>
              <Typography variant="h5" sx={{ color: '#6D4C41', fontWeight: 'bold' }}>
                {player.marks} points
              </Typography>
            </Box>
          ))}
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
